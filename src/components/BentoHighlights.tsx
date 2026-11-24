import { motion } from "motion/react";
import { works, RESTAURANT_POSTERS } from "../data";
import type { Work } from "../data";
import { IconPlay, IconArrow } from "./icons";

export default function BentoHighlights({ onSelectWork }: { onSelectWork: (work: Work) => void }) {
  const videoWork = works.find((w) => w.id === "v1")!;
  const archWork = works.find((w) => w.id === "c2")!;
  const drinkWork = works.find((w) => w.id === "c1")!;
  const restWork = works.find((w) => w.id === "w8")!;

  return (
    <section id="highlights" className="relative py-16 sm:py-24 md:py-32 bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Apple Section Header */}
        <div className="mb-10 sm:mb-16">
          <div className="apple-badge mb-3 sm:mb-4">
            <span className="text-[#2997ff]">✦</span>
            <span>أبرز الأعمال</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            إتقان في كل تفصيل.
            <br />
            <span className="text-[#86868b] font-normal">أربعة مشاريع تصنع الفارق.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {/* Card 1: Flagship Video (Spans 2 columns) */}
          <div
            onClick={() => onSelectWork(videoWork)}
            className="group relative md:col-span-2 cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.99]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src={videoWork.src}
                alt={videoWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/40 to-transparent" />

              <div className="absolute top-4 start-4 sm:top-6 sm:start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff] animate-pulse" />
                  إنتاج سينمائي · 4K
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <IconPlay className="h-5 w-5 sm:h-7 sm:w-7 ms-0.5" />
                </div>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {videoWork.meta}
              </span>
              <h3 className="mt-1 sm:mt-2 font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {videoWork.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-[#86868b] leading-relaxed max-w-xl">
                {videoWork.desc}
              </p>
            </div>
          </div>

          {/* Card 2: Architecture Photography (Span 1 column) */}
          <div
            onClick={() => onSelectWork(archWork)}
            className="group relative md:col-span-1 cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden">
              <img
                src={archWork.src}
                alt={archWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />

              <div className="absolute top-4 start-4 sm:top-6 sm:start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                  {archWork.images?.length || 6} لقطات
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {archWork.meta}
              </span>
              <h3 className="mt-1 sm:mt-2 font-display text-lg sm:text-xl font-bold text-white">
                {archWork.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {archWork.desc}
              </p>
            </div>
          </div>

          {/* Card 3: Beverage Designs (Span 1 column) */}
          <div
            onClick={() => onSelectWork(drinkWork)}
            className="group relative md:col-span-1 cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.99] flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden">
              <img
                src={drinkWork.src}
                alt={drinkWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />

              <div className="absolute top-4 start-4 sm:top-6 sm:start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                  {drinkWork.images?.length || 3} تصاميم
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {drinkWork.meta}
              </span>
              <h3 className="mt-1 sm:mt-2 font-display text-lg sm:text-xl font-bold text-white">
                {drinkWork.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {drinkWork.desc}
              </p>
            </div>
          </div>

          {/* Card 4: Restaurant Posters (Span 2 columns) - Responsive poster previews */}
          <div
            onClick={() => onSelectWork(restWork)}
            className="group relative md:col-span-2 cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-300 hover:border-white/20 active:scale-[0.99]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full overflow-hidden p-2.5 sm:p-3">
              <div className="grid grid-cols-2 sm:grid-cols-3 h-full w-full gap-2 sm:gap-2.5">
                <div className="overflow-hidden rounded-xl sm:rounded-2xl h-full bg-black/40">
                  <img
                    src={RESTAURANT_POSTERS[0]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-xl sm:rounded-2xl h-full bg-black/40">
                  <img
                    src={RESTAURANT_POSTERS[1]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="hidden sm:block overflow-hidden rounded-2xl h-full bg-black/40">
                  <img
                    src={RESTAURANT_POSTERS[2]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/30 to-transparent" />

              <div className="absolute top-4 start-4 sm:top-6 sm:start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10 text-[11px]">
                  {restWork.images?.length || 7} بوسترات
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-6 md:p-8">
              <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {restWork.meta}
              </span>
              <h3 className="mt-1 sm:mt-2 font-display text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {restWork.title}
              </h3>
              <p className="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-[#86868b] leading-relaxed max-w-xl">
                {restWork.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
