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

/* Restaurant Graphic Design Posters */
export const RESTAURANT_POSTERS: string[] = [
  "/images/restaurants/shawarma.jpg",
  "/images/restaurants/masgouf.jpg",
  "/images/restaurants/quzi.jpg",
  "/images/restaurants/burger.jpg",
  "/images/restaurants/kebab.jpg",
  "/images/restaurants/smash.jpg",
  "/images/restaurants/kahi.jpg",
  "/images/restaurants/pizza.jpg",
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
  {
    id: "w4",
    kind: "graphic",
    title: "بوسترات إعلانية للمطاعم",
    meta: "غرافيك ديزاين · ٨ تصاميم تسويقية",
    year: "٢٠٢٦",
    desc: "سلسلة تصاميم وبوسترات إعلانية تجارية للمطاعم العراقية والعصرية، تجمع بين جاذبية الأطباق والعبارات التسويقية المباشرة بدون أي تعقيد بصري.",
    src: RESTAURANT_POSTERS[0],
    images: RESTAURANT_POSTERS,
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
  desc?: string;
}

export const reels: Reel[] = [
  {
    id: "r1",
    title: "شاورما ع أصولها",
    views: "بوستر إعلاني",
    src: "/images/designs/shawarma_v.jpg",
    tag: "غرافيك",
    desc: "تصميم إعلاني سينمائي عمودي لشاورما اللحم المشوية على الفحم مع تايبوغرافي عربي بوزن تسويقي قوي.",
  },
  {
    id: "r2",
    title: "القرمشة الأصلية",
    views: "سوشيال ميديا",
    src: "/images/designs/burger_v.jpg",
    tag: "براندينغ",
    desc: "بوستر تجاري لدبل سماش برغر بالجبن الذائب وإضاءة نيون داكنة تحفز الرغبة البصرية.",
  },
  {
    id: "r3",
    title: "هيبة المشاوي",
    views: "حملة إعلانية",
    src: "/images/designs/kebab_v.jpg",
    tag: "إعلان تجاري",
    desc: "تكوين فوتوغرافي وغرافيك للمشاوي العراقية على الجمر مع دخان متصاعد وعبارة هيبة المشاوي.",
  },
  {
    id: "r4",
    title: "مزاجك هنا",
    views: "كافيه عصري",
    src: "/images/designs/coffee_v.jpg",
    tag: "غرافيك",
    desc: "تصميم بوستر منعش للقهوة المختصة بالكراميل مع انسكاب الحليب وتناثر حبوب البن المحمصة.",
  },
  {
    id: "r5",
    title: "مسكوف عراقي أصيل",
    views: "تراث وعصرنة",
    src: "/images/designs/masgouf.jpg",
    tag: "بوستر مطعم",
    desc: "تصميم فخم لسمك المسكوف العراقي على حطب الطرفاء مع نار متوهجة وهوية بصرية أصيلة.",
  },
  {
    id: "r6",
    title: "هيبة الضيافة",
    views: "مناسبات وعزائم",
    src: "/images/designs/quzi.jpg",
    tag: "إعلان تجاري",
    desc: "بوستر تسويقي لقوزي اللحم العراقي بالرز المبهر والمكسرات الذهبية بتنسيق إعلاني راقٍ.",
  },
  {
    id: "r7",
    title: "كاهي وكيمر سدّة",
    views: "صباحيات راقية",
    src: "/images/designs/kahi.jpg",
    tag: "غرافيك",
    desc: "تصميم صباحي شهي للكاهي المقرمش والكيمر العراقي العذب مع شيرة القطر الذهبية.",
  },
  {
    id: "r8",
    title: "بيتزا نابولية فاخرة",
    views: "قائمة طعام",
    src: "/images/designs/pizza.jpg",
    tag: "سوشيال ميديا",
    desc: "بوستر إيطالي كلاسيكي لبيتزا نابولية بأطراف منقطة ومكونات طازجة مشوية بالفرن الحجري.",
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
