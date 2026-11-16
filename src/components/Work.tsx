import { useEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useMotionValue, useSpring } from "motion/react";
import { kindMeta, works } from "../data";
import type { Kind, Work } from "../data";
import { MaskWords, SectionLabel } from "./Reveal";
import {
  IconArrow,
  IconClose,
  IconGrid,
  IconGraphic,
  IconPhoto,
  IconPlay,
  IconVideo,
  IconChevronLeft,
  IconChevronRight,
  IconYoutube,
} from "./icons";
import { lenis } from "../lib/lenis";
import { ar } from "../lib/format";
import { useModalBack } from "../hooks/useModalBack";

type Filter = "all" | Kind;

export const KindIcon = ({ kind, className }: { kind: Kind; className?: string }) =>
  kind === "video" ? (
    <IconVideo className={className} />
  ) : kind === "photo" ? (
    <IconPhoto className={className} />
  ) : (
    <IconGraphic className={className} />
  );

const filters: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: "all", label: "الكل", icon: <IconGrid className="h-4 w-4" /> },
  { id: "video", label: "فيديو", icon: <IconVideo className="h-4 w-4" /> },
  { id: "photo", label: "تصوير", icon: <IconPhoto className="h-4 w-4" /> },
  { id: "graphic", label: "غرافيك", icon: <IconGraphic className="h-4 w-4" /> },
];

