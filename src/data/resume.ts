// Single source of truth for every page (Professional + Personal, AR + EN).
// Live numbers come from ./stats.json, refreshed by scripts/fetch-stats.mjs at build time.
import stats from './stats.json';

export type Lang = 'ar' | 'en';
export type T = Record<Lang, string>;
export type TL = Record<Lang, string[]>;

/** Round down to the nearest hundred and add "+", e.g. 5671 -> "5,600+". */
export const floorPlus = (n: number, step = 100) =>
  `${(Math.floor(n / step) * step).toLocaleString('en-US')}+`;

export const live = {
  subscribers: stats.hrYemenSubscribers.value,
  subscribersPlus: floorPlus(stats.hrYemenSubscribers.value),
  npmMonthly: stats.thmanyahNpm.value,
  npmMonthlyPlus: floorPlus(stats.thmanyahNpm.value),
  npmPeriod: stats.thmanyahNpm.period,
  updatedAt: stats.updatedAt,
};

export const profile = {
  name: { ar: 'داوود صالح أحمد هرمس', en: 'Dawood Saleh' } as T,
  role: {
    ar: 'مهندس برمجيات · أدوات الذكاء الاصطناعي وخوادم MCP · مطوّر واجهات أمامية',
    en: 'Software Engineer · AI Tooling & MCP Servers · Front-End Developer',
  } as T,
  location: {
    ar: 'صنعاء، اليمن · متاح للعمل عن بُعد أو الانتقال',
    en: "Sana'a, Yemen · Open to remote or relocation",
  } as T,
  phone: '+967 777 505 208',
  phoneHref: 'tel:+967777505208',
  email: 'eng.dawoodsaleh@gmail.com',
  links: [
    { label: 'github.com/EngDawood', href: 'https://github.com/EngDawood', kind: 'github' },
    { label: 'linkedin.com/in/dawood3', href: 'https://www.linkedin.com/in/dawood3/', kind: 'linkedin' },
    { label: 'x.com/dawoodSaleh12', href: 'https://x.com/dawoodSaleh12', kind: 'x' },
    { label: 't.me/Dawo5d', href: 'https://t.me/Dawo5d', kind: 'telegram' },
    { label: 'engdawood.com', href: 'https://engdawood.com', kind: 'web' },
  ],
};

export const summary: TL = {
  ar: [
    'مهندس برمجيات من اليمن، أبني أدوات للذكاء الاصطناعي وواجهات أمامية للويب. نشرت 4 خوادم MCP مفتوحة المصدر تربط وكلاء الذكاء الاصطناعي بالأبحاث الأكاديمية والرسومات التوضيحية والتعرّف الضوئي على النصوص، وأبني واجهات ويب ثنائية اللغة (عربية من اليمين لليسار وإنجليزية) باستخدام React وAstro.',
    `يعمل معظم ما أبنيه على Cloudflare Workers: بوتات تيليجرام يتابعها أكثر من ${live.subscribersPlus.replace('+', '')} مشترك، وخطوط معالجة وسائط متينة، وواجهات REST وMCP. ولديّ خبرة أيضًا في كتابة الأبحاث الأكاديمية وتدريس علوم الحاسوب والرياضيات.`,
  ],
  en: [
    'Software engineer in Yemen who builds AI tooling and front-end interfaces. I have open-sourced 4 MCP servers that connect AI agents to academic research, illustrations and document OCR, and I build bilingual Arabic/English (RTL) web interfaces with React and Astro.',
    `Most of my work runs on Cloudflare Workers: Telegram bots with ${live.subscribersPlus} subscribers, durable media pipelines, and REST and MCP APIs. I also bring experience in academic research writing and teaching CS & Mathematics.`,
  ],
};

export type Link = { label: string; href: string };
export type Project = {
  id: string;
  title: T;
  /** one-line hook for the personal site */
  hook: T;
  links: Link[];
  bullets: TL;
  stack: string[];
  group: 'ai' | 'bots' | 'web';
  client?: boolean;
};

