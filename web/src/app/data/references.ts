export type Reference = {
  id: string;
  name: string;
  tags: string[];
  tone: "light" | "dark";
  inspired: string[];
  accent: string;
  bg: string;
  status: "verified" | "draft";
  description: string;
  sampleFile?: string;
  views: number;
  downloads: number;
};

export const references: Reference[] = [
  { id: '001', name: 'Clean Minimal', tags: ['minimal', 'monochrome', 'saas'], tone: 'light', inspired: ['linear.app', 'cal.com'], accent: '#000000', bg: '#ffffff', status: 'verified', description: 'Gradient shimmer text, animated dividers, number tickers, hover reveals', sampleFile: '001-clean-minimal.html', views: 542, downloads: 189 },
  { id: '002', name: 'Professional Blue', tags: ['professional', 'blue', 'saas'], tone: 'light', inspired: ['stripe.com', 'vercel.com'], accent: '#2563eb', bg: '#ffffff', status: 'verified', description: 'Glass nav, bento features, mockup animations, gradient CTA', sampleFile: '002-professional-blue.html', views: 721, downloads: 256 },
  { id: '003', name: 'Developer Terminal', tags: ['developer', 'code', 'dark'], tone: 'dark', inspired: ['supabase.com', 'hono.dev'], accent: '#10b981', bg: '#09090b', status: 'verified', description: 'Typing animation, matrix canvas, network viz, live metrics', sampleFile: '003-developer-terminal.html', views: 678, downloads: 234 },
  { id: '006', name: 'AI Product', tags: ['ai', 'product', 'dark', 'typing'], tone: 'dark', inspired: ['anthropic.com', 'openai.com'], accent: '#6366f1', bg: '#0a0a0a', status: 'verified', description: 'Character-by-character code typing, syntax highlighting, simultaneous animations', sampleFile: '006-ai-product.html', views: 767, downloads: 298 },
  { id: '007', name: 'Korean Modern', tags: ['korean', 'mobile', 'app', 'toss'], tone: 'light', inspired: ['toss.im', 'daangn.com'], accent: '#3182f6', bg: '#ffffff', status: 'verified', description: 'Pretendard, phone mockup with check-off animation, kanban board, doc editor', sampleFile: '007-korean-modern.html', views: 694, downloads: 273 },
  { id: '014', name: 'Mobile App Landing', tags: ['mobile', 'app', 'download', 'light'], tone: 'light', inspired: ['revolut.com', 'wise.com'], accent: '#0ea5e9', bg: '#ffffff', status: 'verified', description: 'Phone notification popups, screen transitions, bento app screens, star fill', sampleFile: '014-mobile-app-landing.html', views: 567, downloads: 221 },
  { id: '023', name: 'Glassmorphism Crystal', tags: ['glass', 'blur', 'gradient', 'crystal'], tone: 'light', inspired: ['reflect.app', 'cosmos.so'], accent: '#6366f1', bg: '#f0f4ff', status: 'verified', description: 'Frosted crystal, blur-64px, rainbow shimmer borders, iridescent glass cards', sampleFile: '023-glassmorphism-light.html', views: 589, downloads: 232 },
  { id: '025', name: 'Cyberpunk Neon', tags: ['cyberpunk', 'neon', 'dark', 'city'], tone: 'dark', inspired: ['gsap.com', 'roasted.design'], accent: '#06b6d4', bg: '#0a0a0a', status: 'verified', description: 'Neon sign flicker, grid floor perspective, glitch effects, city silhouette', sampleFile: '025-neon-dark.html', views: 645, downloads: 267 },
  { id: '027', name: 'Gradient SaaS', tags: ['gradient', 'saas', 'pink', 'bento'], tone: 'light', inspired: ['superlist.com', 'wealthsimple.com'], accent: '#ec4899', bg: '#ffffff', status: 'verified', description: 'Pink-to-orange gradient, bento visual cards with UI mockups inside', sampleFile: '027-gradient-saas.html', views: 556, downloads: 218 },
  { id: '029', name: 'AI Chat Interface', tags: ['ai', 'chat', 'conversational'], tone: 'light', inspired: ['commandbar.com', 'jasper.ai'], accent: '#7c3aed', bg: '#fafafa', status: 'verified', description: 'Gradient AI text, glass chat UI, rotating border, typing dots, pulse dot badge', sampleFile: '029-ai-chat.html', views: 512, downloads: 195 },
  { id: '030', name: 'Racing Dynamic', tags: ['racing', 'sports', 'neon-green', 'fast'], tone: 'dark', inspired: ['landonorris.com'], accent: '#39FF14', bg: '#0a0a0a', status: 'verified', description: 'Speed counter 0→347, bento stats, CRT scanlines, card tilt hover', sampleFile: '030-racing-dynamic.html', views: 478, downloads: 182 },
  { id: '031', name: 'Minimal Product', tags: ['minimal', 'product', 'clean', 'indigo'], tone: 'light', inspired: ['tally.so', 'campsite.co'], accent: '#6366f1', bg: '#ffffff', status: 'verified', description: 'Gradient CTA, glass nav, bento features, mockup glow pulse', sampleFile: '031-minimal-product.html', views: 498, downloads: 194 },
  { id: '039', name: 'Green Phosphor CRT', tags: ['retro', 'crt', 'terminal', 'phosphor'], tone: 'dark', inspired: ['grafbase.com'], accent: '#00ff41', bg: '#0a0a0a', status: 'verified', description: 'CRT curvature, phosphor glow, boot sequence, flicker animation', sampleFile: '039-retro-pixel.html', views: 623, downloads: 256 },
  { id: '043', name: 'Horizontal Keynote', tags: ['horizontal', 'scroll', 'cinematic', 'presentation'], tone: 'dark', inspired: ['canals-amsterdam.com'], accent: '#a78bfa', bg: '#0a0a0a', status: 'verified', description: '6-slide keynote with scale/parallax/rotation/stagger/word-fade/converge', sampleFile: '043-horizontal-scroll.html', views: 587, downloads: 229 },
  { id: '048', name: 'Pastel Gradient Card', tags: ['pastel', 'gradient', 'soft', 'friendly'], tone: 'light', inspired: ['stripo.email'], accent: '#8b5cf6', bg: '#fafafa', status: 'verified', description: 'Rainbow pastel gradient cards, soft blobs, step flow, approachable', sampleFile: '048-pastel-gradient-card.html', views: 389, downloads: 154 },
  { id: '049', name: 'Monochrome Brutalist', tags: ['brutalist', 'monochrome', 'borders', 'typography'], tone: 'light', inspired: ['grafbase.com'], accent: '#000000', bg: '#ffffff', status: 'verified', description: 'Pure B/W, 3px borders, black card headers, hover inversion, zero color', sampleFile: '049-monochrome-brutalist.html', views: 401, downloads: 167 },
  { id: '052', name: 'Grain Texture Earth', tags: ['grain', 'earth', 'organic', 'texture'], tone: 'light', inspired: ['verholy.com'], accent: '#2563eb', bg: '#f5f0e8', status: 'verified', description: 'SVG noise filter, earth tones, sage green, wavy dividers, organic feel', sampleFile: '052-grain-texture-earth.html', views: 445, downloads: 178 },
  { id: '056', name: 'App Store Showcase', tags: ['mobile', 'app', 'dark', 'showcase'], tone: 'dark', inspired: ['revolut.com', 'wise.com'], accent: '#0ea5e9', bg: '#0a0a0a', status: 'verified', description: 'Dark fullscreen phone hero, floating UI screenshots, animated screen cycling', sampleFile: '056-app-store-showcase.html', views: 367, downloads: 121 },
  { id: '057', name: 'Zen Product', tags: ['zen', 'minimal', 'meditative', 'whitespace'], tone: 'light', inspired: ['tally.so'], accent: '#6366f1', bg: '#ffffff', status: 'verified', description: 'One element per viewport, 1200ms fades, orbiting dot, zen-breath pulse', sampleFile: '057-zen-product.html', views: 298, downloads: 94 },
  { id: '058', name: 'Candy Glass', tags: ['pastel', 'glass', 'candy', 'dreamy'], tone: 'light', inspired: ['stripo.email'], accent: '#8b5cf6', bg: '#fafafa', status: 'verified', description: 'Pastel gradients + glassmorphism, rainbow refraction borders, frosted candy cards', sampleFile: '058-candy-glass.html', views: 189, downloads: 54 },
];
