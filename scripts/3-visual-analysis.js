const fs = require('fs');
const path = require('path');
const { execSync, exec } = require('child_process');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SCREENSHOTS_DIR = path.join(DATA_DIR, 'screenshots');
const OUTPUT_PATH = path.join(DATA_DIR, 'visual-analysis.json');

const SAVE_INTERVAL = 5;
const DELAY_BETWEEN_SITES = 2000;
const RETRY_DELAY = 30000;
const RATE_LIMIT_DELAY = 60000;
const MAX_RETRIES = 3;
const MAX_FAILURE_RATE = 0.3;

const ANALYSIS_PROMPT = `Analyze this website screenshot and return a JSON object with exactly these fields:

{
  "visual_quality_score": (1-10, overall design quality),
  "design_style": ("minimal" | "corporate" | "playful" | "brutalist" | "glassmorphism" | "neomorphism" | "gradient-heavy" | "editorial" | "dashboard-like" | "other"),
  "overall_impression": ("premium" | "modern" | "clean" | "bold" | "warm" | "cold" | "technical" | "friendly" | "luxurious" | "neutral"),
  "color_scheme": ("monochrome" | "analogous" | "complementary" | "triadic" | "neutral-with-accent" | "vibrant-multi"),
  "primary_accent_color_hex": "#XXXXXX",
  "estimated_white_space_ratio": (0.0-1.0),
  "typography_impression": ("geometric-sans" | "humanist-sans" | "neo-grotesque" | "serif" | "mono" | "mixed" | "display"),
  "heading_visual_weight": ("thin" | "light" | "regular" | "medium" | "bold" | "extra-bold" | "black"),
  "text_hierarchy_clarity": (1-10),
  "hero_layout_type": ("centered-text" | "split-left-text" | "split-right-text" | "fullscreen-bg" | "minimal-text" | "video-bg" | "illustration-heavy" | "product-showcase"),
  "hero_visual_density": ("sparse" | "balanced" | "dense"),
  "cta_style": ("filled" | "outline" | "ghost" | "gradient" | "3d" | "pill" | "none"),
  "cta_prominence": (1-10),
  "nav_style": ("transparent" | "solid" | "blur" | "minimal" | "hidden"),
  "use_of_gradients": ("none" | "subtle" | "prominent" | "primary"),
  "use_of_shadows": ("none" | "subtle" | "medium" | "heavy"),
  "use_of_borders": ("none" | "subtle" | "prominent"),
  "use_of_rounded_corners": ("none" | "slight" | "medium" | "heavy" | "pill"),
  "animation_impression": ("none" | "minimal" | "moderate" | "heavy"),
  "illustration_style": ("none" | "flat" | "3d" | "hand-drawn" | "abstract" | "isometric" | "photographic"),
  "image_treatment": ("none" | "raw" | "duotone" | "filtered" | "masked" | "rounded" | "shadowed"),
  "grid_impression": ("strict" | "asymmetric" | "fluid" | "broken-grid" | "single-column"),
  "visual_rhythm": ("consistent" | "varied" | "monotonous" | "chaotic"),
  "brand_personality": (free text, 2-3 words),
  "target_audience": (free text, 2-3 words),
  "competitive_tier": ("indie" | "startup" | "scaleup" | "enterprise" | "big-tech"),
  "most_similar_to": (name one well-known brand with similar design),
  "unique_design_elements": (free text, notable unique elements),
  "accessibility_impression": ("poor" | "average" | "good" | "excellent"),
  "mobile_readiness_guess": ("poor" | "average" | "good" | "excellent"),
  "emotional_tone": ("trustworthy" | "exciting" | "calm" | "authoritative" | "playful" | "sophisticated"),
  "content_density": ("minimal" | "balanced" | "information-rich" | "overwhelming"),
  "visual_consistency": (1-10),
  "innovation_score": (1-10),
  "conversion_optimization_score": (1-10)
}

Return ONLY valid JSON. No explanation.`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callClaude(imagePath) {
  return new Promise((resolve, reject) => {
    const escaped = imagePath.replace(/'/g, "'\\''");
    const promptEscaped = ANALYSIS_PROMPT.replace(/'/g, "'\\''").replace(/\n/g, ' ');

    // Use claude CLI with image
    const cmd = `claude -p '${promptEscaped}' --image '${escaped}' --output-format text 2>&1`;

    exec(cmd, { timeout: 120000, maxBuffer: 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        if (stdout && stdout.includes('429')) {
          reject(new Error('RATE_LIMIT'));
        } else {
          reject(new Error(err.message));
        }
        return;
      }

      const output = stdout.trim();

      // Extract JSON from response
      const jsonMatch = output.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        reject(new Error('No JSON found in response'));
        return;
      }

      try {
        const parsed = JSON.parse(jsonMatch[0]);
        resolve(parsed);
      } catch (parseErr) {
        reject(new Error(`JSON parse error: ${parseErr.message}`));
      }
    });
  });
}

