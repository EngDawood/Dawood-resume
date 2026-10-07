import type { T } from './resume';

// Copy for the personal (interactive) site. Kept short on purpose: the resume carries the detail.
export const p = {
  title: { ar: 'داود صالح · نوافذ من ضوء', en: 'Dawood Saleh · Windows of light' } as T,
  description: {
    ar: 'داود صالح، مهندس برمجيات من صنعاء: خوادم MCP وأدوات ذكاء اصطناعي وواجهات عربية. كل نافذة هنا مشروع بنيته.',
    en: "Dawood Saleh, a software engineer from Sana'a: MCP servers, AI tooling and Arabic interfaces. Every window here is something I built.",
  } as T,
  nav: {
    work: { ar: 'الأعمال', en: 'Work' },
    path: { ar: 'المسيرة', en: 'Path' },
    contact: { ar: 'تواصل', en: 'Contact' },
    cv: { ar: 'السيرة الذاتية', en: 'Resume' },
    other: { ar: 'English', en: 'العربية' },
    day: { ar: 'النهار', en: 'Day' },
    night: { ar: 'الليل', en: 'Night' },
  },
  hero: {
    kicker: { ar: 'مهندس برمجيات من صنعاء', en: "Software engineer from Sana'a" },
    line: {
      ar: 'أبني خوادم MCP تمنح الذكاء الاصطناعي بيانات حقيقية، وواجهات عربية تُقرأ من اليمين.',
      en: 'I build MCP servers that give AI real data, and Arabic interfaces that read right to left.',
    },
    cta: { ar: 'شاهد الأعمال', en: 'See the work' },
    caption: {
      ar: 'في الحلقة الخارجية لهذه القمرية اثنتا عشرة زجاجة، كل واحدة مشروع بنيته. حرّك الضوء والمسها.',
      en: 'The outer ring of this window holds twelve panes of glass, one for each thing I built. Move the light, then touch one.',
    },
    windowLabel: { ar: 'قمرية تفاعلية: كل زجاجة في الحلقة الخارجية مشروع', en: 'Interactive stained-glass window: each outer pane is a project' },
  },
  numbers: {
    live: { ar: 'أرقام حيّة، تُحدَّث تلقائيًا', en: 'Live numbers, updated automatically' },
    subscribers: { ar: 'مشترك في قناة الوظائف ‎@hr_yemen', en: 'subscribers to the @hr_yemen jobs channel' },
    npm: { ar: 'تنزيل لخط ثمانية على npm خلال آخر 30 يومًا', en: 'npm downloads of the Thmanyah font package in the last 30 days' },
    mcp: { ar: 'خوادم MCP مفتوحة المصدر', en: 'open-source MCP servers' },
    sources: { ar: 'مصدرًا أكاديميًا في استعلام واحد', en: 'academic sources in a single query' },
  },
  statement: {
    ar: 'العربية تستحق أدوات بمستوى أي لغة أخرى. لذلك أبني خوادم تضع الأبحاث والوظائف والمحتوى العربي في متناول الذكاء الاصطناعي، وواجهات تُقرأ من اليمين كما ينبغي لها.',
    en: 'Arabic deserves tools as good as any other language. So I build servers that put Arabic research, jobs and content within reach of AI, and interfaces that read right to left the way they should.',
  } as T,
  work: {
    title: { ar: 'اثنتا عشرة نافذة', en: 'Twelve windows' },
    sub: { ar: 'مرّر فوق أي نافذة لتضيئها، واضغط لترى ما خلفها.', en: 'Hover a window to light it. Open it to see what is behind.' },
    filters: {
      all: { ar: 'الكل', en: 'All' },
      ai: { ar: 'للذكاء الاصطناعي', en: 'For AI agents' },
      bots: { ar: 'بوتات على الحافة', en: 'Bots on the edge' },
      web: { ar: 'واجهات عربية', en: 'Arabic interfaces' },
    },
    open: { ar: 'افتح', en: 'Open' },
    close: { ar: 'إغلاق', en: 'Close' },
    client: { ar: 'مشروع لعميل', en: 'Client project' },
  },
  path: {
    title: { ar: 'المسيرة', en: 'The path' },
    now: { ar: 'الآن', en: 'Now' },
    education: { ar: 'بكالوريوس علوم الحاسوب بمرتبة الشرف، جامعة حجة', en: 'B.Sc. Computer Science with Honors, Hajjah University' },
  },
  stack: { title: { ar: 'الأدوات التي أعمل بها', en: 'What I build with' } },
  contact: {
    title: { ar: 'لنبنِ شيئًا يعمل.', en: "Let's build something that works." },
    sub: {
      ar: 'متاح للعمل عن بُعد أو الانتقال، للعقود والوظائف الدائمة ومشاريع أدوات الذكاء الاصطناعي.',
      en: 'Open to remote work or relocation: contracts, full-time roles and AI-tooling projects.',
    },
    email: { ar: 'راسلني', en: 'Email me' },
    copy: { ar: 'انسخ البريد', en: 'Copy email' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    cvAr: { ar: 'السيرة بالعربية', en: 'Resume in Arabic' },
    cvEn: { ar: 'السيرة بالإنجليزية', en: 'Resume in English' },
  },
  footer: {
    made: {
      ar: 'صُمّم وبُني بخط ثمانية على Astro. الأرقام تُحدَّث كل يوم.',
      en: 'Designed and built with the Thmanyah typeface on Astro. Numbers refresh daily.',
    },
    source: { ar: 'الشيفرة المصدرية', en: 'Source code' },
  },
};

/** Tools shown in the marquee. */
export const stack = [
  'TypeScript', 'MCP', 'Cloudflare Workers', 'Astro', 'React', 'Hono', 'Durable Objects', 'D1', 'Workers AI',
  'Python', 'grammY', 'MapLibre GL', 'Tailwind CSS', 'Vite', 'Node.js', 'Workflows', 'R2', 'ffmpeg',
];
