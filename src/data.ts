export type Kind = "video" | "photo" | "graphic";

export interface Work {
  id: string;
  kind: Kind;
  title: string;
  meta: string;
  year: string;
  desc: string;
  src: string;
  youtubeId?: string;
  video?: string;
  images?: string[];
  /** span in the "all" view */
  span: string;
  /** span when a filter is active */
  fspan: string;
}

export const px = (id: number, w: number, h: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=${w}&h=${h}`;

export const VIDEO_LENS = "https://videos.pexels.com/video-files/2512876/2512876-hd_1920_1080_30fps.mp4";
export const POSTER_LENS = "https://images.pexels.com/videos/2512876/free-video-2512876.jpg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200";

/* YouTube Shorts & Embeds */
export const YOUTUBE_HERO_ID = "3o3GbsRvlZA";
export const YOUTUBE_HERO_URL = "https://www.youtube.com/shorts/3o3GbsRvlZA";
export const YOUTUBE_HERO_POSTER = "https://img.youtube.com/vi/3o3GbsRvlZA/maxresdefault.jpg";

export const YOUTUBE_SECOND_ID = "l4Z3d8CRPgQ";
export const YOUTUBE_SECOND_URL = "https://www.youtube.com/shorts/l4Z3d8CRPgQ";
export const YOUTUBE_SECOND_POSTER = "https://img.youtube.com/vi/l4Z3d8CRPgQ/maxresdefault.jpg";

/* 8 Carousel Images */
export const CAROUSEL_IMAGES: string[] = [
  "/images/carousel/20261115_114336_0_UTC_0.png",
  "/images/carousel/IMG_20261031_055955.png",
  "/images/carousel/IMG_20261031_060042.png",
  "/images/carousel/IMG_20261031_060125.png",
  "/images/carousel/IMG_20261031_060915.png",
  "/images/carousel/IMG_20261115_142847.png",
  "/images/carousel/Screenshot_2026-11-15-14-07-49-505_com.miui.gallery.jpg",
  "/images/carousel/c61056bf-84b8-490e-8b09-b58d6471a093.png",
];

export const works: Work[] = [
  {
    id: "w1",
    kind: "video",
    title: "ريل العرض الرئيسي",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "إنتاج بصري سينمائي يركز على تكوين الإضاءة والتلوين الحديث بأسلوب جريء وسريع الإيقاع.",
    src: YOUTUBE_HERO_POSTER,
    youtubeId: YOUTUBE_HERO_ID,
    span: "col-span-2 row-span-2",
    fspan: "col-span-2 row-span-2",
  },
  {
    id: "w2",
    kind: "video",
    title: "إيقاع سينمائي",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "لقطات مكثفة وانتقالات مدروسة تمزج بين التفاصيل الدقيقة وحركة الكاميرا لتجسيد فلسفة VOXA البصرية.",
    src: YOUTUBE_SECOND_POSTER,
    youtubeId: YOUTUBE_SECOND_ID,
    span: "col-span-2 row-span-2",
    fspan: "col-span-2 row-span-2",
  },
  {
    id: "w3",
    kind: "photo",
    title: "معرض الصور الفوتوغرافية",
    meta: "كاروسيل فوتوغرافي · ٨ صور مختارة",
    year: "٢٠٢٦",
    desc: "مجموعة فوتوغرافية حصرية تضم ثماني لقطات منتقاة بعناية تبرز جودة الزوايا، التباين، وعمق التفاصيل البصرية.",
    src: CAROUSEL_IMAGES[0],
    images: CAROUSEL_IMAGES,
    span: "col-span-2 md:col-span-4 row-span-2 md:row-span-2",
    fspan: "col-span-2 md:col-span-4 row-span-2 md:row-span-2",
  },
];

export const kindMeta: Record<Kind, { label: string }> = {
  video: { label: "فيديو" },
  photo: { label: "تصوير" },
  graphic: { label: "جرافيك" },
};

export interface Reel {
  id: string;
  title: string;
  views: string;
  src: string;
  youtubeId?: string;
  video?: string;
  tag: string;
}

export const reels: Reel[] = [
  {
    id: "r1",
    title: "ريل العرض الرئيسي",
    views: "١٫٨م",
    src: YOUTUBE_HERO_POSTER,
    youtubeId: YOUTUBE_HERO_ID,
    tag: "ريلز",
  },
  {
    id: "r2",
    title: "إيقاع سينمائي",
    views: "٢٫٤م",
    src: YOUTUBE_SECOND_POSTER,
    youtubeId: YOUTUBE_SECOND_ID,
    tag: "سينما",
  },
  {
    id: "r3",
    title: "كواليس التصوير",
    views: "٩٦٠ألف",
    src: YOUTUBE_HERO_POSTER,
    youtubeId: YOUTUBE_HERO_ID,
    tag: "كواليس",
  },
  {
    id: "r4",
    title: "فن الإضاءة واللقطة",
    views: "١٫١م",
    src: YOUTUBE_SECOND_POSTER,
    youtubeId: YOUTUBE_SECOND_ID,
    tag: "مود",
  },
  {
    id: "r5",
    title: "تكوين سينمائي",
    views: "٣٫٢م",
    src: YOUTUBE_HERO_POSTER,
    youtubeId: YOUTUBE_HERO_ID,
    tag: "وثائقي",
  },
  {
    id: "r6",
    title: "حركة وضياء",
    views: "٧٤٠ألف",
    src: YOUTUBE_SECOND_POSTER,
    youtubeId: YOUTUBE_SECOND_ID,
    tag: "تصوير",
  },
];

export const services = [
  {
    n: "٠١",
    title: "تصوير فوتوغرافي",
    desc: "بورتريه، منتجات، أزياء وشوارع — إضاءة محسوبة وكادر يحكي قبل أن تقرأ أي كلمة.",
    tags: ["بورتريه", "منتجات", "أزياء", "ليلي"],
    icon: "photo" as const,
    img: px(10040315, 600, 800),
  },
  {
    n: "٠٢",
    title: "إنتاج فيديو وريلز",
    desc: "من السيناريو إلى التلوين: مقاطع قصيرة بإيقاع حاد تُبقي المشاهد حتى الثانية الأخيرة.",
    tags: ["ريلز", "إعلانات", "وثائقي", "مونتاج"],
    icon: "video" as const,
    img: px(15079026, 600, 800),
  },
  {
    n: "٠٣",
    title: "هوية بصرية وجرافيك",
    desc: "شعارات وأنظمة بصرية وملصقات بشخصية جريئة وتباين لا يمكن تجاهله.",
    tags: ["شعارات", "ملصقات", "سوشيال", "تغليف"],
    icon: "graphic" as const,
    img: px(29450014, 600, 800),
  },
  {
    n: "٠٤",
    title: "تحريك وموشن",
    desc: "حركة نظيفة وسلسة بمعدل ٦٠ إطارًا: شعارات متحركة، انتقالات، وعناصر تفاعلية.",
    tags: ["موشن", "لوجو", "انتقالات", "٣D"],
    icon: "motion" as const,
    img: px(29097440, 600, 800),
  },
];
