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
  youtubeUrl?: string;
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

/* YouTube Shorts & Posters (9:16 Vertical Posters) */
export const YOUTUBE_HERO_ID = "3o3GbsRvlZA";
export const YOUTUBE_HERO_URL = "https://www.youtube.com/shorts/3o3GbsRvlZA";
export const YOUTUBE_HERO_POSTER = "/images/videos/video1.jpg";

export const YOUTUBE_SECOND_ID = "vuTNzZfpGCg";
export const YOUTUBE_SECOND_URL = "https://www.youtube.com/shorts/vuTNzZfpGCg";
export const YOUTUBE_SECOND_POSTER = "/images/videos/video2.jpg";

export const YOUTUBE_THIRD_ID = "yFcjGUHXOMo";
export const YOUTUBE_THIRD_URL = "https://www.youtube.com/shorts/yFcjGUHXOMo";
export const YOUTUBE_THIRD_POSTER = "/images/videos/video3.jpg";

export const YOUTUBE_FOURTH_ID = "Dym5iekDNuQ";
export const YOUTUBE_FOURTH_URL = "https://youtube.com/shorts/Dym5iekDNuQ?si=iXT5lddFviP_fdOT";
export const YOUTUBE_FOURTH_POSTER = "/images/videos/video4.jpg";

/* تصاميم المشروبات (3 بوسترات ترويجية) */
export const COLLAGE_1_IMAGES: string[] = [
  "/images/collage1/c1_1.png",
  "/images/collage1/c1_2.png",
  "/images/collage1/c1_3.png",
];

/* بيت بيروت: معمار (6 لقطات فوتوغرافية) */
export const COLLAGE_2_IMAGES: string[] = [
  "/images/collage2/c2_1.jpg",
  "/images/collage2/c2_2.jpg",
  "/images/collage2/c2_3.jpg",
  "/images/collage2/c2_4.jpg",
  "/images/collage2/c2_5.jpg",
  "/images/collage2/c2_6.jpg",
];

/* لقطات فوتوغرافية (4 لقطات منتقاة) */
export const CAROUSEL_IMAGES: string[] = [
  "/images/carousel/c61056bf-84b8-490e-8b09-b58d6471a093.png",
  "/images/carousel/IMG_20261115_142847.png",
  "/images/carousel/20261115_114336_0_UTC_0.png",
  "/images/carousel/IMG_20261031_060915.png",
];

/* بوسترات المطاعم (7 بوسترات تجارية) */
export const RESTAURANT_POSTERS: string[] = [
  "/images/restaurants/burger.jpg",
  "/images/restaurants/pizza.jpg",
  "/images/restaurants/masgouf.jpg",
  "/images/restaurants/kebab.jpg",
  "/images/restaurants/smash.jpg",
  "/images/restaurants/kahi.jpg",
  "/images/restaurants/quzi.jpg",
];

