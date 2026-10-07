import type { T } from './resume';

// Copy for the personal (interactive) site. Kept short on purpose: the resume carries the detail.
export const p = {
  title: { ar: 'داوود صالح أحمد هرمس | مهندس برمجيات', en: 'Dawood Saleh | Software Engineer' } as T,
  description: {
    ar: 'داوود صالح أحمد هرمس، مهندس برمجيات من صنعاء، يطوّر خوادم MCP وأدوات للذكاء الاصطناعي ومواقع ويب تدعم العربية.',
    en: "Dawood Saleh, a software engineer from Sana'a who builds MCP servers, AI tools and websites with proper Arabic support.",
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
    caption: {
      ar: 'كل قطعة زجاج في الصف الخارجي تمثّل مشروعًا. مرّر المؤشر فوقها لترى اسمه، واضغط لعرض التفاصيل.',
      en: 'Each piece of glass in the outer row is a project. Hover to see its name, click for details.',
    },
    windowLabel: { ar: 'قمرية تفاعلية: كل قطعة زجاج في الصف الخارجي مشروع', en: 'Interactive stained-glass window: each outer pane is a project' },
  },
  numbers: {
    live: { ar: 'أرقام تُحدَّث تلقائيًا', en: 'Updated automatically' },
    subscribers: { ar: 'مشترك في قناة الوظائف ‎@hr_yemen', en: 'subscribers to the @hr_yemen jobs channel' },
    npm: { ar: 'تنزيل لحزمة خط ثمانية على npm خلال آخر 30 يومًا', en: 'npm downloads of the Thmanyah font package in the last 30 days' },
    mcp: { ar: 'خوادم MCP مفتوحة المصدر', en: 'open-source MCP servers' },
    sources: { ar: 'مصدرًا أكاديميًا يمكن البحث فيها دفعة واحدة', en: 'academic sources searchable in one go' },
  },
  statement: {
    ar: 'أغلب أدوات الذكاء الاصطناعي لا تخدم العربية جيدًا. لهذا أبني أدوات تتيح لها الوصول إلى الأبحاث والوظائف والمحتوى العربي، ومواقع تدعم العربية كما يجب.',
    en: "Most AI tools don't serve Arabic well. So I build tools that give them access to Arabic research, jobs and content, and websites that support Arabic properly.",
  } as T,
  work: {
    title: { ar: 'مشاريع مختارة', en: 'Selected projects' },
    sub: { ar: 'اضغط على أي مشروع لعرض تفاصيله وروابطه.', en: 'Click any project for details and links.' },
    filters: {
      all: { ar: 'الكل', en: 'All' },
      ai: { ar: 'أدوات ذكاء اصطناعي', en: 'AI tools' },
      bots: { ar: 'بوتات تيليجرام', en: 'Telegram bots' },
      web: { ar: 'مواقع وواجهات', en: 'Websites' },
    },
    open: { ar: 'افتح', en: 'Open' },
    close: { ar: 'إغلاق', en: 'Close' },
    client: { ar: 'مشروع لعميل', en: 'Client project' },
  },
  path: {
    title: { ar: 'الخبرات', en: 'Experience' },
    now: { ar: 'الآن', en: 'Now' },
    education: { ar: 'بكالوريوس علوم الحاسوب بمرتبة الشرف، جامعة حجة', en: 'B.Sc. Computer Science with Honors, Hajjah University' },
  },
  stack: { title: { ar: 'التقنيات التي أستخدمها', en: 'Technologies I use' } },
  contact: {
    title: { ar: 'لنعمل معًا.', en: "Let's work together." },
    sub: {
      ar: 'متاح للعمل عن بُعد أو الانتقال، بعقد أو بدوام كامل.',
      en: 'Open to remote work or relocation, on contract or full time.',
    },
    email: { ar: 'راسلني', en: 'Email me' },
    copy: { ar: 'نسخ البريد', en: 'Copy email' },
    copied: { ar: 'تم النسخ', en: 'Copied' },
    cvAr: { ar: 'السيرة بالعربية', en: 'Resume in Arabic' },
    cvEn: { ar: 'السيرة بالإنجليزية', en: 'Resume in English' },
  },
  footer: {
    made: {
      ar: 'صُمّم بخط ثمانية وبُني باستخدام Astro. تتحدّث الأرقام يوميًا.',
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
