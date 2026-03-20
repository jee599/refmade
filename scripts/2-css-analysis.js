const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const DATA_DIR = path.join(__dirname, '..', 'data');
const SCREENSHOTS_DIR = path.join(DATA_DIR, 'screenshots');
const VIEWPORT = { width: 1440, height: 900 };
const CONCURRENCY = 3;
const PER_SITE_TIMEOUT = 20000;
const NETWORK_IDLE_TIMEOUT = 10000;
const SAVE_INTERVAL = 10;

// ─── Helpers ───

function rgbToHex(rgb) {
  if (!rgb || rgb === 'transparent' || rgb === 'none') return null;
  if (rgb.startsWith('#')) return rgb.toUpperCase();
  const match = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
  if (!match) return null;
  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);
  return '#' + [r, g, b].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToRgb(hex) {
  if (!hex) return null;
  hex = hex.replace('#', '');
  return {
    r: parseInt(hex.substring(0, 2), 16) / 255,
    g: parseInt(hex.substring(2, 4), 16) / 255,
    b: parseInt(hex.substring(4, 6), 16) / 255,
  };
}

function relativeLuminance(hex) {
  const rgb = hexToRgb(hex);
  if (!rgb) return 1;
  const linearize = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  return 0.2126 * linearize(rgb.r) + 0.7152 * linearize(rgb.g) + 0.0722 * linearize(rgb.b);
}

function parseFloat2(v) {
  const n = parseFloat(v);
  return isNaN(n) ? null : Math.round(n * 100) / 100;
}