export const projects: Project[] = [
  {
    id: 'arabic-scholar',
    group: 'ai',
    title: { ar: 'خادم MCP للبحث الأكاديمي العربي', en: 'Arabic Scholar MCP Server' },
    hook: {
      ar: 'أكثر من 4 ملايين سجل أكاديمي عربي، في متناول أي وكيل ذكاء اصطناعي.',
      en: '4M+ Arabic academic records, one tool call away for any AI agent.',
    },
    links: [{ label: 'github.com/EngDawood/arabic-scholar-mcp-server', href: 'https://github.com/EngDawood/arabic-scholar-mcp-server' }],
    bullets: {
      ar: [
        'خادم MCP مفتوح يتيح لنماذج الذكاء الاصطناعي البحث في أكثر من 4 ملايين سجل أكاديمي عربي من قواعد المنظومة وASJP وSHAMAA.',
        'منشور كأداة مفتوحة لخدمة مجتمع البحث العلمي العربي.',
      ],
      en: [
        'Open MCP (Model Context Protocol) server that lets AI models search 4M+ Arabic academic records from Mandumah, ASJP and SHAMAA.',
        'Published as an open tool for the Arabic research community.',
      ],
    },
    stack: ['MCP', 'TypeScript', 'Node.js'],
  },
  {
    id: 'paper-search',
    group: 'ai',
    title: { ar: 'خادم MCP للبحث في الأوراق العلمية', en: 'Paper Search MCP Server' },
    hook: {
      ar: '18 مصدرًا أكاديميًا في استعلام واحد، دون أي مفتاح API.',
      en: '18 academic sources in a single query, no API key needed.',
    },
    links: [{ label: 'github.com/EngDawood/paper-search-mcp-server', href: 'https://github.com/EngDawood/paper-search-mcp-server' }],
    bullets: {
      ar: [
        'خادم MCP على Cloudflare Workers يبحث في 18 مصدرًا أكاديميًا دون مفتاح API (منها arXiv وPubMed وCrossref وDBLP وOpenReview)، مع 6 مصادر إضافية اختيارية بمفاتيح.',
        'بحث متوازٍ في عدة مصادر مع حذف المكررات حسب DOI ومعرّف arXiv والعنوان، واستخراج النص الكامل من ملفات PDF، و23 أداة دون مفاتيح تصل إلى 34 بالمفاتيح.',
      ],
      en: [
        'MCP server on Cloudflare Workers that searches 18 academic sources with no API key (arXiv, PubMed, Crossref, DBLP, OpenReview and more), plus 6 optional keyed sources.',
        'Parallel multi-source search de-duplicated by DOI, arXiv id and title; full-text PDF extraction; 23 tools without keys, up to 34 with keys.',
      ],
    },
    stack: ['MCP', 'Cloudflare Workers', 'TypeScript'],
  },
  {
    id: 'storyset',
    group: 'ai',
    title: { ar: 'خادم Storyset MCP', en: 'Storyset MCP Server' },
    hook: {
      ar: 'رسومات توضيحية يبحث عنها الذكاء الاصطناعي ويعيد تلوينها، مجانًا للجميع.',
      en: 'Illustrations an AI agent can search and recolor. Free for everyone.',
    },
    links: [
      { label: 'github.com/EngDawood/MCP-STORYSET', href: 'https://github.com/EngDawood/MCP-STORYSET' },
      { label: 'storyset-mcp.engdawood.com/mcp', href: 'https://storyset-mcp.engdawood.com/mcp' },
    ],
    bullets: {
      ar: [
        'خادم MCP بعيد (Cloudflare Agents SDK وDurable Objects) للبحث في رسومات storyset.com وتنزيلها وإعادة تلوينها، مع نسخة عامة مجانية دون تسجيل.',
        'يعيد روابط قابلة للتنزيل بدل محتوى الملفات الخام للحفاظ على سياق النموذج صغيرًا.',
      ],
      en: [
        'Remote MCP server (Cloudflare Agents SDK, Durable Objects) to search, download and recolor storyset.com illustrations; free public instance with no signup.',
        'Returns fetchable URLs instead of raw file bytes to keep model context small.',
      ],
    },
    stack: ['MCP', 'Agents SDK', 'Durable Objects'],
  },
  {
    id: 'mistral-ocr',
    group: 'ai',
    title: { ar: 'خادم Mistral OCR وأداة سطر الأوامر', en: 'Mistral OCR MCP Server & CLI' },
    hook: {
      ar: 'من ملف PDF أو صورة أو تسجيل صوتي إلى نص نظيف، عبر npm.',
      en: 'PDF, image or audio in. Clean text out. One npx away.',
    },
    links: [
      { label: 'github.com/EngDawood/mcp-mistral-ocr', href: 'https://github.com/EngDawood/mcp-mistral-ocr' },
      { label: 'npm: mcp-mistral-ocr', href: 'https://www.npmjs.com/package/mcp-mistral-ocr' },
    ],
    bullets: {
      ar: [
        'خادم MCP وأداة سطر أوامر منشوران على npm للتعرّف الضوئي على النصوص وتفريغ الصوت عبر Mistral AI API، ويدعمان ملفات PDF ومستندات Office والصور والصوت.',
        '6 أدوات منها استخراج البيانات المهيكلة وفق مخطط JSON واستخراج الجداول، مع المعالجة الدفعية ودعم العربية.',
      ],
      en: [
        'MCP server and CLI published on npm for OCR and audio transcription with the Mistral AI API, covering PDF, Office documents, images and audio.',
        '6 tools including JSON-schema structured extraction and table extraction; batch processing and Arabic support.',
      ],
    },
    stack: ['MCP', 'Mistral AI', 'npm'],
  },
  {
    id: 'yemen-jobs',
    group: 'bots',
    title: { ar: 'بوت وظائف اليمن · ‎@hr_yemen', en: 'Yemen Jobs Bot · @hr_yemen' },
    hook: {
      ar: `قناة وظائف يتابعها ${live.subscribers.toLocaleString('en-US')} شخص، تُدار بالكامل من Cloudflare Worker.`,
      en: `A jobs channel followed by ${live.subscribers.toLocaleString('en-US')} people, run entirely by a Cloudflare Worker.`,
    },
    links: [
      { label: 't.me/hr_yemen', href: 'https://t.me/hr_yemen' },
      { label: 't.me/Yemenhrbot', href: 'https://t.me/Yemenhrbot' },
    ],
    bullets: {
      ar: [
        'خدمة على Cloudflare Workers تجمع إعلانات الوظائف في اليمن من 6 مصادر (منها ReliefWeb وYemen HR وEOI Yemen) وتترجمها إلى العربية عبر Workers AI.',
        `تنشر تلقائيًا في قناة ‎@hr_yemen على تيليجرام التي تضم أكثر من ${live.subscribersPlus.replace('+', '')} مشترك، مع تحكّم إداري عبر بوت ‎@Yemenhrbot يتضمّن 13 أمرًا.`,
        'نظام مصادر قائم على الإضافات (RSS / Scraper / API)، وكشف المكررات عبر KV، وأرشفة في D1 عبر 4 جداول، وواجهة REST API من 12 مسارًا، وملخّص يومي، ونشر تلقائي عند كل push.',
      ],
      en: [
        'Cloudflare Worker that collects Yemen job listings from 6 sources (ReliefWeb, Yemen HR, EOI Yemen and more) and translates them to Arabic with Workers AI.',
        `Auto-posts to the @hr_yemen Telegram channel, which has ${live.subscribersPlus} subscribers; admin controls via @Yemenhrbot with 13 commands.`,
        'Plugin-based sources (RSS / scraper / API), KV duplicate detection, D1 archive across 4 tables, REST API with 12 endpoints, daily digest and deploy-on-push.',
      ],
    },
    stack: ['Cloudflare Workers', 'Workers AI', 'D1', 'KV', 'Telegram'],
  },
  {
    id: 'video-caption',
    group: 'bots',
    title: { ar: 'بوت ترجمة الفيديو', en: 'Video Caption Bot' },
    hook: {
      ar: 'أرسل فيديو بأي لغة، يعود إليك مترجمًا بالعربية داخل الصورة.',
      en: 'Send a video in any language. Get it back with captions burned in.',
    },
    links: [{ label: 'github.com/EngDawood/video-caption', href: 'https://github.com/EngDawood/video-caption' }],
    bullets: {
      ar: [
        'بوت تيليجرام يستقبل فيديو مرفوعًا أو رابطًا من وسائل التواصل، فيفرّغ الكلام ويترجمه ثم يدمج الترجمة داخل الفيديو.',
        'خط معالجة متين على Cloudflare Workflows تُعاد فيه كل مرحلة على حدة عند الفشل، وتشغيل ffmpeg داخل Cloudflare Containers، وإمكانية إعادة المعالجة على أربعة مستويات، وواجهة REST خارجية.',
      ],
      en: [
        'Telegram bot that takes an uploaded video or social link, transcribes the speech, translates it and burns the captions back into the video.',
        'Durable pipeline on Cloudflare Workflows with per-stage retries; ffmpeg runs in Cloudflare Containers; jobs can be re-run at four depths; external REST API.',
      ],
    },
    stack: ['Workflows', 'Containers', 'ffmpeg', 'TypeScript'],
  },
  {
    id: 'download-media',
    group: 'bots',
    title: { ar: 'بوت تيليجرام متعدد المنصّات لتحميل الوسائط', en: 'Multi-Platform Telegram Media Bot' },
    hook: {
      ar: 'عشر منصّات، رابط واحد، وكل ذلك داخل تيليجرام.',
      en: 'Ten platforms, one link, all inside Telegram.',
    },
    links: [
      { label: 't.me/download_media_4bot', href: 'https://t.me/download_media_4bot' },
      { label: 'github.com/EngDawood/download-media', href: 'https://github.com/EngDawood/download-media' },
    ],
    bullets: {
      ar: [
        'يحمّل الوسائط من 10 منصّات (TikTok وInstagram وX وYouTube وFacebook وThreads وSoundCloud وSpotify وPinterest وGitHub)، ومتاح على ‎@download_media_4bot.',
        'مبني بـ Hono وgrammY وCloudflare Workers، ويتوفر المحمّل نفسه كواجهة REST API وخادم MCP، بواجهة عربية وإنجليزية، مع تكامل مستمر عبر CodeQL وrelease-please.',
      ],
      en: [
        'Downloads media from 10 platforms (TikTok, Instagram, X, YouTube, Facebook, Threads, SoundCloud, Spotify, Pinterest, GitHub); live at @download_media_4bot.',
        'Built with Hono, grammY and Cloudflare Workers; the same downloader is exposed as a REST API and an MCP server; Arabic/English UI; CI with CodeQL and release-please.',
      ],
    },
    stack: ['Hono', 'grammY', 'Cloudflare Workers', 'MCP'],
  },
  {
    id: 'rss-bridge',
    group: 'bots',
    title: { ar: 'بوت RSS Bridge', en: 'RSS Bridge Bot' },
    hook: {
      ar: 'من Instagram وTikTok وأي خلاصة RSS إلى قنوات تيليجرام، مع ملخّص عربي.',
      en: 'Instagram, TikTok and any RSS feed into Telegram channels, summarized in Arabic.',
    },
    links: [{ label: 'github.com/EngDawood/rss-cloudflare', href: 'https://github.com/EngDawood/rss-cloudflare' }],
    bullets: {
      ar: [
        'خدمة على Cloudflare Workers تحوّل محتوى Instagram وTikTok وأي خلاصة RSS/Atom إلى منشورات في قنوات تيليجرام، مع ملخّصات عربية بالذكاء الاصطناعي.',
        'لوحة تحكم بـ React وTailwind تُقدَّم من الخدمة نفسها، مع D1 وKV وQueues، وخادم MCP على Durable Object.',
      ],
      en: [
        'Cloudflare Worker that turns Instagram, TikTok and any RSS/Atom feed into Telegram channel posts, with AI-generated Arabic summaries.',
        'React + Tailwind admin dashboard served from the Worker; D1, KV and Queues; MCP server on a Durable Object.',
      ],
    },
    stack: ['React', 'Tailwind', 'D1', 'Queues', 'MCP'],
  },
  {
    id: 'tamkeen',
    group: 'web',
    client: true,
    title: { ar: 'موقع معهد تمكين التقني', en: 'Tamkeen Institute of Technology Website' },
    hook: {
      ar: 'الموقع الرسمي لمعهد تقني سعودي: عربي أولًا، سريع، وبلا JavaScript.',
      en: 'The official site of a Saudi technical institute. Arabic-first, fast, zero JavaScript.',
    },
    links: [{ label: 'tit-edu-sa.vercel.app', href: 'https://tit-edu-sa.vercel.app/contact/' }],
    bullets: {
      ar: [
        'الموقع الرسمي لمعهد تقني في سكاكا بالمملكة العربية السعودية: 9 صفحات بالعربية (اللغة الأساسية، من اليمين لليسار) والإنجليزية، مبني على دليل الهوية ومحتوى العميل.',
        'موقع Astro ثابت دون أي حزمة JavaScript وبصور WebP محسّنة، مع ترميز schema.org للأسئلة الشائعة، وخريطة موقع، وفهرس llms.txt بنسخة Markdown لكل صفحة.',
      ],
      en: [
        "Official website for a technical institute in Sakaka, Saudi Arabia: 9 pages in Arabic (RTL, primary) and English, built from the client's brand guide and content brief.",
        'Static Astro build with no JavaScript bundle and optimized WebP images; schema.org FAQ markup, sitemap, and an llms.txt index with a Markdown version of every page.',
      ],
    },
    stack: ['Astro', 'RTL i18n', 'Schema.org', 'llms.txt'],
  },
  {
    id: 'emdash-portfolio',
    group: 'web',
    title: { ar: 'موقع شخصي ثنائي اللغة على EmDash CMS', en: 'Bilingual Portfolio on EmDash CMS' },
    hook: {
      ar: 'موقع يديره وكلاء الذكاء الاصطناعي عبر 46 أداة MCP.',
      en: 'A website AI agents can manage through 46 MCP tools.',
    },
    links: [
      { label: 'engdawood.com', href: 'https://engdawood.com' },
      { label: 'github.com/EngDawood/modern-emdash-cms', href: 'https://github.com/EngDawood/modern-emdash-cms' },
    ],
    bullets: {
      ar: [
        'موقع Astro SSR على Cloudflare Workers باللغتين العربية (افتراضية، من اليمين لليسار) والإنجليزية، مع المحتوى في D1 والوسائط في R2.',
        'نقطة MCP مدمجة توفّر 46 أداة ليدير وكلاء الذكاء الاصطناعي محتوى الموقع، وإضافات CMS معزولة منها مجمّع RSS مع ترجمة بالذكاء الاصطناعي.',
      ],
      en: [
        'Astro SSR portfolio on Cloudflare Workers with Arabic (RTL, default) and English (LTR) i18n, content in D1 and media in R2.',
        'Built-in MCP endpoint exposing 46 tools so AI agents can manage site content; sandboxed CMS plugins including an RSS aggregator with AI translation.',
      ],
    },
    stack: ['Astro', 'React', 'D1', 'R2', 'MCP'],
  },
  {
    id: 'yemen-map',
    group: 'web',
    title: { ar: 'خريطة اليمن · خريطة الغربة', en: 'Yemen Map · The Ghurba Map' },
    hook: {
      ar: 'خط لكل مغترب، من مديريته في اليمن إلى مدينته في العالم.',
      en: 'One line per Yemeni abroad, from a home district to a city in the world.',
    },
    links: [
      { label: 'yemen-map.dawod.workers.dev', href: 'https://yemen-map.dawod.workers.dev' },
      { label: 'github.com/EngDawood/yemen-map', href: 'https://github.com/EngDawood/yemen-map' },
    ],
    bullets: {
      ar: [
        'كرة أرضية تفاعلية عربية أولًا (MapLibre GL وVite) يرسم فيها اليمني المغترب خطًا من مديريته إلى المدينة التي يعيش فيها.',
        'تبديل بين العربية والإنجليزية، وبحث ثنائي اللغة في المحافظات والمديريات ونحو 900 مدينة، وتصميم للجوال، ودعم لتقليل الحركة، مع خدمة Workers وقاعدة D1.',
      ],
      en: [
        'Arabic-first interactive globe (MapLibre GL, Vite) where Yemenis abroad draw a line from their home district to the city they live in.',
        'Arabic/English toggle, bilingual search across governorates, districts and ~900 cities, mobile bottom-sheet layout, reduced-motion support; Worker + D1 backend.',
      ],
    },
    stack: ['MapLibre GL', 'Vite', 'Workers', 'D1'],
  },
  {
    id: 'thmanyah',
    group: 'web',
    title: { ar: 'خط ثمانية للويب', en: 'Thmanyah Font for the Web' },
    hook: {
      ar: 'الخط الذي تقرأ به هذه الصفحة الآن، في سطر CSS واحد.',
      en: 'The typeface you are reading right now, in one line of CSS.',
    },
    links: [{ label: 'npm: @dawod/thmanyah-font-web', href: 'https://www.npmjs.com/package/@dawod/thmanyah-font-web' }],
    bullets: {
      ar: [
        'حزمة مجتمعية على npm وCDN لعائلة خطوط ثمانية العربية: 3 عائلات بخمسة أوزان لكل منها، بملف CSS جاهز.',
        `أكثر من ${live.npmMonthlyPlus.replace('+', '')} تنزيل على npm خلال الشهر الأخير.`,
      ],
      en: [
        'Community npm and CDN package for the Thmanyah Arabic font family: 3 families, 5 weights each, drop-in CSS.',
        `${live.npmMonthlyPlus} npm downloads in the last month.`,
      ],
    },
    stack: ['CSS', 'Typography', 'npm', 'CDN'],
  },
];