async function analyzeScreenshot(domain, screenshotPath) {
  let lastError = null;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const result = await callClaude(screenshotPath);
      return result;
    } catch (err) {
      lastError = err;

      if (err.message === 'RATE_LIMIT') {
        console.log(`    Rate limited. Waiting ${RATE_LIMIT_DELAY / 1000}s...`);
        await sleep(RATE_LIMIT_DELAY);
      } else {
        console.log(`    Attempt ${attempt}/${MAX_RETRIES} failed: ${err.message.slice(0, 60)}`);
        if (attempt < MAX_RETRIES) {
          await sleep(RETRY_DELAY);
        }
      }
    }
  }

  throw lastError;
}

async function takeScreenshots(urls) {
  let playwright;
  try {
    playwright = require('playwright');
  } catch {
    console.log('Playwright not installed. Using existing screenshots only.');
    return;
  }

  const browser = await playwright.chromium.launch({ headless: true });
  const missing = urls.filter(u => {
    const domain = new URL(u.url).hostname.replace('www.', '');
    return !fs.existsSync(path.join(SCREENSHOTS_DIR, `${domain}.png`));
  });

  if (missing.length === 0) {
    await browser.close();
    return;
  }

  console.log(`Taking screenshots for ${missing.length} sites...`);

  for (const urlEntry of missing) {
    const domain = new URL(urlEntry.url).hostname.replace('www.', '');
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      ignoreHTTPSErrors: true,
    });
    const page = await context.newPage();

    try {
      await page.goto(urlEntry.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
      try { await page.waitForLoadState('networkidle', { timeout: 8000 }); } catch {}

      // Above the fold
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${domain}.png`),
        fullPage: false,
      });

      // Full page (max 5000px)
      await page.screenshot({
        path: path.join(SCREENSHOTS_DIR, `${domain}-full.png`),
        fullPage: true,
        clip: { x: 0, y: 0, width: 1440, height: 5000 },
      });

      console.log(`  Screenshot: ${domain}`);
    } catch (err) {
      console.log(`  Screenshot fail: ${domain} — ${err.message.slice(0, 50)}`);
    } finally {
      await page.close();
      await context.close();
    }
  }

  await browser.close();
}

async function main() {
  const args = process.argv.slice(2);

  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;

  const resume = args.includes('--resume');
  const skipScreenshots = args.includes('--skip-screenshots');

  // Load URLs
  const urlsPath = path.join(DATA_DIR, 'urls.json');
  if (!fs.existsSync(urlsPath)) {
    console.error('urls.json not found. Run script 1 first.');
    process.exit(1);
  }

  const { urls } = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));

  // Ensure screenshots directory
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  // Take screenshots if needed
  if (!skipScreenshots) {
    await takeScreenshots(urls);
  }

  // Load existing results
  let results = [];
  const analyzedDomains = new Set();

  if (resume && fs.existsSync(OUTPUT_PATH)) {
    results = JSON.parse(fs.readFileSync(OUTPUT_PATH, 'utf-8'));
    for (const r of results) {
      analyzedDomains.add(r.domain);
    }
    console.log(`Resuming: ${results.length} sites already analyzed`);
  }

  // Build work list
  let workList = [];
  for (const urlEntry of urls) {
    const domain = new URL(urlEntry.url).hostname.replace('www.', '');
    if (analyzedDomains.has(domain)) continue;

    const screenshotPath = path.join(SCREENSHOTS_DIR, `${domain}.png`);
    if (!fs.existsSync(screenshotPath)) {
      console.log(`  Skip (no screenshot): ${domain}`);
      continue;
    }

    workList.push({ ...urlEntry, domain, screenshotPath });
  }

  if (limit < workList.length) {
    workList = workList.slice(0, limit);
  }

  console.log(`\nWill analyze ${workList.length} sites sequentially`);
  console.log(`Delay between sites: ${DELAY_BETWEEN_SITES / 1000}s\n`);

  let completed = 0;
  let failed = 0;

  for (let i = 0; i < workList.length; i++) {
    const item = workList[i];

    // Check failure rate
    const total = completed + failed;
    if (total > 5 && failed / total > MAX_FAILURE_RATE) {
      console.log(`\nStopping: failure rate ${Math.round(failed / total * 100)}% > ${MAX_FAILURE_RATE * 100}%`);
      break;
    }

    try {
      console.log(`[${i + 1}/${workList.length}] Analyzing: ${item.domain}`);
      const visualData = await analyzeScreenshot(item.domain, item.screenshotPath);

      results.push({
        url: item.url,
        domain: item.domain,
        category: item.category,
        analyzed_at: new Date().toISOString(),
        ...visualData,
      });

      completed++;
    } catch (err) {
      failed++;
      console.log(`  FAIL: ${item.domain} — ${err.message.slice(0, 60)}`);
    }

    // Save periodically
    if ((completed + failed) % SAVE_INTERVAL === 0) {
      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));
      console.log(`  [save] ${results.length} results saved`);
    }

    // Delay between sites
    if (i < workList.length - 1) {
      await sleep(DELAY_BETWEEN_SITES);
    }
  }

  // Final save
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(results, null, 2));

  console.log(`\n=== Visual Analysis Complete ===`);
  console.log(`Analyzed: ${completed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total results: ${results.length}`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