function isDefaultFont(family) {
  if (!family) return true;
  const defaults = ['system-ui', 'arial', 'helvetica', 'sans-serif', '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'roboto', 'ui-sans-serif'];
  const lower = family.toLowerCase().replace(/["']/g, '').trim();
  const parts = lower.split(',').map(s => s.trim());
  return parts.every(p => defaults.includes(p));
}

const COOKIE_SELECTORS = [
  '[class*="cookie"] button',
  '[id*="cookie"] button',
  '[class*="consent"] button',
  '[id*="consent"] button',
  'button[class*="accept"]',
  'button[id*="accept"]',
  '[class*="banner"] button[class*="close"]',
  '[class*="cookie"] [class*="accept"]',
  '[class*="cookie"] [class*="close"]',
  '[aria-label*="cookie" i] button',
  '[aria-label*="accept" i]',
  '[data-testid*="cookie"] button',
];

async function dismissCookies(page) {
  for (const sel of COOKIE_SELECTORS) {
    try {
      const btn = page.locator(sel).first();
      if (await btn.isVisible({ timeout: 500 })) {
        await btn.click({ timeout: 1000 });
        await page.waitForTimeout(300);
        return;
      }
    } catch {}
  }
}

// ─── Extraction Logic (runs in browser context) ───

function extractCssData() {
  const cs = (el) => el ? window.getComputedStyle(el) : null;
  const px = (v) => v ? parseFloat(v) : null;

  function rgbToHexBrowser(rgb) {
    if (!rgb || rgb === 'transparent' || rgb === 'none') return null;
    if (rgb.startsWith('#')) return rgb.toUpperCase();
    const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(c => parseInt(c).toString(16).padStart(2, '0')).join('').toUpperCase();
  }

  function luminance(hex) {
    if (!hex) return 1;
    hex = hex.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;
    const lin = (c) => c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  }

  function isDefaultFontBrowser(family) {
    if (!family) return true;
    const defaults = ['system-ui', 'arial', 'helvetica', 'sans-serif', '-apple-system', 'blinkmacsystemfont', 'segoe ui', 'roboto', 'ui-sans-serif'];
    const lower = family.toLowerCase().replace(/["']/g, '').trim();
    return lower.split(',').map(s => s.trim()).every(p => defaults.includes(p));
  }

  const result = {};

  // ─── Typography ───
  let h1El = document.querySelector('h1');
  let usedFallbackH1 = false;

  // h1 fallback: if no h1 or h1 is outside viewport
  if (h1El) {
    const rect = h1El.getBoundingClientRect();
    if (rect.top > window.innerHeight) {
      h1El = null;
    }
  }

  if (!h1El) {
    // Find largest font-size text element
    let maxSize = 0;
    let maxEl = null;
    const textEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div, a');
    for (const el of textEls) {
      if (el.innerText && el.innerText.trim().length > 0) {
        const size = parseFloat(window.getComputedStyle(el).fontSize);
        const rect = el.getBoundingClientRect();
        if (size > maxSize && rect.top < window.innerHeight && rect.top >= 0) {
          maxSize = size;
          maxEl = el;
        }
      }
    }
    if (maxEl) {
      h1El = maxEl;
      usedFallbackH1 = true;
    }
  }

  const h1Style = cs(h1El);
  result.h1_font_family = h1Style ? h1Style.fontFamily : null;
  result.h1_font_size = h1Style ? px(h1Style.fontSize) : null;
  result.h1_font_weight = h1Style ? h1Style.fontWeight : null;
  result.h1_line_height = h1Style ? px(h1Style.lineHeight) : null;
  result.h1_letter_spacing = h1Style ? h1Style.letterSpacing : null;
  result.h1_color = h1Style ? rgbToHexBrowser(h1Style.color) : null;
  result.h1_fallback_used = usedFallbackH1;

  const h2El = document.querySelector('h2');
  const h2Style = cs(h2El);
  result.h2_font_size = h2Style ? px(h2Style.fontSize) : null;
  result.h2_font_weight = h2Style ? h2Style.fontWeight : null;

  const bodyEl = document.body;
  const bodyStyle = cs(bodyEl);
  result.body_font_family = bodyStyle ? bodyStyle.fontFamily : null;
  result.body_font_size = bodyStyle ? px(bodyStyle.fontSize) : null;
  result.body_line_height = bodyStyle ? px(bodyStyle.lineHeight) : null;
  result.body_color = bodyStyle ? rgbToHexBrowser(bodyStyle.color) : null;

  const navEl = document.querySelector('nav');
  const navLink = navEl ? navEl.querySelector('a') : null;
  const navLinkStyle = cs(navLink);
  result.nav_link_font_size = navLinkStyle ? px(navLinkStyle.fontSize) : null;
  result.nav_link_font_weight = navLinkStyle ? navLinkStyle.fontWeight : null;

  // Collect all unique font data
  const allFamilies = new Set();
  const allSizes = new Set();
  const allWeights = new Set();
  const sampleEls = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, a, button, li, td, th, label, input, div');
  const maxSample = Math.min(sampleEls.length, 500);
  for (let i = 0; i < maxSample; i++) {
    const s = window.getComputedStyle(sampleEls[i]);
    if (s.fontFamily) allFamilies.add(s.fontFamily);
    if (s.fontSize) allSizes.add(px(s.fontSize));
    if (s.fontWeight) allWeights.add(s.fontWeight);
  }
  result.unique_font_families = [...allFamilies];
  result.unique_font_sizes = [...allSizes].filter(Boolean).sort((a, b) => a - b);
  result.unique_font_weights = [...allWeights];
  result.font_is_default = isDefaultFontBrowser(result.body_font_family);

  // ─── Colors ───
  result.body_bg_color = bodyStyle ? rgbToHexBrowser(bodyStyle.backgroundColor) : null;
  result.body_text_color = result.body_color;

  // CTA button
  const ctaBtns = document.querySelectorAll('a[class*="cta"], button[class*="cta"], a[class*="primary"], button[class*="primary"], .hero button, .hero a[href], header a[href]:not([class*="nav"]):not([class*="link"])');
  let ctaBtn = null;
  for (const btn of ctaBtns) {
    const rect = btn.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.width > 0) {
      ctaBtn = btn;
      break;
    }
  }
  if (!ctaBtn) {
    // Fallback: find prominent button in hero area
    const allBtns = document.querySelectorAll('button, a[role="button"], [class*="btn"], [class*="button"]');
    for (const btn of allBtns) {
      const rect = btn.getBoundingClientRect();
      const s = window.getComputedStyle(btn);
      const bg = rgbToHexBrowser(s.backgroundColor);
      if (rect.top < window.innerHeight && rect.width > 60 && bg && bg !== '#FFFFFF' && bg !== '#000000' && bg !== '#00000000') {
        ctaBtn = btn;
        break;
      }
    }
  }
  const ctaStyle = cs(ctaBtn);
  result.cta_bg_color = ctaStyle ? rgbToHexBrowser(ctaStyle.backgroundColor) : null;
  result.cta_text_color = ctaStyle ? rgbToHexBrowser(ctaStyle.color) : null;

  // Link color
  const linkEl = document.querySelector('a[href]:not(nav a)');
  const linkStyle = cs(linkEl);
  result.link_color = linkStyle ? rgbToHexBrowser(linkStyle.color) : null;

  // Collect top colors
  const textColors = {};
  const bgColors = {};
  const borderColors = {};
  for (let i = 0; i < maxSample; i++) {
    const s = window.getComputedStyle(sampleEls[i]);
    const tc = rgbToHexBrowser(s.color);
    if (tc) textColors[tc] = (textColors[tc] || 0) + 1;
    const bc = rgbToHexBrowser(s.backgroundColor);
    if (bc && bc !== '#00000000') bgColors[bc] = (bgColors[bc] || 0) + 1;
    const brc = rgbToHexBrowser(s.borderColor);
    if (brc && brc !== '#00000000') borderColors[brc] = (borderColors[brc] || 0) + 1;
  }

  const topN = (obj, n) => Object.entries(obj).sort((a, b) => b[1] - a[1]).slice(0, n).map(e => e[0]);
  result.top_text_colors = topN(textColors, 30);
  result.top_bg_colors = topN(bgColors, 30);
  result.top_border_colors = topN(borderColors, 15);
  result.unique_color_count = new Set([...Object.keys(textColors), ...Object.keys(bgColors), ...Object.keys(borderColors)]).size;

  const bodyBgLum = luminance(result.body_bg_color);
  result.is_dark_theme = bodyBgLum < 0.4;

  // Dark section detection
  let hasDarkSection = false;
  const sections = document.querySelectorAll('section, [class*="section"], main > div');
  for (const sec of sections) {
    const bg = rgbToHexBrowser(window.getComputedStyle(sec).backgroundColor);
    if (bg && luminance(bg) < 0.15) {
      hasDarkSection = true;
      break;
    }
  }
  result.dark_section_exists = hasDarkSection;

  // ─── Spacing ───
  // Container max-width
  const containers = document.querySelectorAll('[class*="container"], [class*="wrapper"], [class*="max-w"], main > div');
  let maxContainerWidth = null;
  for (const c of containers) {
    const mw = window.getComputedStyle(c).maxWidth;
    if (mw && mw !== 'none') {
      const val = parseFloat(mw);
      if (!isNaN(val) && (maxContainerWidth === null || val > maxContainerWidth)) {
        maxContainerWidth = val;
      }
    }
  }
  result.container_max_width = maxContainerWidth;

  // Nav height
  result.nav_height = navEl ? navEl.getBoundingClientRect().height : null;

  // Hero section
  const heroEl = document.querySelector('[class*="hero"], [class*="Hero"], header + section, main > section:first-child, main > div:first-child');
  const heroStyle = cs(heroEl);
  result.hero_padding_top = heroStyle ? px(heroStyle.paddingTop) : null;
  result.hero_padding_bottom = heroStyle ? px(heroStyle.paddingBottom) : null;

  // All section padding-top
  const sectionPaddingTops = [];
  for (const sec of sections) {
    const pt = px(window.getComputedStyle(sec).paddingTop);
    if (pt !== null && pt > 0) sectionPaddingTops.push(pt);
  }
  result.section_padding_tops = sectionPaddingTops;

  // Card detection
  const cardEl = document.querySelector('[class*="card"], [class*="Card"]');
  const cardStyle = cs(cardEl);
  result.card_padding = cardStyle ? px(cardStyle.padding) || px(cardStyle.paddingLeft) : null;
  result.card_border_radius = cardStyle ? px(cardStyle.borderRadius) : null;
  result.card_has_shadow = cardStyle ? cardStyle.boxShadow !== 'none' : false;
  result.card_has_border = cardStyle ? cardStyle.borderWidth !== '0px' && cardStyle.borderStyle !== 'none' : false;

  // Button spacing
  const btnEl = ctaBtn || document.querySelector('button, [class*="btn"], [class*="button"]');
  const btnStyle = cs(btnEl);
  result.button_padding_left = btnStyle ? px(btnStyle.paddingLeft) : null;
  result.button_padding_top = btnStyle ? px(btnStyle.paddingTop) : null;
  result.button_border_radius = btnStyle ? px(btnStyle.borderRadius) : null;

  // ─── Layout ───
  // Hero type detection
  let heroType = 'minimal';
  if (h1El) {
    const h1Rect = h1El.getBoundingClientRect();
    const heroImages = heroEl ? heroEl.querySelectorAll('img, video, picture') : document.querySelectorAll('.hero img, header img');
    const hasImage = heroImages.length > 0;
    const centerThreshold = window.innerWidth * 0.3;

    if (h1Rect.left > centerThreshold && h1Rect.right < window.innerWidth - centerThreshold) {
      heroType = hasImage ? 'center' : 'center';
    } else if (hasImage) {
      heroType = 'split';
    }

    // Check fullscreen
    if (heroEl) {
      const heroRect = heroEl.getBoundingClientRect();
      if (heroRect.height >= window.innerHeight * 0.9) {
        heroType = 'fullscreen';
      }
    }
  }
  result.hero_type = heroType;

  // Hero in viewport
  result.hero_h1_in_viewport = h1El ? h1El.getBoundingClientRect().top < window.innerHeight * 0.5 : false;

  // Hero elements
  const heroScope = heroEl || document;
  const heroArea = heroEl || document.querySelector('header') || document.body;
  const heroImgs = heroArea.querySelectorAll('img');
  const heroVideos = heroArea.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]');
  const heroBadges = heroArea.querySelectorAll('[class*="badge"], [class*="chip"], [class*="tag"]');
  const heroButtons = heroArea.querySelectorAll('button, a[class*="btn"], a[class*="button"], a[role="button"]');
  let heroCTACount = 0;
  for (const btn of heroButtons) {
    if (btn.getBoundingClientRect().top < window.innerHeight) heroCTACount++;
  }

  result.hero_has_badge = heroBadges.length > 0;
  result.hero_has_image = heroImgs.length > 0;
  result.hero_has_video = heroVideos.length > 0;
  result.hero_cta_count = Math.min(heroCTACount, 10);

  // Nav
  result.nav_position = navEl ? window.getComputedStyle(navEl).position : null;
  const navCTA = navEl ? navEl.querySelector('button, a[class*="btn"], a[class*="cta"], a[class*="signup"], a[class*="start"]') : null;
  result.nav_has_cta = !!navCTA;

  // Total sections
  result.total_section_count = sections.length;

  // Feature detection
  const pageText = document.body.innerText.toLowerCase();
  const pageHTML = document.body.innerHTML.toLowerCase();

  // Logo bar (social proof)
  const logoBar = document.querySelector('[class*="logo-bar"], [class*="logos"], [class*="trusted"], [class*="partners"], [class*="companies"], [class*="clients"]');
  result.has_social_proof_logos = !!logoBar || pageText.includes('trusted by') || pageText.includes('used by');

  result.has_pricing_section = !!document.querySelector('[class*="pricing"], [id*="pricing"]') || pageText.includes('pricing');
  result.has_testimonials = !!document.querySelector('[class*="testimonial"], [class*="review"], [class*="quote"]') || pageText.includes('testimonial');
  result.has_faq = !!document.querySelector('[class*="faq"], [id*="faq"]') || pageText.includes('frequently asked');

  // Footer columns
  const footer = document.querySelector('footer');
  if (footer) {
    const footerChildren = footer.querySelectorAll(':scope > div > div, :scope > div > ul, :scope > nav, :scope > div > nav');
    result.footer_column_count = footerChildren.length || null;
  } else {
    result.footer_column_count = null;
  }

  // ─── Visual Effects ───
  result.has_animation = pageHTML.includes('animate') || pageHTML.includes('motion') || pageHTML.includes('transition') || pageHTML.includes('fade');
  result.has_gradient_text = pageHTML.includes('background-clip') && pageHTML.includes('text');

  let hasBackdropBlur = false;
  const allEls = document.querySelectorAll('*');
  const blurSample = Math.min(allEls.length, 300);
  for (let i = 0; i < blurSample; i++) {
    const bf = window.getComputedStyle(allEls[i]).backdropFilter;
    if (bf && bf !== 'none') {
      hasBackdropBlur = true;
      break;
    }
  }
  result.has_backdrop_blur = hasBackdropBlur;

  const svgs = document.querySelectorAll('svg');
  result.has_illustration_svg = svgs.length > 5;

  const imgs = document.querySelectorAll('img');
  let hasScreenshot = false;
  let hasPhoto = false;
  for (const img of imgs) {
    const src = (img.src || '').toLowerCase();
    const alt = (img.alt || '').toLowerCase();
    const cls = (img.className || '').toLowerCase();
    if (src.includes('screenshot') || alt.includes('screenshot') || alt.includes('dashboard') || alt.includes('product') || cls.includes('product') || cls.includes('screenshot')) {
      hasScreenshot = true;
    }
    if (src.includes('photo') || src.includes('unsplash') || alt.includes('photo') || alt.includes('team') || alt.includes('person')) {
      hasPhoto = true;
    }
  }
  result.has_product_screenshot = hasScreenshot;
  result.has_real_photo = hasPhoto;

  return result;
}

// ─── Ratio computation (runs in Node) ───

function computeRatios(data) {
  const ratios = {};

  ratios.h1_body_ratio = (data.h1_font_size && data.body_font_size)
    ? Math.round((data.h1_font_size / data.body_font_size) * 100) / 100
    : null;

  // h1 margin-bottom would require additional extraction; approximate via line-height
  ratios.h1_margin_ratio = null;

  ratios.h2_h1_ratio = (data.h2_font_size && data.h1_font_size)
    ? Math.round((data.h2_font_size / data.h1_font_size) * 100) / 100
    : null;

  // Hero viewport ratio
  const heroHeight = (data.hero_padding_top || 0) + (data.hero_padding_bottom || 0) + (data.h1_font_size || 0) * 3;
  ratios.hero_viewport_ratio = Math.round((heroHeight / 900) * 100) / 100;

  // Section padding variance
  if (data.section_padding_tops && data.section_padding_tops.length > 1) {
    const sorted = [...data.section_padding_tops].sort((a, b) => a - b);
    const median = sorted[Math.floor(sorted.length / 2)];
    const mean = sorted.reduce((a, b) => a + b, 0) / sorted.length;
    const variance = sorted.reduce((a, v) => a + Math.pow(v - mean, 2), 0) / sorted.length;
    const stdDev = Math.sqrt(variance);
    ratios.section_padding_variance = median > 0 ? Math.round((stdDev / median) * 100) / 100 : null;
  } else {
    ratios.section_padding_variance = null;
  }

  ratios.container_viewport_ratio = data.container_max_width
    ? Math.round((data.container_max_width / 1440) * 100) / 100
    : null;

  ratios.card_padding_ratio = null; // Would need card width

  const btnHeight = data.button_padding_top ? data.button_padding_top * 2 + (data.body_font_size || 16) : null;
  ratios.button_height_body_ratio = (btnHeight && data.body_font_size)
    ? Math.round((btnHeight / data.body_font_size) * 100) / 100
    : null;

  // Neutral color ratio (grays, whites, blacks)
  if (data.unique_color_count > 0) {
    const allColors = [...(data.top_text_colors || []), ...(data.top_bg_colors || []), ...(data.top_border_colors || [])];
    const uniqueColors = [...new Set(allColors)];
    let neutralCount = 0;
    for (const hex of uniqueColors) {
      if (!hex) continue;
      const clean = hex.replace('#', '');
      if (clean.length !== 6) continue;
      const r = parseInt(clean.substring(0, 2), 16);
      const g = parseInt(clean.substring(2, 4), 16);
      const b = parseInt(clean.substring(4, 6), 16);
      const maxDiff = Math.max(Math.abs(r - g), Math.abs(r - b), Math.abs(g - b));
      if (maxDiff < 30) neutralCount++;
    }
    ratios.neutral_color_ratio = Math.round((neutralCount / Math.max(uniqueColors.length, 1)) * 100) / 100;
  } else {
    ratios.neutral_color_ratio = null;
  }

  ratios.unique_fontsize_count = data.unique_font_sizes ? data.unique_font_sizes.length : 0;

  return ratios;
}

// ─── Main ───

async function analyzeSite(page, urlEntry) {
  const { url } = urlEntry;

  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: PER_SITE_TIMEOUT });
  } catch (err) {
    throw new Error(`Navigation failed: ${err.message}`);
  }

  // Wait for network idle with timeout
  try {
    await page.waitForLoadState('networkidle', { timeout: NETWORK_IDLE_TIMEOUT });
  } catch {}

  // Dismiss cookie banners
  await dismissCookies(page);
  await page.waitForTimeout(500);

  // Take screenshot
  const domain = new URL(url).hostname.replace('www.', '');
  const screenshotPath = path.join(SCREENSHOTS_DIR, `${domain}.png`);
  try {
    await page.screenshot({ path: screenshotPath, fullPage: false });
  } catch {}

  // Full page screenshot (max 5000px)
  try {
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, `${domain}-full.png`),
      fullPage: true,
      clip: { x: 0, y: 0, width: 1440, height: 5000 },
    });
  } catch {}

  // Extract CSS data
  const cssData = await page.evaluate(extractCssData);

  // Compute ratios in Node
  const ratios = computeRatios(cssData);

  return {
    url,
    domain,
    category: urlEntry.category,
    analyzed_at: new Date().toISOString(),
    ...cssData,
    ...ratios,
  };
}