export type Job = { role: T; org: T; meta: T; bullets: TL };

export const experience: Job[] = [
  {
    role: { ar: 'مهندس برمجيات', en: 'Software Engineer' },
    org: { ar: 'عمل حر', en: 'Self-Employed' },
    meta: { ar: 'عن بُعد · أبريل 2023 - حتى الآن', en: 'Remote · April 2023 - Present' },
    bullets: {
      ar: [
        'نشرت 4 خوادم MCP مفتوحة المصدر (البحث الأكاديمي العربي، البحث في الأوراق العلمية، Storyset، Mistral OCR) تمنح وكلاء الذكاء الاصطناعي وصولًا إلى أكثر من 4 ملايين سجل بحثي عربي و18 مصدرًا أكاديميًا والرسومات والتعرّف الضوئي على المستندات.',
        `بنيت بوت وظائف اليمن على Cloudflare Workers لجمع الوظائف من 6 مصادر مع ترجمة عربية بالذكاء الاصطناعي، ونمت قناة ‎@hr_yemen إلى أكثر من ${live.subscribersPlus.replace('+', '')} مشترك.`,
        'بنيت بوتات تيليجرام على Cloudflare Workers: محمّل وسائط من 10 منصّات، وخط معالجة لترجمة الفيديو (Workflows وContainers وffmpeg)، وبوت RSS مع لوحة تحكم بـ React.',
        'بنيت واجهات أمامية ثنائية اللغة (عربية وإنجليزية) باستخدام Astro وReact وMapLibre GL، منها الموقع الرسمي لمعهد تقني سعودي، ونشرت حزمة خطوط عربية على npm.',
        'سلّمت مشاريع تطوير ويب متكاملة وأتمتة بايثون وتوثيقًا تقنيًا لعملاء دوليين.',
      ],
      en: [
        'Open-sourced 4 MCP servers (Arabic Scholar, Paper Search, Storyset, Mistral OCR) that give AI agents access to 4M+ Arabic research records, 18 academic sources, illustrations and document OCR.',
        `Built Yemen Jobs Bot, a Cloudflare Worker that collects 6 job sources with AI Arabic translation, growing the @hr_yemen channel to ${live.subscribersPlus} subscribers.`,
        'Built Telegram bots on Cloudflare Workers: a 10-platform media downloader, a video captioning pipeline (Workflows, Containers, ffmpeg) and an RSS bridge with a React admin dashboard.',
        'Built bilingual Arabic/English (RTL) front-ends with Astro, React and MapLibre GL, including the official website of a Saudi technical institute; published an Arabic font package on npm.',
        'Delivered full-stack development, Python automation and technical documentation projects for international clients.',
      ],
    },
  },
  {
    role: { ar: 'معيد جامعي', en: 'Teaching Assistant' },
    org: { ar: 'جامعة حجة', en: 'Hajjah University' },
    meta: { ar: 'حجة، اليمن · أكتوبر 2022 - أبريل 2023', en: 'Hajjah, Yemen · October 2022 - April 2023' },
    bullets: {
      ar: [
        'درّست مادة البرمجة الكائنية (Java) لأكثر من 60 طالبًا في المستويين الثاني والثالث.',
        'صمّمت جلسات معملية تطبيقية تحوّل المفاهيم البرمجية إلى تمارين عملية.',
        'قيّمت مشاريع الطلاب وراجعت أكوادهم مراجعةً تقنية.',
        'أرشدت الطلاب فرديًا في تصحيح الأخطاء وتصميم البرمجيات وتسليم المشاريع الأكاديمية.',
      ],
      en: [
        'Taught Object-Oriented Programming (Java) to 60+ undergraduate students (2nd and 3rd year).',
        'Designed and led practical lab sessions, turning programming concepts into hands-on exercises.',
        'Evaluated student projects and gave technical code reviews.',
        'Mentored students one-on-one on debugging, software design and academic project delivery.',
      ],
    },
  },
  {
    role: { ar: 'باحث أكاديمي ومصمم عروض تقديمية', en: 'Academic Research Writer & Presentation Designer' },
    org: { ar: 'عمل حر', en: 'Freelance' },
    meta: { ar: 'Upwork وFiverr · عن بُعد · 2020 - حتى الآن', en: 'Upwork, Fiverr · Remote · 2020 - Present' },
    bullets: {
      ar: [
        'كتبت وحرّرت أوراقًا بحثية في تعلم الآلة وتحليل البيانات والأمن السيبراني.',
        'ترجمت الأبحاث الأكاديمية بين العربية والإنجليزية بدقّة تقنية.',
        'نسّقت الوثائق البحثية وفق معايير IEEE وAPA وElsevier باستخدام LaTeX وMicrosoft Word.',
        'صمّمت عروضًا تقديمية لمؤتمرات ومؤسسات أكاديمية (PowerPoint وCanva وPrezi).',
      ],
      en: [
        'Wrote and edited research papers in machine learning, data analysis and cybersecurity.',
        'Translated academic research between Arabic and English with technical accuracy.',
        'Formatted research documents to IEEE, APA and Elsevier standards using LaTeX and Microsoft Word.',
        'Designed presentations for conferences and academic institutions (PowerPoint, Canva, Prezi).',
      ],
    },
  },
  {
    role: { ar: 'مدرّس خاص عبر الإنترنت', en: 'Online Private Tutor' },
    org: { ar: 'طلاب سعوديون ويمنيون', en: 'Saudi & Yemeni Students' },
    meta: { ar: 'عن بُعد · 2020 - حتى الآن', en: 'Remote · 2020 - Present' },
    bullets: {
      ar: [
        'قدّمت دروسًا يومية لمجموعات من 10 إلى 15 طالبًا في علوم الحاسوب والرياضيات والإنجليزية والفيزياء وفق المنهج السعودي.',
        'طوّرت خططًا دراسية وعروضًا ووسائل بصرية مساعدة، مع تقارير أسبوعية لأولياء الأمور.',
        'قدّمت الشرح باللغتين العربية والإنجليزية.',
      ],
      en: [
        'Ran daily online tutoring sessions for groups of 10-15 students in Computer Science, Mathematics, English and Physics, following the Saudi curriculum.',
        'Developed lesson plans, presentations and visual aids, with weekly progress reports to parents.',
        'Taught in both Arabic and English.',
      ],
    },
  },
  {
    role: { ar: 'مساح ميداني', en: 'Field Surveyor' },
    org: { ar: 'Moore Yemen', en: 'Moore Yemen' },
    meta: { ar: 'حجة، اليمن · يوليو 2021 - أغسطس 2021', en: 'Hajjah, Yemen · July 2021 - August 2021' },
    bullets: {
      ar: [
        'نفّذت مسوحات ميدانية وجمع بيانات لمشاريع تدقيق واستشارات.',
        'أجريت زيارات تفقّدية وتوثيقًا للمواقع، وتعاونت مع فرق التدقيق في مشاريع العملاء.',
      ],
      en: [
        'Performed field surveys and data collection for audit and advisory services.',
        'Conducted site inspections and documentation; collaborated with audit teams on client projects.',
      ],
    },
  },
  {
    role: { ar: 'صرّاف حوالات', en: 'Remittance Teller' },
    org: { ar: 'مؤسسة التيسير للصرافة والتحويلات', en: 'Al Tayseer Exchange & Transfer' },
    meta: { ar: 'حجة، اليمن · نوفمبر 2018 - 2019', en: 'Hajjah, Yemen · November 2018 - 2019' },
    bullets: {
      ar: [
        'تعاملت مع صرف العملات والحوالات المالية والعمليات النقدية اليومية.',
        'قدّمت خدمة عملاء في بيئة مالية سريعة الإيقاع.',
      ],
      en: [
        'Handled currency exchange, money transfers and daily cash operations.',
        'Provided customer service in a fast-paced financial environment.',
      ],
    },
  },
];

