import type { T } from './resume';

// Copy for the personal (interactive) site. Plain language; the resume carries the detail.
export const p = {
  title: { ar: 'داوود صالح أحمد هرمس | مهندس برمجيات', en: 'Dawood Saleh | Software Engineer' } as T,
  description: {
    ar: 'داوود صالح أحمد هرمس، مهندس برمجيات من صنعاء، يطوّر خوادم MCP وأدوات للذكاء الاصطناعي ومواقع ويب تدعم العربية. جرّب خوادمه مباشرة من الصفحة.',
    en: "Dawood Saleh, a software engineer from Sana'a who builds MCP servers, AI tools and websites with proper Arabic support. Try his servers live on the page.",
  } as T,
  nav: {
    work: { ar: 'المشاريع', en: 'Projects' },
    path: { ar: 'الخبرات', en: 'Experience' },
    contact: { ar: 'تواصل معي', en: 'Contact' },
    cv: { ar: 'السيرة الذاتية', en: 'Resume' },
    other: { ar: 'English', en: 'العربية' },
    day: { ar: 'فاتح', en: 'Light' },
    night: { ar: 'داكن', en: 'Dark' },
  },
  hero: {
    kicker: { ar: 'مهندس برمجيات من صنعاء', en: "Software engineer from Sana'a" },
    line: {
      ar: 'أطوّر خوادم MCP تربط الذكاء الاصطناعي بمصادر بيانات حقيقية، وأبني مواقع ويب تدعم العربية.',
      en: 'I build MCP servers that connect AI to real data, and websites with proper Arabic support.',
    },
    cta: { ar: 'تصفّح المشاريع', en: 'View projects' },
  },
  console: {
    title: { ar: 'جرّب خوادمي الآن', en: 'Try my servers live' },
    sub: {
      ar: 'طلبات حقيقية تُرسل من متصفحك إلى خوادم MCP التي بنيتها ونشرتها.',
      en: 'Real requests sent from your browser to MCP servers I built and deployed.',
    },
    tabs: {
      papers: { ar: 'البحث في الأوراق العلمية', en: 'Search papers' },
      storyset: { ar: 'رسومات Storyset', en: 'Storyset illustrations' },
    },
    run: { ar: 'بحث', en: 'Search' },
    queryPapers: { ar: 'موضوع البحث (بالإنجليزية)', en: 'Research topic' },
    queryStory: { ar: 'كلمة للبحث (بالإنجليزية)', en: 'Search word' },
    request: { ar: 'الطلب المُرسل', en: 'Request sent' },
    sources: { ar: 'المصادر وزمن استجابة كل منها', en: 'Sources and response times' },
    results: { ar: 'النتائج', en: 'Results' },
    pick: { ar: 'اختر رسمة، ثم لونًا لإعادة تلوينها عبر الخادم.', en: 'Pick an illustration, then a color to recolor it on the server.' },
    loading: { ar: 'جارٍ الاتصال بالخادم…', en: 'Calling the server…' },
    live: { ar: 'استجابة حيّة من الخادم خلال', en: 'Live response from the server in' },
    sec: { ar: 'ث', en: 's' },
    saved: { ar: 'آخر نتيجة محفوظة، بتاريخ', en: 'Last saved result, from' },
    failed: { ar: 'تعذّر الوصول إلى الخادم الآن، وهذه آخر نتيجة محفوظة.', en: 'Could not reach the server right now. Showing the last saved result.' },
    recolorFailed: { ar: 'تعذّر الوصول إلى الخادم لإعادة التلوين، حاول بعد قليل.', en: 'Could not reach the server to recolor. Try again shortly.' },
    empty: { ar: 'لا نتائج لهذا البحث، جرّب كلمة أخرى.', en: 'No results for this search. Try another word.' },
    source: { ar: 'الكود المصدري', en: 'Source code' },
    swatches: { ar: 'اختر لونًا', en: 'Pick a color' },
  },
  numbers: {
    live: { ar: 'أرقام تُحدَّث تلقائيًا', en: 'Updated automatically' },
    subscribers: { ar: 'مشترك في قناة الوظائف ‎@hr_yemen', en: 'subscribers to the @hr_yemen jobs channel' },
    npm: { ar: 'تنزيل لحزمة خط ثمانية على npm خلال آخر 30 يومًا', en: 'npm downloads of the Thmanyah font package in the last 30 days' },
    mcp: { ar: 'خوادم MCP مفتوحة المصدر', en: 'open-source MCP servers' },
    sources: { ar: 'مصدرًا أكاديميًا يمكن البحث فيها دفعة واحدة', en: 'academic sources searchable in one go' },
  },
  work: {
    title: { ar: 'المشاريع', en: 'Projects' },
    sub: { ar: 'اضغط على أي مشروع لعرض تفاصيله وروابطه.', en: 'Click any project for details and links.' },
    filters: {
      all: { ar: 'الكل', en: 'All' },
      ai: { ar: 'أدوات ذكاء اصطناعي', en: 'AI tools' },
      bots: { ar: 'بوتات تيليجرام', en: 'Telegram bots' },
      web: { ar: 'مواقع وواجهات', en: 'Websites' },
    },
    live: { ar: 'تعمل الآن', en: 'Live' },
    close: { ar: 'إغلاق', en: 'Close' },
    client: { ar: 'مشروع لعميل', en: 'Client project' },
    subscribers: { ar: 'مشترك الآن', en: 'subscribers now' },
  },
  path: {
    title: { ar: 'الخبرات', en: 'Experience' },
    education: { ar: 'بكالوريوس علوم الحاسوب بمرتبة الشرف، جامعة حجة', en: 'B.Sc. Computer Science with Honors, Hajjah University' },
  },
  tech: { title: { ar: 'التقنيات التي أستخدمها', en: 'Technologies I use' } },
  contact: {
    title: { ar: 'لنعمل معًا.', en: "Let's work together." },
    sub: { ar: 'متاح للعمل عن بُعد أو الانتقال، بعقد أو بدوام كامل.', en: 'Open to remote work or relocation, on contract or full time.' },
    email: { ar: 'راسلني', en: 'Email me' },
    copy: { ar: 'نسخ البريد', en: 'Copy email' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    cvAr: { ar: 'السيرة بالعربية', en: 'Resume in Arabic' },
    cvEn: { ar: 'السيرة بالإنجليزية', en: 'Resume in English' },
  },
  footer: {
    made: { ar: 'صُمّم بخط ثمانية وبُني باستخدام Astro. تتحدّث الأرقام يوميًا.', en: 'Set in Thmanyah and built with Astro. Numbers refresh daily.' },
    source: { ar: 'الكود المصدري', en: 'Source code' },
  },
};

/** A one-line, function-style summary of what each project does (shown in mono on its card). */
export const signatures: Record<string, string> = {
  'arabic-scholar': 'search_research(query) → 4M+ Arabic records',
  'paper-search': 'search_papers(query) → 18 sources',
  storyset: 'search(query) · recolor_svg(svg, colors)',
  'mistral-ocr': 'npx mcp-mistral-ocr file.pdf → text',
  'yemen-jobs': '6 sources → translate(ar) → @hr_yemen',
  'video-caption': 'video → transcribe → translate → burn',
  'download-media': '/dl <link> → 10 platforms',
  'rss-bridge': 'rss | instagram | tiktok → telegram',
  tamkeen: 'astro build → 9 pages × (ar, en)',
  'emdash-portfolio': 'GET /mcp → 46 tools',
  'yemen-map': 'district → city · MapLibre GL',
  thmanyah: '@import "@dawod/thmanyah-font-web";',
};

/** Wide cards carry a real visual: live data captured at build time, or a screenshot of the live site. */
export const cardVisual: Record<string, 'papers' | 'storyset' | 'subscribers' | 'shot'> = {
  'paper-search': 'papers',
  storyset: 'storyset',
  'yemen-jobs': 'subscribers',
  tamkeen: 'shot',
  'yemen-map': 'shot',
  thmanyah: 'shot',
};

/** Card order on the page. Wide cards come in pairs so every row of the grid is full. */
export const cardOrder = [
  'paper-search', 'storyset',
  'arabic-scholar', 'mistral-ocr', 'emdash-portfolio',
  'yemen-jobs', 'tamkeen',
  'video-caption', 'download-media', 'rss-bridge',
  'yemen-map', 'thmanyah',
];

export const tech: { label: T; items: string[] }[] = [
  { label: { ar: 'الذكاء الاصطناعي', en: 'AI' }, items: ['MCP', 'MCP TypeScript SDK', 'Cloudflare Agents SDK', 'Workers AI', 'Mistral AI', 'Claude Code'] },
  { label: { ar: 'الواجهات', en: 'Frontend' }, items: ['TypeScript', 'React', 'Astro', 'Tailwind CSS', 'Vite', 'MapLibre GL', 'RTL & i18n'] },
  { label: { ar: 'الخوادم', en: 'Backend' }, items: ['Node.js', 'Hono', 'grammY', 'Cloudflare Workers', 'Durable Objects', 'Workflows', 'Python'] },
  { label: { ar: 'البيانات والنشر', en: 'Data & DevOps' }, items: ['D1 / SQLite', 'KV', 'R2', 'Queues', 'PostgreSQL', 'GitHub Actions', 'npm'] },
];
