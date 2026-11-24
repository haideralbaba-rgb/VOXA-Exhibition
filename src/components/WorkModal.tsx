import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Work } from "../data";
import { IconClose, IconChevronLeft, IconChevronRight, IconYoutube } from "./icons";
import { useModalBack } from "../hooks/useModalBack";

export default function WorkModal({
  work,
  onClose,
}: {
  work: Work | null;
  onClose: () => void;
}) {
  const [slide, setSlide] = useState(0);

  useModalBack(Boolean(work), onClose);

  if (!work) return null;

  const images = work.images || [work.src];
  const hasMultiple = images.length > 1;

  const nextSlide = () => setSlide((s) => (s + 1) % images.length);
  const prevSlide = () => setSlide((s) => (s - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-2 sm:p-6 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-h-[94vh] max-w-4xl w-full flex flex-col overflow-hidden rounded-[22px] sm:rounded-[32px] border border-white/15 bg-[#161617] shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/[0.08] p-3 px-4 sm:p-4 sm:px-6 bg-[#161617] shrink-0">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <span className="apple-badge text-[10px] sm:text-xs shrink-0">{work.meta}</span>
              <h3 className="font-display text-xs sm:text-base md:text-lg font-bold text-white truncate">
                {work.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {hasMultiple && (
                <span className="text-[11px] sm:text-xs text-[#86868b]">
                  {slide + 1} / {images.length}
                </span>
              )}
              <button
                onClick={onClose}
                className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors ms-1 sm:ms-2"
                aria-label="إغلاق"
              >
                <IconClose className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
            </div>
          </div>

          {/* Media Body */}
          <div className="relative flex-1 min-h-[260px] sm:min-h-[440px] bg-black flex flex-col items-center justify-center p-2 sm:p-4 overflow-hidden">
            {work.youtubeId ? (
              <div className="relative aspect-[9/16] max-h-[55vh] sm:max-h-[580px] w-auto overflow-hidden rounded-xl sm:rounded-2xl bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${work.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={work.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            ) : (
              <>
                <img
                  src={images[slide]}
                  alt={work.title}
                  className="max-h-[58vh] sm:max-h-[65vh] w-auto max-w-full object-contain rounded-xl sm:rounded-2xl shadow-2xl"
                />

                {hasMultiple && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute start-2 sm:start-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-95"
                      aria-label="السابق"
                    >
                      <IconChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute end-2 sm:end-4 flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all active:scale-95"
                      aria-label="التالي"
                    >
                      <IconChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </button>

                    {/* Slide Dots Indicator */}
                    <div className="absolute bottom-2 flex items-center gap-1.5 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md border border-white/10">
                      {images.map((_, i) => (
                        <span
                          key={i}
                          className={`h-1.5 rounded-full transition-all ${
                            i === slide ? "w-4 bg-white" : "w-1.5 bg-white/30"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-3 px-4 sm:p-4 sm:px-6 bg-[#121214] border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-4 shrink-0">
            <p className="text-[11px] sm:text-xs text-[#86868b] text-center sm:text-right line-clamp-2 sm:line-clamp-none">
              {work.desc}
            </p>

            {work.youtubeUrl && (
              <a
                href={work.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-btn !py-1.5 !px-3.5 !text-xs shrink-0 w-full sm:w-auto justify-center"
              >
                <IconYoutube className="h-3.5 w-3.5 text-red-600" />
                <span>فتح في YouTube</span>
              </a>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