export const education = [
  {
    title: { ar: 'بكالوريوس علوم تطبيقية، تخصص علوم الحاسوب', en: 'B.Sc. Applied Science, Computer Science' },
    org: { ar: 'جامعة حجة', en: 'Hajjah University' },
    meta: { ar: 'حجة، اليمن · 2016 - 2020', en: 'Hajjah, Yemen · 2016 - 2020' },
    bullets: {
      ar: [
        'تخرّجت بمرتبة الشرف (تقدير ممتاز)، 2019-2020.',
        'التخصصات الفرعية: الذكاء الاصطناعي، تحليل البيانات، الأمن السيبراني.',
        'أهم المقررات: هياكل البيانات والخوارزميات، قواعد البيانات، البرمجة الكائنية، هندسة البرمجيات، تقنيات الويب، نظم التشغيل، شبكات الحاسوب.',
        'مشروع التخرّج: تطبيق مبني على البيانات بقاعدة بيانات علائقية.',
      ],
      en: [
        'Graduated with Honors (Excellent GPA), 2019-2020.',
        'Specializations: Artificial Intelligence, Data Analysis, Cybersecurity.',
        'Key courses: Data Structures & Algorithms, Database Systems, OOP, Software Engineering, Web Technologies, Operating Systems, Computer Networks.',
        'Final year project: data-driven application with a relational database backend.',
      ],
    } as TL,
  },
  {
    title: { ar: 'الشهادة الثانوية العامة', en: 'High School Diploma' },
    org: { ar: 'ثانوية الثورة (بنين)', en: 'Al-Thawra Secondary School (Boys)' },
    meta: { ar: 'حجة، اليمن · 2014 · تقدير ممتاز', en: 'Hajjah, Yemen · 2014 · Excellent GPA' },
    bullets: { ar: [], en: [] } as TL,
  },
];

