const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');
const OUTPUT_PATH = path.join(DATA_DIR, 'statistics.json');

// ─── Tailwind Mappings ───

const PX_TO_TAILWIND_SPACING = {
  0: '0', 1: 'px', 2: '0.5', 4: '1', 6: '1.5', 8: '2', 10: '2.5', 12: '3',
  14: '3.5', 16: '4', 20: '5', 24: '6', 28: '7', 32: '8', 36: '9', 40: '10',
  44: '11', 48: '12', 56: '14', 64: '16', 72: '18', 80: '20', 96: '24',
  112: '28', 128: '32', 144: '36', 160: '40', 176: '44', 192: '48',
  208: '52', 224: '56', 240: '60', 256: '64', 288: '72', 320: '80', 384: '96',
};

const PX_TO_TAILWIND_FONTSIZE = {
  12: 'xs', 14: 'sm', 16: 'base', 18: 'lg', 20: 'xl', 24: '2xl',
  30: '3xl', 36: '4xl', 48: '5xl', 60: '6xl', 72: '7xl', 96: '8xl', 128: '9xl',
};

const PX_TO_TAILWIND_RADIUS = {
  0: 'none', 2: 'sm', 4: 'DEFAULT', 6: 'md', 8: 'lg', 12: 'xl', 16: '2xl', 24: '3xl', 9999: 'full',
};

function pxToTailwindSpacing(px) {
  if (px === null || px === undefined) return null;
  const rounded = Math.round(px);
  if (PX_TO_TAILWIND_SPACING[rounded]) return PX_TO_TAILWIND_SPACING[rounded];
  // Find closest
  const keys = Object.keys(PX_TO_TAILWIND_SPACING).map(Number);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - rounded) < Math.abs(closest - rounded)) closest = k;
  }
  return `~${PX_TO_TAILWIND_SPACING[closest]} (${px}px)`;
}

function pxToTailwindFontSize(px) {
  if (px === null || px === undefined) return null;
  const rounded = Math.round(px);
  if (PX_TO_TAILWIND_FONTSIZE[rounded]) return `text-${PX_TO_TAILWIND_FONTSIZE[rounded]}`;
  const keys = Object.keys(PX_TO_TAILWIND_FONTSIZE).map(Number);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - rounded) < Math.abs(closest - rounded)) closest = k;
  }
  return `~text-${PX_TO_TAILWIND_FONTSIZE[closest]} (${px}px)`;
}

function pxToTailwindRadius(px) {
  if (px === null || px === undefined) return null;
  const rounded = Math.round(px);
  if (rounded >= 9999 || rounded >= 100) return 'rounded-full';
  if (PX_TO_TAILWIND_RADIUS[rounded]) return `rounded-${PX_TO_TAILWIND_RADIUS[rounded]}`;
  const keys = Object.keys(PX_TO_TAILWIND_RADIUS).map(Number).filter(k => k < 9999);
  let closest = keys[0];
  for (const k of keys) {
    if (Math.abs(k - rounded) < Math.abs(closest - rounded)) closest = k;
  }
  return `~rounded-${PX_TO_TAILWIND_RADIUS[closest]} (${px}px)`;
}

// ─── Statistics Functions ───

function weightedSort(values, weights) {
  // Create (value, weight) pairs, sorted by value
  const pairs = values.map((v, i) => ({ value: v, weight: weights[i] || 1 }));
  pairs.sort((a, b) => a.value - b.value);
  return pairs;
}

function weightedPercentile(pairs, percentile) {
  if (pairs.length === 0) return null;
  const totalWeight = pairs.reduce((s, p) => s + p.weight, 0);
  const target = totalWeight * percentile;
  let cumulative = 0;
  for (const p of pairs) {
    cumulative += p.weight;
    if (cumulative >= target) return p.value;
  }
  return pairs[pairs.length - 1].value;
}

function weightedMedian(values, weights) {
  const pairs = weightedSort(values, weights);
  return weightedPercentile(pairs, 0.5);
}

function weighted25(values, weights) {
  const pairs = weightedSort(values, weights);
  return weightedPercentile(pairs, 0.25);
}

