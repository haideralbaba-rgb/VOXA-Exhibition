import { useState } from "react";
import { motion } from "motion/react";
import { works, COLLAGE_1_IMAGES, COLLAGE_2_IMAGES, RESTAURANT_POSTERS, YOUTUBE_HERO_ID } from "../data";
import type { Work } from "../data";
import { IconArrow, IconPlay, IconClose, IconChevronRight, IconChevronLeft } from "./icons";
import { useModalBack } from "../hooks/useModalBack";

export default function BentoHighlights({ onSelectWork }: { onSelectWork: (work: Work) => void }) {
  const videoWork = works.find((w) => w.id === "v1")!;
  const archWork = works.find((w) => w.id === "c2")!;
  const drinkWork = works.find((w) => w.id === "c1")!;
  const restWork = works.find((w) => w.id === "w8")!;

  return (
    <section id="highlights" className="relative py-24 md:py-36 bg-black text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Section Header */}
        <div className="mb-14 md:mb-20">
          <div className="apple-badge mb-4">
            <span className="text-[#2997ff]">✦</span>
            <span>أبرز الأعمال</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
            إتقان في كل تفصيل.
            <br />
            <span className="text-[#86868b] font-normal">أربعة مشاريع تصنع الفارق.</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Flagship Video (Spans 2 columns) */}
          <div
            onClick={() => onSelectWork(videoWork)}
            className="group relative md:col-span-2 cursor-pointer overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden">
              <img
                src={videoWork.src}
                alt={videoWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/30 to-transparent" />

              {/* Play Badge Overlay */}
              <div className="absolute top-6 start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#2997ff] animate-pulse" />
                  إنتاج سينمائي · 4K
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xl transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-black">
                  <IconPlay className="h-7 w-7 ms-1" />
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {videoWork.meta}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                {videoWork.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#86868b] leading-relaxed max-w-xl">
                {videoWork.desc}
              </p>
            </div>
          </div>

          {/* Card 2: Architecture Photography (Span 1 column) */}
          <div
            onClick={() => onSelectWork(archWork)}
            className="group relative md:col-span-1 cursor-pointer overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c] flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={archWork.src}
                alt={archWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />

              <div className="absolute top-6 start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10">
                  {archWork.images?.length || 6} لقطات
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {archWork.meta}
              </span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white">
                {archWork.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {archWork.desc}
              </p>
            </div>
          </div>

          {/* Card 3: Beverage Designs (Span 1 column) */}
          <div
            onClick={() => onSelectWork(drinkWork)}
            className="group relative md:col-span-1 cursor-pointer overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c] flex flex-col justify-between"
          >
            <div className="relative aspect-square w-full overflow-hidden">
              <img
                src={drinkWork.src}
                alt={drinkWork.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-transparent to-transparent" />

              <div className="absolute top-6 start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10">
                  {drinkWork.images?.length || 3} تصاميم
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {drinkWork.meta}
              </span>
              <h3 className="mt-2 font-display text-xl sm:text-2xl font-bold text-white">
                {drinkWork.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {drinkWork.desc}
              </p>
            </div>
          </div>

          {/* Card 4: Restaurant Posters (Span 2 columns) */}
          <div
            onClick={() => onSelectWork(restWork)}
            className="group relative md:col-span-2 cursor-pointer overflow-hidden rounded-[28px] sm:rounded-[32px] border border-white/[0.08] bg-[#161617] transition-all duration-500 hover:border-white/20 hover:bg-[#1a1a1c]"
          >
            <div className="relative aspect-[16/10] sm:aspect-[16/8] w-full overflow-hidden">
              {/* Split preview showing several restaurant posters */}
              <div className="grid grid-cols-3 h-full w-full gap-2 p-2">
                <div className="overflow-hidden rounded-2xl h-full">
                  <img
                    src={RESTAURANT_POSTERS[0]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl h-full">
                  <img
                    src={RESTAURANT_POSTERS[1]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="overflow-hidden rounded-2xl h-full">
                  <img
                    src={RESTAURANT_POSTERS[2]}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#161617] via-[#161617]/40 to-transparent" />

              <div className="absolute top-6 start-6">
                <span className="apple-badge bg-black/60 backdrop-blur-md text-white border-white/10">
                  {restWork.images?.length || 7} بوسترات
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#86868b]">
                {restWork.meta}
              </span>
              <h3 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-white">
                {restWork.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#86868b] leading-relaxed max-w-xl">
                {restWork.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
