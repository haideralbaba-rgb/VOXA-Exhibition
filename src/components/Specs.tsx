import { motion } from "motion/react";

const specs = [
  {
    value: "4K UHD",
    label: "دقة سينمائية فائقة",
    desc: "تصوير ومونتاج بدقة 4K ومعدل ٦٠ إطاراً في الثانية لضمان انسيابية سينمائية استثنائية.",
    accent: "#2997ff",
  },
  {
    value: "100%",
    label: "شغف بالتفاصيل الدقيقة",
    desc: "دراسة عميقة لكل زاوية كادر، توزيع إضاءة، وتناسق لوني يخدم هوية علامتك التجارية.",
    accent: "#ffffff",
  },
  {
    value: "+50",
    label: "مشروع بصري منجز",
    desc: "أعمال وإعلانات وتوثيقات معمارية ناجحة نالت إعجاب وتفاعل آلاف المشاهدين.",
    accent: "#2997ff",
  },
  {
    value: "Cinema Grade",
    label: "تلوين وهندسة صوتية",
    desc: "معالجة ألوان متقدمة ومؤثرات صوتية محيطية تجعل المشاهد يعيش التجربة بكامل حواسه.",
    accent: "#ffffff",
  },
];

export default function Specs() {
  return (
    <section id="specs" className="relative py-24 md:py-36 bg-[#000000] text-white">
      <div className="mx-auto max-w-6xl px-6">
        {/* Apple Section Header */}
        <div className="mb-14 md:mb-20 text-center">
          <div className="apple-badge mb-4 mx-auto">
            <span className="text-[#2997ff]">✦</span>
            <span>معايير الإنتاج</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            الأرقام تتحدث.
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm sm:text-base text-[#86868b]">
            معايير تقنية وفنية صارمة نطبقها في كل مشروع لضمان تميز علامتك التجارية.
          </p>
        </div>

        {/* 4-Column Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="apple-card p-8 flex flex-col justify-between min-h-[220px]"
            >
              <div>
                <div
                  className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight"
                  style={{ color: item.accent }}
                  dir="ltr"
                >
                  {item.value}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold text-white">
                  {item.label}
                </h3>
              </div>
              <p className="mt-4 text-xs sm:text-sm text-[#86868b] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