function weighted75(values, weights) {
  const pairs = weightedSort(values, weights);
  return weightedPercentile(pairs, 0.75);
}

function mode(values) {
  if (values.length === 0) return null;
  const counts = {};
  for (const v of values) {
    const key = String(v);
    counts[key] = (counts[key] || 0) + 1;
  }
  let maxCount = 0;
  let modeVal = null;
  for (const [k, c] of Object.entries(counts)) {
    if (c > maxCount) {
      maxCount = c;
      modeVal = k;
    }
  }
  // Try to return as number if it was numeric
  const num = parseFloat(modeVal);
  return isNaN(num) ? modeVal : num;
}

function frequencyDist(values) {
  const counts = {};
  for (const v of values) {
    if (v === null || v === undefined) continue;
    const key = String(v);
    counts[key] = (counts[key] || 0) + 1;
  }
  const total = Object.values(counts).reduce((s, c) => s + c, 0);
  const result = {};
  for (const [k, c] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    result[k] = {
      count: c,
      percentage: Math.round((c / total) * 1000) / 10,
    };
  }
  return result;
}

function booleanRate(values) {
  const trueCount = values.filter(v => v === true).length;
  const total = values.filter(v => v === true || v === false).length;
  if (total === 0) return null;
  return Math.round((trueCount / total) * 1000) / 10;
}

function numericStats(field, data, siteWeights) {
  const values = [];
  const weights = [];

  for (const site of data) {
    const v = site[field];
    if (v !== null && v !== undefined && typeof v === 'number' && !isNaN(v)) {
      values.push(v);
      weights.push(siteWeights[site.url] || siteWeights[site.domain] || 1);
    }
  }

  if (values.length === 0) return null;

  const median = weightedMedian(values, weights);
  const p25 = weighted25(values, weights);
  const p75 = weighted75(values, weights);
  const modeVal = mode(values);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const mean = Math.round(values.reduce((s, v) => s + v, 0) / values.length * 100) / 100;

  const result = {
    count: values.length,
    median,
    p25,
    p75,
    mode: modeVal,
    min,
    max,
    mean,
  };

  // Add Tailwind mappings where relevant
  if (field.includes('font_size') || field === 'body_font_size') {
    result.tailwind_median = pxToTailwindFontSize(median);
    result.tailwind_p25 = pxToTailwindFontSize(p25);
    result.tailwind_p75 = pxToTailwindFontSize(p75);
  } else if (field.includes('padding') || field.includes('height') || field.includes('max_width') || field.includes('margin')) {
    result.tailwind_median = pxToTailwindSpacing(median);
    result.tailwind_p25 = pxToTailwindSpacing(p25);
    result.tailwind_p75 = pxToTailwindSpacing(p75);
  } else if (field.includes('border_radius')) {
    result.tailwind_median = pxToTailwindRadius(median);
    result.tailwind_p25 = pxToTailwindRadius(p25);
    result.tailwind_p75 = pxToTailwindRadius(p75);
  }

  return result;
}

// ─── Main ───

