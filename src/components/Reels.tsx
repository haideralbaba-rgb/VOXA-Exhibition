import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { reels } from "../data";
import type { Reel } from "../data";
import { IconClose, IconEye } from "./icons";
import { MaskWords, SectionLabel } from "./Reveal";
import { lenis } from "../lib/lenis";
import { ar } from "../lib/format";
import { useModalBack } from "../hooks/useModalBack";

function ReelCard({
  r,
  i,
  onOpen,
}: {
  r: Reel;
  i: number;
  onOpen: (r: Reel) => void;
}) {
  return (
    <div
      onClick={() => onOpen(r)}
      data-cursor="معاينة"
      className={`group relative h-[58vh] max-h-[640px] shrink-0 aspect-[9/16] cursor-pointer overflow-hidden rounded-[28px] border border-white/10 bg-coal ${
        i % 2 ? "translate-y-10 md:translate-y-14" : "-translate-y-2"
      }`}
    >
      {/* Blurred background layer to prevent black letterboxes and preserve full design */}
      <img
        src={r.src}
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-35 blur-xl"
      />

      {/* Main design: object-contain for square posters, object-cover for vertical */}
      <img
        src={r.src}
        alt={r.title}
        loading="lazy"
        draggable={false}
        className={`absolute inset-0 h-full w-full ${
          r.aspect === "1/1" ? "object-contain p-2" : "object-cover"
        } transition-transform duration-[1200ms] ease-out group-hover:scale-[1.08]`}
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/40" />

      {/* Story progress bar */}
      <div className="absolute inset-x-4 top-4 h-[3px] overflow-hidden rounded-full bg-white/25">
        <div
          className="h-full origin-right animate-[reelbar_6s_linear_infinite] rounded-full bg-white"
          style={{ animationDelay: `${i * -1.1}s` }}
        />
      </div>

      <div className="absolute start-4 top-9 flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 font-display text-xs font-extrabold backdrop-blur">
        <span className="text-lime text-xs">✦</span>
        {r.tag}
      </div>

      {/* Center preview button on hover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-black shadow-xl transition-transform duration-300 group-hover:scale-110">
          <IconEye className="h-6 w-6" />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <div className="mb-1.5 flex items-center gap-1.5 text-xs font-extrabold text-lime tracking-wide">
          {r.views}
        </div>
        <div className="font-display text-2xl leading-[1.3] font-black">{r.title}</div>
      </div>
    </div>
  );
}

function ReelModal({ r, onClose }: { r: Reel; onClose: () => void }) {
  // Support Android and iOS hardware/browser back buttons
  useModalBack(true, onClose);

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", k);
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", k);
      lenis?.start();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-8">
      <motion.div
        className="absolute inset-0 bg-black/90 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-cursor="إغلاق"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative z-10 flex max-h-[92vh] w-full max-w-sm md:max-w-md flex-col overflow-hidden rounded-[28px] border border-white/15 bg-black shadow-2xl"
      >
        <div
          className={`relative ${
            r.aspect === "1/1" ? "aspect-square max-h-[72vh]" : "aspect-[9/16]"
          } w-full bg-[#0a0a0d] overflow-hidden flex items-center justify-center`}
        >
          {r.youtubeId ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${r.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
              title={r.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <>
              <img
                src={r.src}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl"
              />
              <img
                src={r.src}
                alt={r.title}
                className="relative z-10 h-full w-full object-contain p-2 sm:p-4"
              />
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-[#0c0c10] p-4">
          <div className="min-w-0 flex-1 pe-3">
            <div className="text-xs font-bold text-lime">{r.tag} · {r.views}</div>
            <div className="font-display text-lg font-black text-white truncate">{r.title}</div>
            {r.desc && <p className="mt-1 text-xs text-ink/70 leading-relaxed">{r.desc}</p>}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={r.src}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-lime hover:text-black"
              title="عرض بالحجم الكامل"
            >
              <IconEye className="h-4 w-4" />
            </a>
            <button
              onClick={onClose}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-lime text-black font-bold transition-transform hover:scale-105"
              title="إغلاق"
            >
              <IconClose className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function Reels() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [max, setMax] = useState(0);
  const [activeReel, setActiveReel] = useState<Reel | null>(null);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });
  const x = useTransform(smooth, [0, 1], [0, max]);
  const bar = useTransform(smooth, [0, 1], [0.02, 1]);
  const bgText = useTransform(smooth, [0, 1], ["0%", "-30%"]);

  useLayoutEffect(() => {
    const measure = () => {
      const w = trackRef.current?.getBoundingClientRect().width ?? 0;
      setMax(Math.max(0, w - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    const t = setTimeout(measure, 800);
    return () => {
      window.removeEventListener("resize", measure);
      clearTimeout(t);
    };
  }, []);

  return (
    <section id="reels" ref={sectionRef} className="relative h-[420vh] bg-[#08080a]">
      <style>{`@keyframes reelbar{0%{transform:scaleX(0)}100%{transform:scaleX(1)}}`}</style>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {/* Giant background word */}
        <motion.div
          style={{ x: bgText }}
          className="pointer-events-none absolute -top-4 start-0 select-none font-display text-[38vw] leading-none font-black text-outline-dim whitespace-nowrap"
          dir="ltr"
          aria-hidden
        >
          DESIGNS
        </motion.div>

        <div className="relative z-10 px-5 pt-20 md:px-10 md:pt-24">
          <SectionLabel index="٠٣">تصاميم وبوسترات</SectionLabel>
          <h2 className="font-display text-5xl leading-[1.15] font-black md:text-8xl">
            <MaskWords text="تصاميم" highlight={[0]} /> <MaskWords text="مختارة" delay={0.15} />
          </h2>
        </div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="relative z-10 flex w-max items-center gap-5 px-5 py-8 md:gap-8 md:px-10"
          dir="rtl"
        >
          {reels.map((r, i) => (
            <ReelCard key={r.id} r={r} i={i} onOpen={setActiveReel} />
          ))}
          <div className="flex h-[58vh] w-[70vw] shrink-0 flex-col items-start justify-center gap-4 ps-6 md:w-[30vw]">
            <div className="font-display text-4xl leading-[1.3] font-black md:text-6xl">
              والمزيد <span className="text-lime">من الأعمال</span> قادم.
            </div>
            <div className="text-lg font-bold text-ink/60">
              {ar(reels.length)} تصاميم تميز علامتك
            </div>
          </div>
        </motion.div>

        <div className="relative z-10 mx-5 mt-2 flex items-center gap-4 md:mx-10">
          <span className="font-display text-sm font-bold text-ink/60">مرّر للأسفل</span>
          <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/15">
            <motion.div className="h-full origin-right bg-lime" style={{ scaleX: bar }} />
          </div>
        </div>
      </div>

      <AnimatePresence>
        {activeReel && <ReelModal r={activeReel} onClose={() => setActiveReel(null)} />}
      </AnimatePresence>
    </section>
  );
}
