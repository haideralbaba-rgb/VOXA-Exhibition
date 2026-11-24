import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  COLLAGE_1_IMAGES,
  COLLAGE_2_IMAGES,
  CAROUSEL_IMAGES,
  RESTAURANT_POSTERS,
} from "../data";
import { IconClose, IconChevronLeft, IconChevronRight } from "./icons";
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
  ...COLLAGE_2_IMAGES.map((src, i) => ({
    id: `arch-${i}`,
    title: `بيت بيروت: معمار ٠${i + 1}`,
    category: "arch" as Category,
    categoryLabel: "توثيق معماري",
    src,
    desc: "توثيق فوتوغرافي لتفاصيل وعمارة مبنى بيت بيروت بإضاءة طبيعية.",
  })),

  ...COLLAGE_1_IMAGES.map((src, i) => ({
    id: `bev-${i}`,
    title: `تصاميم المشروبات ٠${i + 1}`,
    category: "beverage" as Category,
    categoryLabel: "تصاميم تجارية",
    src,
    desc: "بوستر إعلاني للمشروبات بتكوينات لونية طازجة وإخراج معاصر.",
  })),

  ...CAROUSEL_IMAGES.map((src, i) => ({
    id: `photo-${i}`,
    title: `لقطات فوتوغرافية ٠${i + 1}`,
    category: "photo" as Category,
    categoryLabel: "لقطات فوتوغرافية",
    src,
    desc: "لقطة منتقاة تبرز التباين وتوزيع الضوء وعمق التفاصيل البصرية.",
  })),

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
    <section id="gallery" className="relative py-16 sm:py-24 md:py-32 bg-[#000000] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Apple Section Header */}
        <div className="mb-8 sm:mb-14 text-center">
          <div className="apple-badge mb-3 sm:mb-4 mx-auto">
            <span className="text-[#2997ff]">✦</span>
            <span>المعارض المتخصصة</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            استكشف المعارض.
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-xl text-xs sm:text-sm md:text-base text-[#86868b] px-2">
            تصفح مجموعات الصور المعمارية، بوسترات المطاعم، وتصاميم الهويات التجارية المصنفة بعناية.
          </p>

          {/* Apple Segmented Control Pills - Scrollable row on mobile */}
          <div className="mt-6 sm:mt-8 flex overflow-x-auto no-scrollbar gap-2 px-4 py-1.5 -mx-4 sm:mx-0 justify-start sm:justify-center">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium transition-all shrink-0 ${
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

        {/* Gallery Grid - 2 columns on mobile, 3 on desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                onClick={() => setSelectedIndex(index)}
                className="group relative cursor-pointer overflow-hidden rounded-[18px] sm:rounded-[24px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.98]"
              >
                <div className="relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-black/40">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent opacity-60 group-hover:opacity-85 transition-opacity" />

                  <div className="absolute top-2.5 start-2.5 sm:top-4 sm:start-4">
                    <span className="apple-badge bg-black/70 backdrop-blur-md text-white border-white/10 text-[10px] sm:text-[11px] !py-0.5 !px-2 sm:!py-1 sm:!px-3">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-3 sm:p-5 flex items-center justify-between">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-xs sm:text-base font-bold text-white group-hover:text-[#2997ff] transition-colors truncate">
                      {item.title}
                    </h3>
                  </div>
                  <span className="text-[11px] sm:text-xs text-[#86868b] shrink-0 ms-2">
                    ↗
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6 backdrop-blur-2xl"
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[94vh] max-w-4xl w-full flex flex-col overflow-hidden rounded-[22px] sm:rounded-[28px] border border-white/15 bg-[#161617]"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] p-3 px-4 sm:p-4 sm:px-6 bg-[#161617] shrink-0">
                <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span className="apple-badge text-[10px] sm:text-xs shrink-0">{currentItem.categoryLabel}</span>
                  <span className="font-display text-xs sm:text-sm font-semibold text-white truncate">
                    {currentItem.title}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] sm:text-xs text-[#86868b]">
                    {(selectedIndex! + 1)} / {filteredItems.length}
                  </span>
                  <button
                    onClick={() => setSelectedIndex(null)}
                    className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors ms-1 sm:ms-2"
                    aria-label="إغلاق"
                  >
                    <IconClose className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </button>
                </div>
              </div>

              {/* Main Image Container */}
              <div className="relative flex-1 min-h-[260px] sm:min-h-[440px] bg-black flex items-center justify-center p-2 sm:p-4 overflow-hidden">
                <img
                  src={currentItem.src}
                  alt={currentItem.title}
                  className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain rounded-lg sm:rounded-xl shadow-2xl"
                />

                {filteredItems.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute start-2 sm:start-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-95"
                      aria-label="السابق"
                    >
                      <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute end-2 sm:end-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-95"
                      aria-label="التالي"
                    >
                      <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Caption Footer */}
              {currentItem.desc && (
                <div className="p-3 px-4 sm:p-4 sm:px-6 bg-[#121214] border-t border-white/[0.06] text-center shrink-0">
                  <p className="text-[11px] sm:text-xs text-[#86868b]">{currentItem.desc}</p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