function main() {
  // Load CSS analysis data
  const cssPath = path.join(DATA_DIR, 'css-analysis.json');
  if (!fs.existsSync(cssPath)) {
    console.error('css-analysis.json not found. Run script 2 first.');
    process.exit(1);
  }

  const cssData = JSON.parse(fs.readFileSync(cssPath, 'utf-8'));
  console.log(`Loaded ${cssData.length} sites from css-analysis.json`);

  // Load visual analysis data (optional)
  const visualPath = path.join(DATA_DIR, 'visual-analysis.json');
  let visualData = [];
  if (fs.existsSync(visualPath)) {
    visualData = JSON.parse(fs.readFileSync(visualPath, 'utf-8'));
    console.log(`Loaded ${visualData.length} sites from visual-analysis.json`);
  } else {
    console.log('No visual-analysis.json found (optional, skipping visual stats)');
  }

  // Load site weights
  const weightsPath = path.join(DATA_DIR, 'site-weights.json');
  let siteWeights = {};
  if (fs.existsSync(weightsPath)) {
    siteWeights = JSON.parse(fs.readFileSync(weightsPath, 'utf-8'));
    console.log(`Loaded site weights for ${Object.keys(siteWeights).length} sites`);
  }

  // ─── Build Statistics ───
  const stats = {
    meta: {
      total_sites: cssData.length,
      visual_sites: visualData.length,
      generated_at: new Date().toISOString(),
    },
    typography: {},
    colors: {},
    spacing: {},
    layout: {},
    visual_effects: {},
    ratios: {},
  };

  // ─── Typography Stats ───
  const typoFields = [
    'h1_font_size', 'h2_font_size', 'body_font_size',
    'h1_line_height', 'body_line_height',
    'nav_link_font_size',
  ];
  for (const field of typoFields) {
    stats.typography[field] = numericStats(field, cssData, siteWeights);
  }

  stats.typography.h1_font_weight = frequencyDist(cssData.map(s => s.h1_font_weight).filter(Boolean));
  stats.typography.h2_font_weight = frequencyDist(cssData.map(s => s.h2_font_weight).filter(Boolean));
  stats.typography.nav_link_font_weight = frequencyDist(cssData.map(s => s.nav_link_font_weight).filter(Boolean));

  // Font families
  const allFontFamilies = {};
  for (const site of cssData) {
    const fam = site.h1_font_family || site.body_font_family;
    if (fam) {
      const primary = fam.split(',')[0].trim().replace(/["']/g, '');
      allFontFamilies[primary] = (allFontFamilies[primary] || 0) + 1;
    }
  }
  stats.typography.top_font_families = Object.entries(allFontFamilies)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([family, count]) => ({ family, count, percentage: Math.round(count / cssData.length * 1000) / 10 }));

  stats.typography.font_is_default_rate = booleanRate(cssData.map(s => s.font_is_default));
  stats.typography.unique_fontsize_count = numericStats('unique_fontsize_count', cssData, siteWeights);

  // ─── Color Stats ───
  stats.colors.is_dark_theme_rate = booleanRate(cssData.map(s => s.is_dark_theme));
  stats.colors.dark_section_exists_rate = booleanRate(cssData.map(s => s.dark_section_exists));
  stats.colors.unique_color_count = numericStats('unique_color_count', cssData, siteWeights);

  // Top CTA colors
  const ctaColors = {};
  for (const site of cssData) {
    if (site.cta_bg_color) {
      ctaColors[site.cta_bg_color] = (ctaColors[site.cta_bg_color] || 0) + 1;
    }
  }
  stats.colors.top_cta_bg_colors = Object.entries(ctaColors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([color, count]) => ({ color, count }));

  // Aggregate top body bg colors
  const bodyBgColors = {};
  for (const site of cssData) {
    if (site.body_bg_color) {
      bodyBgColors[site.body_bg_color] = (bodyBgColors[site.body_bg_color] || 0) + 1;
    }
  }
  stats.colors.top_body_bg_colors = Object.entries(bodyBgColors)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 15)
    .map(([color, count]) => ({ color, count }));

  // ─── Spacing Stats ───
  const spacingFields = [
    'container_max_width', 'nav_height',
    'hero_padding_top', 'hero_padding_bottom',
    'card_padding', 'card_border_radius',
    'button_padding_left', 'button_padding_top', 'button_border_radius',
  ];
  for (const field of spacingFields) {
    stats.spacing[field] = numericStats(field, cssData, siteWeights);
  }

  stats.spacing.card_has_shadow_rate = booleanRate(cssData.map(s => s.card_has_shadow));
  stats.spacing.card_has_border_rate = booleanRate(cssData.map(s => s.card_has_border));

  // ─── Layout Stats ───
  stats.layout.hero_type = frequencyDist(cssData.map(s => s.hero_type));
  stats.layout.nav_position = frequencyDist(cssData.map(s => s.nav_position));
  stats.layout.nav_has_cta_rate = booleanRate(cssData.map(s => s.nav_has_cta));
  stats.layout.hero_has_badge_rate = booleanRate(cssData.map(s => s.hero_has_badge));
  stats.layout.hero_has_image_rate = booleanRate(cssData.map(s => s.hero_has_image));
  stats.layout.hero_has_video_rate = booleanRate(cssData.map(s => s.hero_has_video));
  stats.layout.hero_cta_count = numericStats('hero_cta_count', cssData, siteWeights);
  stats.layout.total_section_count = numericStats('total_section_count', cssData, siteWeights);
  stats.layout.footer_column_count = numericStats('footer_column_count', cssData, siteWeights);
  stats.layout.has_social_proof_logos_rate = booleanRate(cssData.map(s => s.has_social_proof_logos));
  stats.layout.has_pricing_section_rate = booleanRate(cssData.map(s => s.has_pricing_section));
  stats.layout.has_testimonials_rate = booleanRate(cssData.map(s => s.has_testimonials));
  stats.layout.has_faq_rate = booleanRate(cssData.map(s => s.has_faq));

  // ─── Visual Effects Stats ───
  stats.visual_effects.has_animation_rate = booleanRate(cssData.map(s => s.has_animation));
  stats.visual_effects.has_gradient_text_rate = booleanRate(cssData.map(s => s.has_gradient_text));
  stats.visual_effects.has_backdrop_blur_rate = booleanRate(cssData.map(s => s.has_backdrop_blur));
  stats.visual_effects.has_illustration_svg_rate = booleanRate(cssData.map(s => s.has_illustration_svg));
  stats.visual_effects.has_product_screenshot_rate = booleanRate(cssData.map(s => s.has_product_screenshot));
  stats.visual_effects.has_real_photo_rate = booleanRate(cssData.map(s => s.has_real_photo));

  // ─── Ratio Stats ───
  const ratioFields = [
    'h1_body_ratio', 'h2_h1_ratio', 'hero_viewport_ratio',
    'section_padding_variance', 'container_viewport_ratio',
    'button_height_body_ratio', 'neutral_color_ratio',
  ];
  for (const field of ratioFields) {
    stats.ratios[field] = numericStats(field, cssData, siteWeights);
  }

  // ─── Category Breakdown ───
  const categories = [...new Set(cssData.map(s => s.category))];
  stats.by_category = {};
  for (const cat of categories) {
    const catData = cssData.filter(s => s.category === cat);
    stats.by_category[cat] = {
      count: catData.length,
      h1_font_size: numericStats('h1_font_size', catData, siteWeights),
      body_font_size: numericStats('body_font_size', catData, siteWeights),
      is_dark_theme_rate: booleanRate(catData.map(s => s.is_dark_theme)),
      has_animation_rate: booleanRate(catData.map(s => s.has_animation)),
      hero_type: frequencyDist(catData.map(s => s.hero_type)),
    };
  }

  // ─── Visual Analysis Stats (if available) ───
  if (visualData.length > 0) {
    stats.visual = {};

    // Quality-based filtering
    const topQuality = visualData.filter(s => s.visual_quality_score >= 7);
    const bottomQuality = visualData.filter(s => s.visual_quality_score <= 5);

    stats.visual.quality_score = numericStats('visual_quality_score', visualData, siteWeights);
    stats.visual.text_hierarchy_clarity = numericStats('text_hierarchy_clarity', visualData, siteWeights);
    stats.visual.cta_prominence = numericStats('cta_prominence', visualData, siteWeights);
    stats.visual.visual_consistency = numericStats('visual_consistency', visualData, siteWeights);
    stats.visual.innovation_score = numericStats('innovation_score', visualData, siteWeights);
    stats.visual.conversion_optimization_score = numericStats('conversion_optimization_score', visualData, siteWeights);

    stats.visual.design_style = frequencyDist(visualData.map(s => s.design_style));
    stats.visual.overall_impression = frequencyDist(visualData.map(s => s.overall_impression));
    stats.visual.color_scheme = frequencyDist(visualData.map(s => s.color_scheme));
    stats.visual.hero_layout_type = frequencyDist(visualData.map(s => s.hero_layout_type));
    stats.visual.cta_style = frequencyDist(visualData.map(s => s.cta_style));
    stats.visual.nav_style = frequencyDist(visualData.map(s => s.nav_style));
    stats.visual.use_of_gradients = frequencyDist(visualData.map(s => s.use_of_gradients));
    stats.visual.use_of_shadows = frequencyDist(visualData.map(s => s.use_of_shadows));
    stats.visual.use_of_borders = frequencyDist(visualData.map(s => s.use_of_borders));
    stats.visual.use_of_rounded_corners = frequencyDist(visualData.map(s => s.use_of_rounded_corners));
    stats.visual.emotional_tone = frequencyDist(visualData.map(s => s.emotional_tone));
    stats.visual.competitive_tier = frequencyDist(visualData.map(s => s.competitive_tier));
    stats.visual.illustration_style = frequencyDist(visualData.map(s => s.illustration_style));
    stats.visual.grid_impression = frequencyDist(visualData.map(s => s.grid_impression));

    // Quality group comparison
    if (topQuality.length > 0 && bottomQuality.length > 0) {
      stats.visual.quality_comparison = {
        top_count: topQuality.length,
        bottom_count: bottomQuality.length,
        top: {
          design_style: frequencyDist(topQuality.map(s => s.design_style)),
          cta_style: frequencyDist(topQuality.map(s => s.cta_style)),
          hero_layout_type: frequencyDist(topQuality.map(s => s.hero_layout_type)),
          use_of_gradients: frequencyDist(topQuality.map(s => s.use_of_gradients)),
          innovation_score: numericStats('innovation_score', topQuality, siteWeights),
        },
        bottom: {
          design_style: frequencyDist(bottomQuality.map(s => s.design_style)),
          cta_style: frequencyDist(bottomQuality.map(s => s.cta_style)),
          hero_layout_type: frequencyDist(bottomQuality.map(s => s.hero_layout_type)),
          use_of_gradients: frequencyDist(bottomQuality.map(s => s.use_of_gradients)),
          innovation_score: numericStats('innovation_score', bottomQuality, siteWeights),
        },
      };
    }

    // Tone Profiles — cluster by design_style + overall_impression
    const toneMap = {};
    for (const site of visualData) {
      const key = `${site.design_style || 'unknown'}_${site.overall_impression || 'unknown'}`;
      if (!toneMap[key]) toneMap[key] = [];
      toneMap[key].push(site);
    }

    // Pick top 5 tone clusters
    const sortedTones = Object.entries(toneMap).sort((a, b) => b[1].length - a[1].length).slice(0, 5);
    const toneLabels = ['A', 'B', 'C', 'D', 'E'];
    stats.visual.tone_profiles = {};

    for (let i = 0; i < sortedTones.length; i++) {
      const [key, sites] = sortedTones[i];
      const label = toneLabels[i];

      // Merge CSS data for these sites
      const domains = new Set(sites.map(s => s.domain));
      const matchedCss = cssData.filter(s => domains.has(s.domain));

      stats.visual.tone_profiles[`tone_${label}`] = {
        style_key: key,
        count: sites.length,
        example_domains: sites.slice(0, 5).map(s => s.domain),
        avg_quality: Math.round(sites.reduce((s, v) => s + (v.visual_quality_score || 0), 0) / sites.length * 10) / 10,
        css_ratios: matchedCss.length > 0 ? {
          h1_body_ratio: numericStats('h1_body_ratio', matchedCss, siteWeights),
          container_viewport_ratio: numericStats('container_viewport_ratio', matchedCss, siteWeights),
          neutral_color_ratio: numericStats('neutral_color_ratio', matchedCss, siteWeights),
        } : null,
      };
    }
  }

  // ─── Write Output ───
  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(stats, null, 2));

  console.log(`\n=== Statistics Complete ===`);
  console.log(`Sites analyzed: ${cssData.length}`);
  console.log(`Visual data: ${visualData.length}`);
  console.log(`Categories: ${categories.join(', ')}`);
  console.log(`Output: ${OUTPUT_PATH}`);
}

main();
