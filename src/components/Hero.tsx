import { useRef, useState } from "react";
import { motion } from "motion/react";
import { IconPlay, IconArrow } from "./icons";
import { scrollToId } from "../lib/lenis";
import { POSTER_LENS, VIDEO_LENS } from "../data";

export default function Hero({ ready }: { ready: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] sm:min-h-screen pt-24 pb-14 sm:pt-32 sm:pb-24 md:pt-36 md:pb-32 overflow-hidden bg-black text-center">
      {/* Apple-style atmospheric top glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[350px] sm:h-[500px] w-[600px] sm:w-[800px] rounded-full opacity-40 blur-[100px] sm:blur-[140px]"
        style={{
          background: "radial-gradient(circle, rgba(41, 151, 255, 0.28) 0%, rgba(120, 119, 198, 0.15) 45%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
        {/* Apple Kicker */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-5 sm:mb-6 flex justify-center"
        >
          <div className="apple-badge text-[11px] sm:text-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff]" />
            <span>VOXA EXHIBITION · استوديو الإنتاج البصري</span>
          </div>
        </motion.div>

        {/* Apple Massive Gradient Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.18] sm:leading-[1.12]"
        >
          <span className="apple-text-gradient block">رؤية سينمائية.</span>
          <span className="text-white/90 block">صُنعت لتبقى.</span>
        </motion.h1>

        {/* Subtitle in signature Apple #86868b */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-4 sm:mt-6 max-w-xl text-sm sm:text-lg text-[#86868b] leading-relaxed font-normal px-2"
        >
          استوديو متكامل لصناعة الأفلام الإعلانية، التوثيق المعماري، والهويات البصرية
          المبتكرة بأعلى معايير الإتقان والدقة السينمائية.
        </motion.p>

        {/* Apple CTAs - full width on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 max-w-xs sm:max-w-none mx-auto"
        >
          <button
            onClick={() => scrollToId("highlights")}
            className="apple-pill-btn !py-3 sm:!py-2.5 !px-6 !text-sm shadow-md justify-center"
          >
            <span>استكشف أبرز الأعمال</span>
            <IconArrow className="h-4 w-4 rotate-[-45deg]" />
          </button>

          <button
            onClick={() => scrollToId("cinema")}
            className="apple-pill-btn-secondary !py-3 sm:!py-2.5 !px-6 !text-sm justify-center"
          >
            <IconPlay className="h-4 w-4 text-[#2997ff]" />
            <span>المسرح السينمائي</span>
          </button>
        </motion.div>

        {/* Apple Pro Hardware / Cinema Stage Frame */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto mt-10 sm:mt-16 max-w-4xl"
        >
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[32px] md:rounded-[36px] border border-white/[0.12] bg-[#161617] p-1.5 sm:p-2.5 md:p-3 shadow-[0_20px_70px_rgba(0,0,0,0.9)]">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[15px] sm:rounded-[24px] md:rounded-[28px] bg-black">
              <video
                ref={videoRef}
                src={VIDEO_LENS}
                poster={POSTER_LENS}
                playsInline
                muted
                loop
                autoPlay
                className="h-full w-full object-cover"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

              {/* Bottom HUD bar */}
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 sm:p-5 text-white text-[11px] sm:text-xs">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-medium text-white/80">عرض ترويجي · 4K UHD</span>
                </div>

                <button
                  onClick={toggleVideo}
                  className="flex items-center gap-1.5 rounded-full bg-white/20 px-2.5 sm:px-3 py-1 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/30 active:scale-95"
                >
                  <span>{isPlaying ? "إيقاف مؤقت" : "تشغيل"}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