async function main() {
  const args = process.argv.slice(2);

  // Parse flags
  const urlsIdx = args.indexOf('--urls');
  const urlsPath = urlsIdx !== -1 ? args[urlsIdx + 1] : path.join(DATA_DIR, 'urls.json');

  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1], 10) : Infinity;

  const resume = args.includes('--resume');

  // Load URLs
  if (!fs.existsSync(urlsPath)) {
    console.error(`URL file not found: ${urlsPath}`);
    console.error('Run "node scripts/1-collect-urls.js" first.');
    process.exit(1);
  }

  const { urls } = JSON.parse(fs.readFileSync(urlsPath, 'utf-8'));
  console.log(`Loaded ${urls.length} URLs from ${urlsPath}`);

  // Ensure directories
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  // Load existing results for resume
  const outputPath = path.join(DATA_DIR, 'css-analysis.json');
  let results = [];
  const analyzedUrls = new Set();

  if (resume && fs.existsSync(outputPath)) {
    results = JSON.parse(fs.readFileSync(outputPath, 'utf-8'));
    for (const r of results) {
      analyzedUrls.add(r.url);
    }
    console.log(`Resuming: ${results.length} sites already analyzed`);
  }

  // Filter and limit
  let toAnalyze = urls.filter(u => !analyzedUrls.has(u.url));
  if (limit < toAnalyze.length) {
    toAnalyze = toAnalyze.slice(0, limit);
  }

  console.log(`Will analyze ${toAnalyze.length} sites (concurrency: ${CONCURRENCY})`);

  // Launch browser
  const browser = await chromium.launch({ headless: true });

  let completed = 0;
  let failed = 0;
  let lastSaveCount = 0;

  // Process in batches of CONCURRENCY
  for (let i = 0; i < toAnalyze.length; i += CONCURRENCY) {
    const batch = toAnalyze.slice(i, i + CONCURRENCY);

    const promises = batch.map(async (urlEntry) => {
      const context = await browser.newContext({
        viewport: VIEWPORT,
        userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        ignoreHTTPSErrors: true,
      });
      const page = await context.newPage();

      try {
        const result = await analyzeSite(page, urlEntry);
        results.push(result);
        completed++;
        console.log(`  [${completed + failed}/${toAnalyze.length}] OK: ${urlEntry.url}`);
      } catch (err) {
        failed++;
        console.log(`  [${completed + failed}/${toAnalyze.length}] FAIL: ${urlEntry.url} — ${err.message.slice(0, 80)}`);
      } finally {
        await page.close();
        await context.close();
      }
    });

    await Promise.all(promises);

    // Save every SAVE_INTERVAL sites
    if (completed + failed - lastSaveCount >= SAVE_INTERVAL) {
      fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
      lastSaveCount = completed + failed;
      console.log(`  [save] ${results.length} results saved`);
    }
  }

  // Final save
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  await browser.close();

  console.log(`\n=== CSS Analysis Complete ===`);
  console.log(`Analyzed: ${completed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total results: ${results.length}`);
  console.log(`Output: ${outputPath}`);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
