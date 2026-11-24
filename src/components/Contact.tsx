import { motion } from "motion/react";
import { IconArrow, IconFacebook, IconInstagram, IconWhatsapp } from "./icons";
import { Logo } from "./Nav";
import { lenis } from "../lib/lenis";

const socials = [
  {
    label: "واتساب",
    href: "https://wa.me/9647782383749",
    Icon: IconWhatsapp,
    highlight: true,
  },
  {
    label: "إنستغرام",
    href: "https://www.instagram.com/voxa.vision?cplk=eGdmdXo5bHBjdmZl",
    Icon: IconInstagram,
    highlight: false,
  },
  {
    label: "فيسبوك",
    href: "https://www.facebook.com/share/1Jg8ThvxKq/",
    Icon: IconFacebook,
    highlight: false,
  },
];

export default function Contact() {
  const scrollToTop = () => {
    if (lenis) lenis.scrollTo(0, { duration: 1.2 });
  };

  return (
    <footer id="contact" className="relative bg-[#000000] text-white pt-10 pb-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Pro CTA Card */}
        <div className="relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/[0.12] bg-[#161617] p-8 sm:p-14 md:p-20 text-center">
          {/* Subtle ambient glow behind card */}
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[350px] w-[500px] rounded-full opacity-30 blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(41, 151, 255, 0.3) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="apple-badge mb-6 mx-auto">
              <span className="text-[#2997ff]">✦</span>
              <span>تواصل مباشر</span>
            </div>

            <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.2]">
              جاهز لصناعة
              <br />
              <span className="apple-text-gradient">عملك البصري القادم؟</span>
            </h2>

            <p className="mt-6 text-sm sm:text-lg text-[#86868b] leading-relaxed">
              فريق VOXA مستعد لمناقشة أفكارك وتطوير الهوية البصرية أو الحملة الإعلانية التي تليق بعلامتك.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://wa.me/9647782383749"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-btn !py-3 !px-7 !text-sm !font-semibold shadow-lg"
              >
                <IconWhatsapp className="h-4 w-4 text-emerald-600" />
                <span>تحدث معنا عبر واتساب</span>
              </a>

              <a
                href="mailto:voxavision@gmail.com"
                className="apple-pill-btn-secondary !py-3 !px-7 !text-sm"
              >
                <span dir="ltr">voxavision@gmail.com</span>
              </a>
            </div>

            {/* Social Links Pills */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-xs font-medium text-[#86868b] transition-all hover:bg-white/[0.1] hover:text-white"
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Apple Minimalist Footer Strip */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#86868b]">
          <div className="flex items-center gap-3">
            <Logo />
            <span>· جميع الحقوق محفوظة © {new Date().getFullYear()}</span>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={scrollToTop}
              className="text-[#86868b] hover:text-white transition-colors"
            >
              العودة للأعلى ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
