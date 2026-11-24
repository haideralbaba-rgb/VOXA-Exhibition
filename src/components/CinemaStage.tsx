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
    <section id="cinema" className="relative py-24 md:py-36 bg-[#000000] text-white">
      {/* Background ambient light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[450px] w-[700px] rounded-full opacity-25 blur-[150px]"
        style={{
          background: "radial-gradient(circle, rgba(41, 151, 255, 0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Apple Section Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="apple-badge mb-4">
              <span className="text-[#2997ff]">✦</span>
              <span>المسرح السينمائي</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              أفلام قصيرة.
              <br />
              <span className="text-[#86868b] font-normal">بأعلى دقة سينمائية.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#86868b] leading-relaxed">
            أربعة مقاطع مصورة صُممت لتناسب الشاشات الرأسية مع مراعاة أعلى معايير الإضاءة والمونتاج الاحترافي.
          </p>
        </div>

        {/* 4-Column Cinema Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {videos.map((v, i) => (
            <div
              key={v.id}
              onClick={() => setActiveVideo(v)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c] aspect-[9/16] flex flex-col justify-between"
            >
              {/* Video Poster */}
              <img
                src={v.poster}
                alt={v.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Cinema gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/30" />

              {/* Top tag */}
              <div className="relative z-10 p-5 flex justify-between items-center">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                  {v.category}
                </span>
              </div>

              {/* Center Play Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <IconPlay className="h-6 w-6 ms-0.5" />
                </div>
              </div>

              {/* Bottom Info */}
              <div className="relative z-10 p-5 pt-0">
                <h3 className="font-display text-xl font-bold text-white leading-snug">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-6 backdrop-blur-2xl"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-sm sm:max-w-md overflow-hidden rounded-[32px] border border-white/15 bg-[#161617] shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between border-b border-white/[0.08] p-4 px-6">
                <div>
                  <h4 className="font-display text-base font-bold text-white">{activeVideo.title}</h4>
                  <span className="text-xs text-[#86868b]">{activeVideo.category}</span>
                </div>
                <button
                  onClick={() => setActiveVideo(null)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors"
                >
                  <IconClose className="h-4 w-4" />
                </button>
              </div>

              {/* YouTube Shorts Embed (9:16) */}
              <div className="relative aspect-[9/16] w-full bg-black">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-between p-4 px-6 bg-[#121214]">
                <p className="text-xs text-[#86868b]">{activeVideo.desc}</p>
                <a
                  href={activeVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-pill-btn !py-1.5 !px-3 !text-xs shrink-0"
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
