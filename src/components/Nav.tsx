import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { VoxaMark, IconMenu, IconClose, IconArrow, IconWhatsapp } from "./icons";
import { lenis, scrollToId } from "../lib/lenis";
import { useModalBack } from "../hooks/useModalBack";

const navLinks = [
  { id: "hero", label: "نظرة عامة" },
  { id: "highlights", label: "أبرز الأعمال" },
  { id: "cinema", label: "الأفلام والريلز" },
  { id: "gallery", label: "المعارض" },
  { id: "specs", label: "المواصفات" },
  { id: "services", label: "الخدمات" },
];

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#hero"
      onClick={(e) => {
        e.preventDefault();
        if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      }}
      className={`flex items-center gap-2 text-white transition-opacity hover:opacity-80 shrink-0 ${className}`}
      aria-label="VOXA"
    >
      <VoxaMark className="h-5 sm:h-6 w-auto shrink-0 text-white" />
      <span className="font-display text-lg sm:text-xl font-bold tracking-[0.16em]" dir="ltr">
        VOXA
      </span>
    </a>
  );
}

export default function Nav({ ready }: { ready: boolean }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useModalBack(open, () => setOpen(false));

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  const navigateTo = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 250 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/80 backdrop-blur-2xl border-b border-white/[0.08] py-2.5 sm:py-3"
            : "bg-transparent py-3.5 sm:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 md:px-8">
          <Logo />

          {/* Desktop Apple-style navigation links */}
          <nav className="hidden items-center gap-7 lg:gap-8 md:flex">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => navigateTo(link.id)}
                className="text-xs font-medium text-[#86868b] transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action Button & Mobile trigger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigateTo("contact")}
              className="hidden sm:inline-flex apple-pill-btn !py-1.5 !px-3.5 !text-xs !font-semibold shadow-sm"
            >
              <span>تواصل معنا</span>
              <IconArrow className="h-3 w-3 rotate-[-45deg]" />
            </button>

            {/* Mobile menu trigger - Apple circular glass button */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.08] border border-white/[0.1] text-white/90 hover:text-white md:hidden active:scale-95 transition-all"
              aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {open ? <IconClose className="h-4 w-4" /> : <IconMenu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Apple-style Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-black/95 pt-20 px-6 pb-8 overflow-y-auto md:hidden"
          >
            <div className="flex flex-col gap-1 my-auto">
              <span className="text-[11px] font-semibold text-[#86868b] tracking-wider uppercase mb-2">
                أقسام الموقع
              </span>
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className="flex items-center justify-between py-3.5 border-b border-white/[0.06] text-right text-base font-medium text-white/90 active:text-[#2997ff]"
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#86868b]">←</span>
                </button>
              ))}

              <div className="pt-6 flex flex-col gap-3">
                <button
                  onClick={() => navigateTo("contact")}
                  className="apple-pill-btn w-full !py-3 !text-sm !font-semibold shadow-md"
                >
                  <span>ابدأ مشروعك معنا</span>
                  <IconArrow className="h-4 w-4 rotate-[-45deg]" />
                </button>

                <a
                  href="https://wa.me/9647782383749"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apple-pill-btn-secondary w-full !py-3 !text-sm"
                >
                  <IconWhatsapp className="h-4 w-4 text-emerald-400" />
                  <span>تواصل عبر واتساب</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.08] text-center text-xs text-[#86868b]">
              VOXA EXHIBITION · جميع الحقوق محفوظة
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
