import { motion } from "motion/react";
import { services } from "../data";
import { IconPhoto, IconVideo, IconGraphic, IconMotion, IconArrow } from "./icons";
import { scrollToId } from "../lib/lenis";

const iconMap = {
  photo: IconPhoto,
  video: IconVideo,
  graphic: IconGraphic,
  motion: IconMotion,
};

export default function Services() {
  return (
    <section id="services" className="relative py-24 md:py-36 bg-[#000000] text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Section Header */}
        <div className="mb-14 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="apple-badge mb-4">
              <span className="text-[#2997ff]">✦</span>
              <span>خدماتنا</span>
            </div>
            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-tight">
              حلول إنتاج بصرية.
              <br />
              <span className="text-[#86868b] font-normal">من الفكرة إلى الشاشة.</span>
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#86868b] leading-relaxed">
            نقدم حزمة خدمات متكاملة تغطي كافة متطلبات الإنتاج الإعلامي المعاصر وفق أعلى المعايير الفنية.
          </p>
        </div>

        {/* 2x2 Apple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((s, idx) => {
            const Icon = iconMap[s.icon];
            return (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10% 0px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="apple-card group p-8 sm:p-10 flex flex-col justify-between min-h-[300px] hover:border-white/20 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/[0.06] border border-white/10 text-white transition-colors group-hover:bg-[#2997ff] group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="font-display text-xs font-semibold text-[#86868b] tracking-widest" dir="ltr">
                      {s.n}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
                    {s.title}
                  </h3>
                  <p className="text-sm sm:text-base text-[#86868b] leading-relaxed">
                    {s.desc}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white/[0.04] border border-white/[0.06] px-3 py-1 text-xs text-[#86868b]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollToId("contact")}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white hover:text-black"
                    aria-label={`طلب خدمة ${s.title}`}
                  >
                    <IconArrow className="h-4 w-4 rotate-[-45deg]" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
