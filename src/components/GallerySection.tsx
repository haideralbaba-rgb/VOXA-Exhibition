import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  COLLAGE_1_IMAGES,
  COLLAGE_2_IMAGES,
  CAROUSEL_IMAGES,
  RESTAURANT_POSTERS,
  reels,
} from "../data";
import { IconClose, IconChevronLeft, IconChevronRight, IconArrow } from "./icons";
import { useModalBack } from "../hooks/useModalBack";

type Category = "all" | "arch" | "beverage" | "photo" | "restaurant";

interface GalleryItem {
  id: string;
  title: string;
  category: Category;
  categoryLabel: string;
  src: string;
  desc?: string;
}

const allItems: GalleryItem[] = [
  // Architectural Photos (Beirut)
  ...COLLAGE_2_IMAGES.map((src, i) => ({
    id: `arch-${i}`,
    title: `بيت بيروت: معمار ٠${i + 1}`,
    category: "arch" as Category,
    categoryLabel: "توثيق معماري",
    src,
    desc: "توثيق فوتوغرافي لتفاصيل وعمارة مبنى بيت بيروت بإضاءة طبيعية.",
  })),

  // Beverage Commercial Designs
  ...COLLAGE_1_IMAGES.map((src, i) => ({
    id: `bev-${i}`,
    title: `تصاميم المشروبات ٠${i + 1}`,
    category: "beverage" as Category,
    categoryLabel: "تصاميم تجارية",
    src,
    desc: "بوستر إعلاني للمشروبات بتكوينات لونية طازجة وإخراج معاصر.",
  })),

  // Curated Photography
  ...CAROUSEL_IMAGES.map((src, i) => ({
    id: `photo-${i}`,
    title: `لقطات فوتوغرافية ٠${i + 1}`,
    category: "photo" as Category,
    categoryLabel: "لقطات فوتوغرافية",
    src,
    desc: "لقطة منتقاة تبرز التباين وتوزيع الضوء وعمق التفاصيل البصرية.",
  })),

  // Restaurant Posters
  ...RESTAURANT_POSTERS.map((src, i) => ({
    id: `rest-${i}`,
    title: `بوستر مطاعم ٠${i + 1}`,
    category: "restaurant" as Category,
    categoryLabel: "بوسترات المطاعم",
    src,
    desc: "سلسلة بوسترات إعلانية وتجارية للمطاعم تجمع بين جاذبية الأطباق والخطوط الواضحة.",
  })),
];

const tabs: { id: Category; label: string }[] = [
  { id: "all", label: "كل المعارض" },
  { id: "arch", label: "توثيق معماري" },
  { id: "beverage", label: "تصاميم المشروبات" },
  { id: "photo", label: "لقطات فوتوغرافية" },
  { id: "restaurant", label: "بوسترات المطاعم" },
];

export default function GallerySection() {
  const [activeTab, setActiveTab] = useState<Category>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    activeTab === "all" ? allItems : allItems.filter((item) => item.category === activeTab);

  useModalBack(selectedIndex !== null, () => setSelectedIndex(null));

  const currentItem = selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const nextImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex + 1) % filteredItems.length);
  };

  const prevImage = () => {
    if (selectedIndex === null) return;
    setSelectedIndex((selectedIndex - 1 + filteredItems.length) % filteredItems.length);
  };

  return (
    <section id="gallery" className="relative py-24 md:py-36 bg-[#000000] text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Section Header */}
        <div className="mb-12 md:mb-16 text-center">
          <div className="apple-badge mb-4 mx-auto">
            <span className="text-[#2997ff]">✦</span>
            <span>المعارض المتخصصة</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            استكشف المعارض.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base text-[#86868b]">
            تصفح مجموعات الصور المعمارية، بوسترات المطاعم، وتصاميم الهويات التجارية المصنفة بعناية.
          </p>

          {/* Apple Segmented Control Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-xs md:text-sm font-medium transition-all ${
                    isActive
                      ? "bg-white text-black shadow-sm"
                      : "bg-[#161617] text-[#86868b] border border-white/[0.08] hover:text-white hover:bg-[#1c1c1e]"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => setSelectedIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[24px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                  <div className="absolute top-4 start-4">
                    <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base font-bold text-white group-hover:text-[#2997ff] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-xs text-[#86868b] group-hover:text-white transition-colors">
                    معاينة ↗
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Apple Lightbox Modal */}
      <AnimatePresence>
        {currentItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8 backdrop-blur-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[92vh] max-w-4xl w-full flex flex-col overflow-hidden rounded-[28px] border border-white/15 bg-[#161617]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] p-4 px-6 bg-[#161617]">
                <div className="flex items-center gap-3">
                  <span className="apple-badge text-xs">{currentItem.categoryLabel}</span>
                  <span className="font-display text-sm font-semibold text-white">
                    {currentItem.title}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#86868b]">
                    {(selectedIndex! + 1)} من {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors ms-2"
                  >
                    <IconClose className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[480px] bg-black flex items-center justify-center p-4">
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl shadow-2xl"
                />

                {/* Left/Right navigation buttons */}
                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute start-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
                      aria-label="السابق"
                    >
                      <IconChevronRight className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute end-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all"
                      aria-label="التالي"
                    >
                      <IconChevronLeft className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Footer */}
              {currentItem.desc && (
                <div className="p-4 px-6 bg-[#121214] border-t border-white/[0.06] text-center">
                  <p className="text-xs sm:text-sm text-[#86868b]">{currentItem.desc}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