export const skills: { label: T; items: T }[] = [
  {
    label: { ar: 'الذكاء الاصطناعي والأدوات', en: 'AI & Tooling' },
    items: {
      ar: 'تطوير خوادم MCP (TypeScript SDK وStreamable HTTP وstdio)، وCloudflare Agents SDK، وWorkers AI، وMistral AI API، وClaude Code؛ وبايثون مع Pandas وNumPy وScikit-learn وTensorFlow.',
      en: 'MCP server development (TypeScript SDK, Streamable HTTP, stdio), Cloudflare Agents SDK, Workers AI, Mistral AI API, Claude Code; Python with Pandas, NumPy, Scikit-learn, TensorFlow.',
    },
  },
  {
    label: { ar: 'الواجهات الأمامية', en: 'Frontend' },
    items: {
      ar: 'React وAstro وTypeScript وJavaScript (ES6+) وHTML5 وCSS3 وTailwind CSS وVite وMapLibre GL، وتعدد اللغات مع دعم الاتجاه من اليمين لليسار، والتصميم المتجاوب؛ Next.js (قيد التعلم).',
      en: 'React, Astro, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS, Vite, MapLibre GL, bilingual RTL/LTR i18n, responsive design; Next.js (learning).',
    },
  },
  {
    label: { ar: 'الأنظمة الخلفية والبنية التحتية', en: 'Backend & Infra' },
    items: {
      ar: 'Node.js وHono وgrammY وبايثون، وCloudflare Workers (D1 وKV وR2 وQueues وDurable Objects وWorkflows وContainers)، وتصميم REST API، وWebhooks، وCron، وTelegram Bot API.',
      en: 'Node.js, Hono, grammY, Python, Cloudflare Workers (D1, KV, R2, Queues, Durable Objects, Workflows, Containers), RESTful API design, webhooks, cron, Telegram Bot API.',
    },
  },
  {
    label: { ar: 'قواعد البيانات', en: 'Databases' },
    items: {
      ar: 'SQLite / Cloudflare D1 وMySQL وPostgreSQL، وتحسين استعلامات SQL، وتصميم المخطط، وRedis (أساسيات).',
      en: 'SQLite / Cloudflare D1, MySQL, PostgreSQL, SQL query optimization, schema design, Redis (fundamentals).',
    },
  },
  {
    label: { ar: 'DevOps والأدوات', en: 'DevOps & Tools' },
    items: {
      ar: 'Git وGitHub Actions والتكامل والنشر المستمر والنشر على npm وWrangler وDocker (أساسيات) وLinux CLI؛ LaTeX وMS Office وCanva وPrezi.',
      en: 'Git, GitHub Actions, CI/CD, npm publishing, Wrangler, Docker (fundamentals), Linux CLI; LaTeX, MS Office, Canva, Prezi.',
    },
  },
  {
    label: { ar: 'المعمارية', en: 'Architecture' },
    items: {
      ar: 'Clean Architecture، ومبادئ SOLID، وأنماط التصميم (Repository وFactory وObserver)، وتعدد المستأجرين في SaaS، والميكروسيرفس (دراسة)، واختبار الوحدات.',
      en: 'Clean Architecture, SOLID, design patterns (Repository, Factory, Observer), SaaS multi-tenancy, microservices (study), unit testing.',
    },
  },
];

