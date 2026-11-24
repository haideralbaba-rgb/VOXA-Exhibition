import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { VoxaMark, IconMenu, IconClose, IconArrow } from "./icons";
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
      className={`flex items-center gap-2.5 text-white transition-opacity hover:opacity-80 ${className}`}
      aria-label="VOXA"
    >
      <VoxaMark className="h-6 w-auto shrink-0 text-white" />
      <span className="font-display text-xl font-bold tracking-[0.16em]" dir="ltr">
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
    setScrolled(y > 30);
  });

  const navigateTo = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 300 : 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-black/75 backdrop-blur-2xl border-b border-white/[0.08] py-3"
            : "bg-transparent py-4 md:py-5"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 md:px-8">
          <Logo />

          {/* Desktop Apple-style navigation links */}
          <nav className="hidden items-center gap-8 md:flex">
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

          {/* Apple-style Action Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo("contact")}
              className="apple-pill-btn !py-1.5 !px-4 !text-xs !font-semibold shadow-sm"
            >
              <span>تواصل معنا</span>
              <IconArrow className="h-3.5 w-3.5 rotate-[-45deg]" />
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setOpen(!open)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 hover:text-white md:hidden"
              aria-label="القائمة"
            >
              {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Apple-style Mobile Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-0 z-40 flex flex-col bg-black/95 pt-20 px-8 pb-10 backdrop-blur-2xl md:hidden"
          >
            <div className="flex flex-col gap-6 mt-4">
              {navLinks.map((link, idx) => (
                <button
                  key={link.id}
                  onClick={() => navigateTo(link.id)}
                  className="flex items-center justify-between border-b border-white/[0.06] pb-4 text-right text-lg font-medium text-white/90"
                  style={{ animationDelay: `${idx * 40}ms` }}
                >
                  <span>{link.label}</span>
                  <span className="text-xs text-[#86868b]">→</span>
                </button>
              ))}
              <button
                onClick={() => navigateTo("contact")}
                className="apple-pill-btn mt-4 w-full !py-3.5 !text-sm"
              >
                <span>ابدأ مشروعك الآن</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
