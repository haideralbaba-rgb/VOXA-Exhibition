import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  YOUTUBE_HERO_ID,
  YOUTUBE_HERO_URL,
  YOUTUBE_HERO_POSTER,
  YOUTUBE_SECOND_ID,
  YOUTUBE_SECOND_URL,
  YOUTUBE_SECOND_POSTER,
  YOUTUBE_THIRD_ID,
  YOUTUBE_THIRD_URL,
  YOUTUBE_THIRD_POSTER,
  YOUTUBE_FOURTH_ID,
  YOUTUBE_FOURTH_URL,
  YOUTUBE_FOURTH_POSTER,
} from "../data";
import { IconPlay, IconClose, IconYoutube } from "./icons";
import { useModalBack } from "../hooks/useModalBack";

interface VideoItem {
  id: string;
  youtubeId: string;
  youtubeUrl: string;
  title: string;
  category: string;
  poster: string;
  desc: string;
}

const videos: VideoItem[] = [
  {
    id: "v1",
    youtubeId: YOUTUBE_HERO_ID,
    youtubeUrl: YOUTUBE_HERO_URL,
    title: "بيت بيروت I",
    category: "سينمائي · إضاءة وحركة",
    poster: YOUTUBE_HERO_POSTER,
    desc: "لقطات سينمائية وتوزيع إضاءة سريع الإيقاع في بيت بيروت.",
  },
  {
    id: "v2",
    youtubeId: YOUTUBE_SECOND_ID,
    youtubeUrl: YOUTUBE_SECOND_URL,
    title: "مشاهد سينمائية",
    category: "حركة كاميرا · زوايا وتفاصيل",
    poster: YOUTUBE_SECOND_POSTER,
    desc: "انتقالات وحركة كاميرا تركز على الزوايا والتفاصيل.",
  },
  {
    id: "v3",
    youtubeId: YOUTUBE_THIRD_ID,
    youtubeUrl: YOUTUBE_THIRD_URL,
    title: "إضاءة وحركة",
    category: "ظلال وتدرجات · تكوين بصري",
    poster: YOUTUBE_THIRD_POSTER,
    desc: "توزيع الظلال وتدرجات الضوء بزوايا تصوير مدروسة.",
  },
  {
    id: "v4",
    youtubeId: YOUTUBE_FOURTH_ID,
    youtubeUrl: YOUTUBE_FOURTH_URL,
    title: "بيت بيروت II",
    category: "توثيق تاريخي · معالم المكان",
    poster: YOUTUBE_FOURTH_POSTER,
    desc: "استكشاف بصري لتفاصيل ومعالم بيت بيروت التاريخية.",
  },
];

export default function CinemaStage() {
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);

  useModalBack(Boolean(activeVideo), () => setActiveVideo(null));

  return (
    <section id="cinema" className="relative py-16 sm:py-24 md:py-32 bg-[#000000] text-white">
      {/* Background ambient light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[350px] sm:h-[450px] w-[500px] sm:w-[700px] rounded-full opacity-25 blur-[120px] sm:blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(41, 151, 255, 0.22) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Apple Section Header */}
        <div className="mb-8 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <div className="apple-badge mb-3 sm:mb-4">
              <span className="text-[#2997ff]">✦</span>
              <span>المسرح السينمائي</span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
              أفلام قصيرة.
              <br />
              <span className="text-[#86868b] font-normal">بأعلى دقة سينمائية.</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm md:text-base text-[#86868b] leading-relaxed">
            أربعة مقاطع مصورة صُممت لتناسب الشاشات الرأسية مع مراعاة أعلى معايير الإضاءة والمونتاج الاحترافي.
          </p>
        </div>

        {/* Mobile Swipe Notice (Visible on small screens) */}
        <div className="sm:hidden flex items-center justify-between text-[11px] text-[#86868b] mb-3 px-1">
          <span>مرر أفقياً لتصفح المقاطع</span>
          <span className="flex items-center gap-1 text-[#2997ff]">
            <span>اسحب</span>
            <span>←</span>
          </span>
        </div>

        {/* Responsive Rail: Swipeable horizontal on mobile, clean 4-col grid on tablet/desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 overflow-x-auto sm:overflow-visible pb-4 sm:pb-0 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          {videos.map((v) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="group relative cursor-pointer overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.98] aspect-[9/16] w-[75vw] sm:w-auto shrink-0 sm:shrink snap-center flex flex-col justify-between"
            >
              {/* Video Poster */}
              <img
                src={v.poster}
                alt={v.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinema gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/30" />

              {/* Top tag */}
              <div className="relative z-10 p-4 sm:p-5 flex justify-between items-center">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[10px] sm:text-[11px]">
                  {v.category}
                </span>
              </div>

              {/* Center Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <IconPlay className="h-5 w-5 sm:h-6 sm:w-6 ms-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-4 sm:p-5 pt-0">
                <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-snug">
                  {v.title}
                </h3>
                <p className="mt-1 text-xs text-[#86868b] line-clamp-2">
                  {v.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Apple Theater Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-3 sm:p-6 backdrop-blur-2xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md max-h-[92vh] flex flex-col overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#161617] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] p-3.5 px-4 sm:p-4 sm:px-6 bg-[#161617] shrink-0">
                <div>
                  <h4 className="font-display text-sm sm:text-base font-bold text-white">{activeVideo.title}</h4>
                  <span className="text-[11px] sm:text-xs text-[#86868b]">{activeVideo.category}</span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                  aria-label="إغلاق"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>

              {/* YouTube Shorts Embed - Constrained properly on mobile screen heights */}
              <div className="relative aspect-[9/16] max-h-[56vh] sm:max-h-[60vh] w-auto mx-auto bg-black overflow-hidden flex-1">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex flex-col sm:flex-row items-center justify-between p-3.5 px-4 sm:p-4 sm:px-6 bg-[#121214] gap-2.5 sm:gap-4 shrink-0 border-t border-white/[0.06]">
                <p className="text-[11px] sm:text-xs text-[#86868b] text-center sm:text-right line-clamp-1 sm:line-clamp-none">
                  {activeVideo.desc}
                </p>
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-pill-btn !py-1.5 !px-3.5 !text-xs shrink-0 w-full sm:w-auto justify-center"
                >
                  <IconYoutube className="h-3.5 w-3.5 text-red-600" />
                  <span>فتح في YouTube</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