export const certifications: { year: string; title: T; issuer: T }[] = [
  { year: '2023', title: { ar: 'تصور البيانات باستخدام بايثون', en: 'Data Visualization with Python' }, issuer: { ar: 'Udemy', en: 'Udemy' } },
  { year: '2022', title: { ar: 'شهادة الكتابة الأكاديمية', en: 'Academic Writing Certification' }, issuer: { ar: 'Coursera', en: 'Coursera' } },
  { year: '2021', title: { ar: 'تدريب المدربين (TOT)', en: 'Train the Trainer (TOT)' }, issuer: { ar: 'إدراك × المجلس الدولي للمدربين المعتمدين', en: 'Edraak × International Board of Certified Trainers' } },
  { year: '2021', title: { ar: 'الإعداد المهني', en: 'Career Preparation' }, issuer: { ar: 'إدراك × المجلس الثقافي البريطاني', en: 'Edraak × British Council' } },
  { year: '2021', title: { ar: 'الإنجليزية لبيئة العمل', en: 'English for the Workplace' }, issuer: { ar: 'إدراك × المجلس الثقافي البريطاني', en: 'Edraak × British Council' } },
];

export const languages: { name: T; level: T }[] = [
  { name: { ar: 'العربية', en: 'Arabic' }, level: { ar: 'اللغة الأم', en: 'Native' } },
  { name: { ar: 'الإنجليزية', en: 'English' }, level: { ar: 'متقدّم، C1 (كتابةً ومحادثة)', en: 'Advanced, C1 (Writing & Speaking)' } },
];