function Card({
  w,
  filter,
  onOpen,
  ref: outerRef,
}: {
  w: Work;
  filter: Filter;
  onOpen: (w: Work, initialIndex?: number) => void;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [slide, setSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  // 3D tilt
  const rx = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const ry = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  const hasCarousel = Boolean(w.images && w.images.length > 0);
  const totalSlides = w.images?.length ?? 1;

  const nextSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlide((s) => (s + 1) % totalSlides);
  };

  const prevSlide = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSlide((s) => (s - 1 + totalSlides) % totalSlides);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prevSlide(); // RTL swipe
      else nextSlide();
    }
    touchStartX.current = null;
  };

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 8);
    rx.set((0.5 - py) * 8);
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
  };

  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={outerRef}
      layout
      layoutId={`card-${w.id}`}
      className={`relative ${filter === "all" ? w.span : w.fspan}`}
      style={{ borderRadius: 26 }}
      initial={{ opacity: 0, scale: 0.92, y: 50 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ type: "spring", stiffness: 260, damping: 32 }}
    >
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={leave}
        onClick={() => onOpen(w, hasCarousel ? slide : 0)}
        onTouchStart={hasCarousel ? onTouchStart : undefined}
        onTouchEnd={hasCarousel ? onTouchEnd : undefined}
        data-cursor={w.youtubeId ? "تشغيل" : "عرض"}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, borderRadius: 26 }}
        className="group relative h-full w-full cursor-pointer overflow-hidden border border-white/10 bg-coal select-none"
      >
        {/* Visual Layer: preserves 9:16 vertical ratio and image boundaries */}
        {hasCarousel && w.images ? (
          <>
            <img
              src={w.images[slide]}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-25 blur-2xl"
            />
            <img
              key={slide}
              src={w.images[slide]}
              alt={`${w.title} - ${slide + 1}`}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-contain p-3 md:p-5 transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </>
        ) : (
          <>
            <img
              src={w.src}
              alt=""
              aria-hidden
              className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl"
            />
            <img
              src={w.src}
              alt={w.title}
              loading="lazy"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-105"
            />
          </>
        )}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-black/40" />

        {/* Spotlight edge on hover */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(380px circle at var(--mx,50%) var(--my,50%), rgba(200,255,46,0.55), transparent 55%)",
          }}
        />

        {/* Top-start chip */}
        <div className="absolute start-3 top-3 z-10 flex items-center gap-1.5 rounded-full bg-black/65 py-1 px-2.5 font-display text-[11px] font-extrabold text-white backdrop-blur-md sm:start-4 sm:top-4 sm:py-1.5 sm:ps-3 sm:pe-4 sm:text-xs">
          <KindIcon kind={w.kind} className="h-3.5 w-3.5 text-lime sm:h-4 sm:w-4" />
          <span className="truncate max-w-[90px] sm:max-w-none">
            {hasCarousel ? `معرض صور (${ar(totalSlides)})` : kindMeta[w.kind].label}
          </span>
        </div>

        {/* Top-end action badge or image counter */}
        {hasCarousel ? (
          <div className="absolute end-3 top-3 z-10 flex items-center gap-1.5 sm:end-4 sm:top-4 sm:gap-2">
            <span className="rounded-full bg-black/70 px-2.5 py-1 font-display text-[11px] font-black text-lime backdrop-blur-md sm:px-3.5 sm:py-1.5 sm:text-xs">
              {ar(slide + 1)} / {ar(totalSlides)}
            </span>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-black transition-all duration-500 group-hover:bg-lime sm:h-10 sm:w-10">
              <IconArrow className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </div>
          </div>
        ) : (
          <div className="absolute end-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-ink text-black transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-lime sm:end-4 sm:top-4 sm:h-10 sm:w-10">
            <IconPlay className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
          </div>
        )}

        {/* Carousel controls on card */}
        {hasCarousel && (
          <div className="absolute inset-x-2 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between sm:inset-x-3">
            <button
              onClick={prevSlide}
              aria-label="الصورة السابقة"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-all hover:scale-110 hover:bg-lime hover:text-black sm:h-9 sm:w-9"
            >
              <IconChevronRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="الصورة التالية"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur transition-all hover:scale-110 hover:bg-lime hover:text-black sm:h-9 sm:w-9"
            >
              <IconChevronLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </button>
          </div>
        )}

        {/* Bottom content & indicators */}
        <div className="absolute inset-x-0 bottom-0 z-10 p-3.5 sm:p-5">
          {hasCarousel && w.images && (
            <div className="mb-2 flex items-center gap-1 sm:mb-3 sm:gap-1.5" onClick={(e) => e.stopPropagation()}>
              {w.images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSlide(i);
                  }}
                  aria-label={`انتقل إلى الصورة ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === slide ? "w-5 sm:w-6 bg-lime" : "w-1.5 bg-white/30 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          )}
          <div className="text-[11px] font-bold text-lime sm:text-xs truncate">{w.meta}</div>
          <div className="mt-0.5 font-display text-lg leading-[1.25] font-black text-white sm:text-2xl sm:leading-[1.3] md:text-[1.7rem] line-clamp-2">
            {w.title}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Modal({
  w,
  initialIndex = 0,
  onClose,
}: {
  w: Work;
  initialIndex?: number;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(initialIndex);
  const touchStartX = useRef<number | null>(null);

  // Hook handles hardware & browser back buttons on mobile
  useModalBack(true, onClose);

  const hasCarousel = Boolean(w.images && w.images.length > 0);
  const total = w.images?.length ?? 1;

  const next = () => setIndex((i) => (i + 1) % total);
  const prev = () => setIndex((i) => (i - 1 + total) % total);

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasCarousel) {
        if (e.key === "ArrowLeft") next();
        if (e.key === "ArrowRight") prev();
      }
    };
    window.addEventListener("keydown", k);
    lenis?.stop();
    return () => {
      window.removeEventListener("keydown", k);
      lenis?.start();
    };
  }, [onClose, hasCarousel, total]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) prev();
      else next();
    }
    touchStartX.current = null;
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 md:p-8">
      <motion.div
        className="absolute inset-0 bg-black/92 backdrop-blur-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        data-cursor="إغلاق"
      />
      <motion.div
        layoutId={`card-${w.id}`}
        style={{ borderRadius: 28 }}
        data-lenis-prevent
        className="relative flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden overflow-y-auto border border-white/15 bg-[#0b0b0e] md:flex-row"
      >
        {/* Visual Showcase: YouTube 9:16 Player OR Adaptive Carousel */}
        <div
          onTouchStart={hasCarousel ? onTouchStart : undefined}
          onTouchEnd={hasCarousel ? onTouchEnd : undefined}
          className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-black min-h-[50vh] sm:min-h-[58vh] md:min-h-[580px] md:w-[64%]"
        >
          {w.youtubeId ? (
            <div className="relative flex h-full w-full min-h-[52vh] sm:min-h-[60vh] md:min-h-[580px] items-center justify-center bg-black p-2 sm:p-4">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${w.youtubeId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                title={w.title}
                className="aspect-[9/16] h-full max-h-[75vh] md:max-h-[82vh] w-auto max-w-[420px] rounded-2xl border-0 shadow-2xl"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          ) : hasCarousel && w.images ? (
            <div className="relative flex h-full w-full min-h-[50vh] sm:min-h-[58vh] md:min-h-[580px] items-center justify-center overflow-hidden select-none">
              {/* Blurred atmospheric backdrop */}
              <img
                src={w.images[index]}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl"
              />

              {/* Contained sharp image — preserves 100% aspect ratio and quality */}
              <img
                key={index}
                src={w.images[index]}
                alt={`${w.title} - ${index + 1}`}
                className="relative z-10 max-h-[65vh] md:max-h-[72vh] w-full object-contain p-4 md:p-8"
              />

              {/* Counter badge */}
              <div className="absolute start-4 top-4 z-20 flex items-center gap-2 rounded-full bg-black/75 px-4 py-2 font-display text-sm font-black text-lime backdrop-blur">
                الصورة {ar(index + 1)} من {ar(total)}
              </div>

              {/* Floating Carousel Navigation Buttons */}
              <button
                onClick={prev}
                aria-label="الصورة السابقة"
                className="absolute end-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-lime hover:text-black"
              >
                <IconChevronRight className="h-6 w-6" />
              </button>
              <button
                onClick={next}
                aria-label="الصورة التالية"
                className="absolute start-4 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white backdrop-blur-md transition-all hover:scale-110 hover:bg-lime hover:text-black"
              >
                <IconChevronLeft className="h-6 w-6" />
              </button>

              {/* Thumbnail Strip */}
              <div className="absolute inset-x-0 bottom-3 z-20 flex items-center justify-center gap-1.5 overflow-x-auto px-4 py-1">
                {w.images.map((imgSrc, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`عرض الصورة ${i + 1}`}
                    className={`relative h-12 w-12 shrink-0 overflow-hidden rounded-lg border transition-all ${
                      i === index
                        ? "border-lime scale-105 shadow-md shadow-lime/20"
                        : "border-white/20 opacity-50 hover:opacity-90"
                    }`}
                  >
                    <img src={imgSrc} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full min-h-[50vh] sm:min-h-[58vh] md:min-h-[580px] items-center justify-center overflow-hidden">
              <img
                src={w.src}
                alt=""
                aria-hidden
                className="pointer-events-none absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl"
              />
              <img
                src={w.src}
                alt={w.title}
                className="relative z-10 max-h-[70vh] w-full object-contain p-4 md:p-8"
              />
            </div>
          )}
        </div>

        {/* Modal Info Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-1 flex-col justify-between gap-6 p-6 md:p-9"
        >
          <div>
            <div className="mb-4 flex items-center gap-2 font-display text-sm font-extrabold text-lime">
              <KindIcon kind={w.kind} className="h-5 w-5" />
              {kindMeta[w.kind].label} · {w.year}
            </div>

            <h3 className="font-display text-3xl leading-[1.25] font-black md:text-4xl">{w.title}</h3>
            <div className="mt-2 text-sm font-bold text-ink/50 md:text-base">{w.meta}</div>

            <p className="mt-5 text-base leading-relaxed font-medium text-ink/80 md:text-lg">{w.desc}</p>

            {/* If YouTube video, add quick external link */}
            {w.youtubeId && (
              <a
                href={`https://www.youtube.com/shorts/${w.youtubeId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 font-display text-xs font-bold text-white transition-colors hover:border-red-500 hover:text-red-400"
              >
                <IconYoutube className="h-4 w-4" />
                فتح في YouTube Shorts
              </a>
            )}

            {/* If Carousel, add quick step controls */}
            {hasCarousel && (
              <div className="mt-8 flex items-center gap-3">
                <button
                  onClick={prev}
                  className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white transition-colors hover:border-lime hover:text-lime"
                >
                  <IconChevronRight className="h-3.5 w-3.5" />
                  السابق
                </button>
                <button
                  onClick={next}
                  className="flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-bold text-white transition-colors hover:border-lime hover:text-lime"
                >
                  التالي
                  <IconChevronLeft className="h-3.5 w-3.5" />
                </button>
              </div>
            )}
          </div>

          <button
            onClick={onClose}
            className="flex w-fit items-center gap-2 rounded-full bg-lime px-6 py-3 font-display font-black text-black transition-transform hover:scale-[1.03]"
          >
            <IconClose className="h-4 w-4" />
            إغلاق
          </button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default function WorkSection() {
  const [filter, setFilter] = useState<Filter>("all");
  const [active, setActive] = useState<{ work: Work; initialIndex: number } | null>(null);

  const list = filter === "all" ? works : works.filter((w) => w.kind === filter);
  const count = (f: Filter) => (f === "all" ? works.length : works.filter((w) => w.kind === f).length);
  const close = () => setActive(null);

  return (
    <section id="work" className="relative px-4 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel index="٠١">الأعمال المختارة</SectionLabel>

        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <h2 className="font-display text-[3.4rem] leading-[1.15] font-black md:text-[8.5rem]">
            <MaskWords text="شبكة" />
            <br />
            <MaskWords text="الأعمال" highlight={[0]} delay={0.15} />
          </h2>

          <LayoutGroup id="filters">
            <div className="flex flex-wrap gap-2" role="tablist">
              {filters.map((f) => {
                const on = filter === f.id;
                return (
                  <button
                    key={f.id}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(f.id)}
                    className={`relative flex items-center gap-2 rounded-full border px-5 py-3 font-display text-[15px] font-extrabold transition-colors ${
                      on ? "border-transparent text-black" : "border-white/15 text-ink hover:border-white/40"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-lime"
                        transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {f.icon}
                      {f.label}
                      <sup className="text-[11px] opacity-60">{ar(count(f.id))}</sup>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <LayoutGroup id="grid">
          <motion.div
            layout
            className="grid auto-rows-[190px] grid-cols-2 gap-3 [grid-auto-flow:dense] sm:auto-rows-[220px] md:auto-rows-[270px] md:grid-cols-4 md:gap-4"
          >
            <AnimatePresence mode="popLayout">
              {list.map((w) => (
                <Card
                  key={w.id}
                  w={w}
                  filter={filter}
                  onOpen={(item, initialIndex) => setActive({ work: item, initialIndex: initialIndex ?? 0 })}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {active && (
              <Modal
                key="modal"
                w={active.work}
                initialIndex={active.initialIndex}
                onClose={close}
              />
            )}
          </AnimatePresence>
        </LayoutGroup>
      </div>
    </section>
  );
}
