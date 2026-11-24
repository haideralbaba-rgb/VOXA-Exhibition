import { IconFacebook, IconInstagram, IconWhatsapp } from "./icons";
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
    <footer id="contact" className="relative bg-[#000000] text-white pt-8 pb-10 sm:pt-10 sm:pb-12 overflow-hidden">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Apple Pro CTA Card */}
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[36px] md:rounded-[40px] border border-white/[0.12] bg-[#161617] p-6 sm:p-12 md:p-16 text-center">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[250px] sm:h-[350px] w-[400px] sm:w-[500px] rounded-full opacity-30 blur-[90px] sm:blur-[100px]"
            style={{
              background: "radial-gradient(circle, rgba(41, 151, 255, 0.3) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-2xl">
            <div className="apple-badge mb-4 sm:mb-6 mx-auto">
              <span className="text-[#2997ff]">✦</span>
              <span>تواصل مباشر</span>
            </div>

            <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-[1.25]">
              جاهز لصناعة
              <br />
              <span className="apple-text-gradient">عملك البصري القادم؟</span>
            </h2>

            <p className="mt-4 sm:mt-6 text-xs sm:text-base text-[#86868b] leading-relaxed px-2">
              فريق VOXA مستعد لمناقشة أفكارك وتطوير الهوية البصرية أو الحملة الإعلانية التي تليق بعلامتك.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-sm sm:max-w-none mx-auto">
              <a
                href="https://wa.me/9647782383749"
                target="_blank"
                rel="noopener noreferrer"
                className="apple-pill-btn !py-3.5 sm:!py-3 !px-7 !text-sm !font-semibold shadow-lg justify-center"
              >
                <IconWhatsapp className="h-4 w-4 text-emerald-600" />
                <span>تحدث معنا عبر واتساب</span>
              </a>

              <a
                href="mailto:voxavision@gmail.com"
                className="apple-pill-btn-secondary !py-3.5 sm:!py-3 !px-7 !text-sm justify-center"
              >
                <span dir="ltr">voxavision@gmail.com</span>
              </a>
            </div>

            {/* Social Links Pills */}
            <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-white/[0.08] bg-white/[0.04] px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs font-medium text-[#86868b] transition-all hover:bg-white/[0.1] hover:text-white"
                >
                  <Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Apple Minimalist Footer Strip */}
        <div className="mt-10 sm:mt-16 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-xs text-[#86868b]">
          <div className="flex items-center gap-2 sm:gap-3">
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
