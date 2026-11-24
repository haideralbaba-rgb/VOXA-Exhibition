const specs = [
  {
    value: "4K UHD",
    label: "دقة فائقة",
    desc: "تصوير ومونتاج بدقة 4K ومعدل ٦٠ إطاراً في الثانية لضمان انسيابية سينمائية استثنائية.",
    accent: "#2997ff",
  },
  {
    value: "100%",
    label: "شغف بالتفاصيل",
    desc: "دراسة عميقة لكل زاوية كادر، توزيع إضاءة، وتناسق لوني يخدم هوية علامتك التجارية.",
    accent: "#ffffff",
  },
  {
    value: "+50",
    label: "مشروع منجز",
    desc: "أعمال وإعلانات وتوثيقات معمارية ناجحة نالت إعجاب وتفاعل آلاف المشاهدين.",
    accent: "#2997ff",
  },
  {
    value: "Cinema",
    label: "تلوين وهندسة صوت",
    desc: "معالجة ألوان متقدمة ومؤثرات صوتية محيطية تجعل المشاهد يعيش التجربة بكامل حواسه.",
    accent: "#ffffff",
  },
];

export default function Specs() {
  return (
    <section id="specs" className="relative py-16 sm:py-24 md:py-32 bg-[#000000] text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Apple Section Header */}
        <div className="mb-10 sm:mb-16 text-center">
          <div className="apple-badge mb-3 sm:mb-4 mx-auto">
            <span className="text-[#2997ff]">✦</span>
            <span>معايير الإنتاج</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            الأرقام تتحدث.
          </h2>
          <p className="mx-auto mt-2 sm:mt-3 max-w-lg text-xs sm:text-sm md:text-base text-[#86868b] px-2">
            معايير تقنية وفنية صارمة نطبقها في كل مشروع لضمان تميز علامتك التجارية.
          </p>
        </div>

        {/* 2-column on mobile, 4-column on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {specs.map((item, idx) => (
            <div
              key={idx}
              className="apple-card p-4 sm:p-7 flex flex-col justify-between min-h-0 sm:min-h-[200px]"
            >
              <div>
                <div
                  className="font-display text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight"
                  style={{ color: item.accent }}
                  dir="ltr"
                >
                  {item.value}
                </div>
                <h3 className="mt-2 sm:mt-3 font-display text-sm sm:text-base md:text-lg font-bold text-white">
                  {item.label}
                </h3>
              </div>
              <p className="mt-2 sm:mt-3 text-[11px] sm:text-xs text-[#86868b] leading-relaxed hidden sm:block">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