export const accomplishments: TL = {
  ar: [
    'نشر 4 خوادم MCP مفتوحة المصدر، منها خادم يتيح لنماذج الذكاء الاصطناعي الوصول إلى أكثر من 4 ملايين سجل أكاديمي عربي، وآخر يبحث في 18 مصدرًا أكاديميًا.',
    `تنمية بوت وظائف اليمن إلى أكثر من ${live.subscribersPlus.replace('+', '')} مشترك على تيليجرام في قناة ‎@hr_yemen مع إعلانات وظائف مترجمة بالذكاء الاصطناعي من 6 مصادر.`,
    `نشر حزمة ‎@dawod/thmanyah-font-web على npm: أكثر من ${live.npmMonthlyPlus.replace('+', '')} تنزيل خلال الشهر الأخير.`,
    'GitHub: أكثر من 100 مستودع تشمل خوادم MCP وبوتات تيليجرام ومشاريع واجهات أمامية.',
  ],
  en: [
    'Open-sourced 4 MCP servers, including one that gives AI models access to 4M+ Arabic academic records and one that searches 18 academic sources.',
    `Grew Yemen Jobs Bot to ${live.subscribersPlus} Telegram subscribers at @hr_yemen with AI-translated job posts from 6 sources.`,
    `Published @dawod/thmanyah-font-web on npm: ${live.npmMonthlyPlus} downloads in the last month.`,
    'GitHub: 100+ repositories across MCP servers, Telegram bots and front-end projects.',
  ],
};

/** UI strings shared across pages. */
export const ui = {
  sections: {
    summary: { ar: 'نبذة', en: 'Summary' },
    projects: { ar: 'مشاريع مختارة', en: 'Selected Projects' },
    experience: { ar: 'الخبرات العملية', en: 'Experience' },
    education: { ar: 'المؤهلات العلمية', en: 'Education' },
    skills: { ar: 'المهارات التقنية', en: 'Technical Skills' },
    certs: { ar: 'الشهادات', en: 'Certifications' },
    languages: { ar: 'اللغات', en: 'Languages' },
    accomplishments: { ar: 'الإنجازات', en: 'Accomplishments' },
  },
  clientTag: { ar: 'مشروع لعميل', en: 'client' },
} satisfies Record<string, unknown>;