export const works: Work[] = [
  {
    id: "v1",
    kind: "video",
    title: "بيت بيروت I",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "لقطات سينمائية وتوزيع إضاءة سريع الإيقاع في بيت بيروت.",
    src: YOUTUBE_HERO_POSTER,
    youtubeId: YOUTUBE_HERO_ID,
    youtubeUrl: YOUTUBE_HERO_URL,
    span: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
    fspan: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
  },
  {
    id: "v2",
    kind: "video",
    title: "مشاهد سينمائية",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "انتقالات وحركة كاميرا تركز على الزوايا والتفاصيل.",
    src: YOUTUBE_SECOND_POSTER,
    youtubeId: YOUTUBE_SECOND_ID,
    youtubeUrl: YOUTUBE_SECOND_URL,
    span: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
    fspan: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
  },
  {
    id: "v3",
    kind: "video",
    title: "إضاءة وحركة",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "توزيع الظلال وتدرجات الضوء بزوايا تصوير مدروسة.",
    src: YOUTUBE_THIRD_POSTER,
    youtubeId: YOUTUBE_THIRD_ID,
    youtubeUrl: YOUTUBE_THIRD_URL,
    span: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
    fspan: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
  },
  {
    id: "v4",
    kind: "video",
    title: "بيت بيروت II",
    meta: "فيديو قصير · YouTube Shorts",
    year: "٢٠٢٦",
    desc: "استكشاف بصري لتفاصيل ومعالم بيت بيروت التاريخية.",
    src: YOUTUBE_FOURTH_POSTER,
    youtubeId: YOUTUBE_FOURTH_ID,
    youtubeUrl: YOUTUBE_FOURTH_URL,
    span: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
    fspan: "col-span-1 md:col-span-1 row-span-2 md:row-span-2",
  },
  {
    id: "c1",
    kind: "graphic",
    title: "تصاميم المشروبات",
    meta: "بوسترات ترويجية · ٣ تصاميم",
    year: "٢٠٢٦",
    desc: "سلسلة بوسترات إعلانية للمشروبات والقهوة بتكوينات لونية طازجة وإخراج معاصر.",
    src: COLLAGE_1_IMAGES[0],
    images: COLLAGE_1_IMAGES,
    span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
    fspan: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
  },
  {
    id: "c2",
    kind: "photo",
    title: "بيت بيروت: معمار",
    meta: "توثيق فوتوغرافي · ٦ لقطات",
    year: "٢٠٢٦",
    desc: "توثيق بصري لتفاصيل وعمارة مبنى بيت بيروت بإضاءة طبيعية دافئة.",
    src: COLLAGE_2_IMAGES[0],
    images: COLLAGE_2_IMAGES,
    span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
    fspan: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
  },
  {
    id: "w7",
    kind: "photo",
    title: "لقطات فوتوغرافية",
    meta: "سلسلة فوتوغرافية · ٤ لقطات",
    year: "٢٠٢٦",
    desc: "لقطات منتقاة تبرز التباين وتوزيع الضوء وعمق التفاصيل البصرية.",
    src: CAROUSEL_IMAGES[0],
    images: CAROUSEL_IMAGES,
    span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
    fspan: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
  },
  {
    id: "w8",
    kind: "graphic",
    title: "بوسترات المطاعم",
    meta: "تصميم تجاري · ٧ بوسترات",
    year: "٢٠٢٦",
    desc: "سلسلة بوسترات إعلانية وتجارية للمطاعم تجمع بين جاذبية الأطباق والخطوط الواضحة.",
    src: RESTAURANT_POSTERS[0],
    images: RESTAURANT_POSTERS,
    span: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
    fspan: "col-span-2 md:col-span-2 row-span-2 md:row-span-2",
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
  youtubeUrl?: string;
  video?: string;
  tag: string;
  desc?: string;
  aspect?: "9/16" | "1/1";
}

/* تصاميم البوسترات بتناوب انسيابي بين المقاسين العمودي والمربع */
export const reels: Reel[] = [
  {
    id: "r1",
    title: "دبل برغر",
    views: "سوشيال ميديا",
    src: "/images/designs/burger_v.jpg",
    tag: "براندينغ",
    aspect: "9/16",
    desc: "بوستر تجاري لسماش برغر بالجبن وإضاءة نيون هادئة.",
  },
  {
    id: "r2",
    title: "مسكوف عراقي",
    views: "هوية مطاعم",
    src: "/images/designs/masgouf.jpg",
    tag: "بوستر مطعم",
    aspect: "1/1",
    desc: "تصميم لسمك المسكوف العراقي على حطب الطرفاء بنار متوهجة.",
  },
  {
    id: "r4",
    title: "بيتزا نابولية",
    views: "قائمة طعام",
    src: "/images/designs/pizza.jpg",
    tag: "سوشيال ميديا",
    aspect: "1/1",
    desc: "بوستر لبيتزا نابولية بمكونات طازجة مشوية بالفرن الحجري.",
  },
  {
    id: "r5",
    title: "قهوة مثلجة",
    views: "كافيه عصري",
    src: "/images/designs/coffee_v.jpg",
    tag: "غرافيك",
    aspect: "9/16",
    desc: "تصميم بوستر للقهوة المختصة مع انسكاب الحليب وتناثر حبوب البن.",
  },
  {
    id: "r6",
    title: "قوزي عراقي",
    views: "إعلان تجاري",
    src: "/images/designs/quzi.jpg",
    tag: "إعلان تجاري",
    aspect: "1/1",
    desc: "بوستر تسويقي لقوزي اللحم العراقي بالرز المبهر والمكسرات الذهبية.",
  },
  {
    id: "r7",
    title: "مشاوي على الفحم",
    views: "حملة إعلانية",
    src: "/images/designs/kebab_v.jpg",
    tag: "إعلان تجاري",
    aspect: "9/16",
    desc: "تكوين فوتوغرافي وغرافيك للمشاوي العراقية على الجمر مع دخان متصاعد.",
  },
  {
    id: "r8",
    title: "كاهي وكيمر",
    views: "صباحيات",
    src: "/images/designs/kahi.jpg",
    tag: "غرافيك",
    aspect: "1/1",
    desc: "تصميم للكاهي المقرمش والكيمر العراقي مع شيرة القطر الذهبية.",
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
