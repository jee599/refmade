const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, '..', 'data');

const SEED_URLS = {
  saas: [
    'linear.app', 'vercel.com', 'stripe.com', 'notion.so', 'figma.com',
    'slack.com', 'github.com', 'railway.app', 'planetscale.com', 'supabase.com',
    'resend.com', 'cal.com', 'dub.co', 'clerk.com', 'convex.dev',
    'turso.tech', 'neon.tech', 'upstash.com', 'axiom.co', 'posthog.com',
    'plausible.io', 'mintlify.com', 'tailwindcss.com', 'ui.shadcn.com', 'framer.com',
    'webflow.com', 'retool.com', 'airtable.com', 'pitch.com', 'rows.com',
    'coda.io', 'zapier.com', 'n8n.io', 'inngest.com', 'trigger.dev',
    'fly.io', 'render.com', 'sentry.io', 'auth0.com', 'stytch.com',
    'workos.com', 'knock.app', 'loops.so', 'intercom.com', 'algolia.com',
    'sanity.io', 'contentful.com', 'ghost.org', 'beehiiv.com', 'lemonsqueezy.com',
    'paddle.com', 'attio.com', 'clay.com', 'instantly.ai', 'height.app',
    'amie.so', 'huly.io', 'plane.so', 'monday.com', 'clickup.com',
    'asana.com', 'loom.com', 'miro.com', 'craft.do', 'superhuman.com',
    'raycast.com', 'arc.net', 'warp.dev', 'zed.dev', 'cursor.com', 'tauri.app',
  ],
  devtools: [
    'nextjs.org', 'react.dev', 'vuejs.org', 'svelte.dev', 'astro.build',
    'remix.run', 'nuxt.com', 'solidjs.com', 'angular.dev', 'vitejs.dev',
    'turbo.build', 'biomejs.dev', 'prisma.io', 'drizzle.team', 'trpc.io',
    'hono.dev', 'elysiajs.com', 'bun.sh', 'deno.com', 'effect.website',
    'tailwindui.com', 'headlessui.com', 'radix-ui.com', 'mantine.dev', 'chakra-ui.com',
    'ant.design', 'mui.com', 'storybook.js.org', 'chromatic.com', 'playwright.dev',
  ],
  ai: [
    'openai.com', 'anthropic.com', 'huggingface.co', 'replicate.com', 'together.ai',
    'modal.com', 'fireworks.ai', 'groq.com', 'perplexity.ai', 'midjourney.com',
    'stability.ai', 'runway.ml', 'pika.art', 'elevenlabs.io', 'descript.com',
    'otter.ai', 'dust.tt', 'langchain.com', 'llamaindex.ai', 'pinecone.io',
    'weaviate.io', 'qdrant.tech', 'cohere.com', 'mistral.ai', 'deepmind.google',
  ],
  fintech: [
    'mercury.com', 'brex.com', 'ramp.com', 'deel.com', 'rippling.com',
    'gusto.com', 'wise.com', 'revolut.com', 'robinhood.com', 'coinbase.com',
    'shopify.com', 'gumroad.com', 'plaid.com', 'moov.io', 'square.com',
    'affirm.com', 'klarna.com',
  ],
  korean: [
    'toss.im', 'kakaocorp.com', 'about.daangn.com', 'baemin.com', 'channel.io',
    'sendbird.com', 'ab180.co', 'bucketplace.com', 'ridi.com', 'class101.net',
    'musinsa.com', 'wadiz.kr', 'wanted.co.kr', 'rallit.com', 'disquiet.io',
  ],
  bigtech: [
    'apple.com', 'google.com', 'microsoft.com', 'amazon.com', 'netflix.com',
    'spotify.com', 'airbnb.com', 'uber.com', 'dropbox.com', 'twitch.tv',
  ],
  design: [
    'canva.com', 'spline.design', 'rive.app', 'lottiefiles.com', 'readymag.com',
    'tldraw.com', 'excalidraw.com', 'diagram.com', 'magicpatterns.com', 'coolors.co',
  ],
};

function ensureHttps(url) {
  if (url.startsWith('https://') || url.startsWith('http://')) {
    return url;
  }
  return `https://${url}`;
}

function normalizeUrl(url) {
  // Remove trailing slash, lowercase
  return url.replace(/\/+$/, '').toLowerCase();
}

function buildUrlList() {
  const seen = new Set();
  const urls = [];

  for (const [category, domains] of Object.entries(SEED_URLS)) {
    for (const domain of domains) {
      const fullUrl = normalizeUrl(ensureHttps(domain));
      if (seen.has(fullUrl)) {
        console.log(`  [dedup] Skipping duplicate: ${fullUrl}`);
        continue;
      }
      seen.add(fullUrl);
      urls.push({
        url: fullUrl,
        category,
        control_group: false,
      });
    }
  }

  return urls;
}

function main() {
  const args = process.argv.slice(2);
  const roundIdx = args.indexOf('--round');
  const round = roundIdx !== -1 ? parseInt(args[roundIdx + 1], 10) : null;

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  const urls = buildUrlList();

  // Log category counts
  const categoryCounts = {};
  for (const entry of urls) {
    categoryCounts[entry.category] = (categoryCounts[entry.category] || 0) + 1;
  }

  console.log('\n=== URL Collection ===');
  console.log(`Total unique URLs: ${urls.length}`);
  console.log('\nPer category:');
  for (const [cat, count] of Object.entries(categoryCounts)) {
    console.log(`  ${cat}: ${count}`);
  }

  const data = { urls };

  if (round !== null && round > 0) {
    // Create a subset for the specified round
    // Each round gets a different slice of the URLs
    const perRound = Math.ceil(urls.length / 4);
    const start = (round - 1) * perRound;
    const subset = urls.slice(start, start + perRound);
    const roundData = { urls: subset, round };

    const roundFile = path.join(DATA_DIR, `urls-round${round}.json`);
    fs.writeFileSync(roundFile, JSON.stringify(roundData, null, 2));
    console.log(`\nRound ${round}: ${subset.length} URLs written to ${roundFile}`);
  }

  // Always write the full list
  const outputFile = path.join(DATA_DIR, 'urls.json');
  fs.writeFileSync(outputFile, JSON.stringify(data, null, 2));
  console.log(`\nFull list written to ${outputFile}`);
}

main();
