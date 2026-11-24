import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";

const statement =
  "نحن لا نلتقط الصور فقط... بل نصنع لحظات بصرية تُشاهَد وتُحفظ في الذاكرة. كل إطار وكل فكرة تبدأ بسؤال واحد: كيف نمنح علامتك الحضور الذي تستحقه وتتوقّف عنده العين؟";

const words = statement.split(" ");
const highlightIndices = new Set([6, 7, 8, 9, 21, 22, 23, 24]);

function Word({
  w,
  i,
  total,
  p,
  highlight,
}: {
  w: string;
  i: number;
  total: number;
  p: MotionValue<number>;
  highlight: boolean;
}) {
  const start = i / total;
  const end = start + 1.2 / total;
  const opacity = useTransform(p, [start, Math.min(end, 1)], [0.25, 1]);
  const y = useTransform(p, [start, Math.min(end, 1)], [4, 0]);

  return (
    <motion.span
      style={{ opacity, y }}
      className={`inline-block transition-colors ${
        highlight ? "text-white font-bold" : "text-[#86868b]"
      }`}
    >
      {w}&nbsp;
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.4"],
  });

  return (
    <section id="about" className="relative py-16 sm:py-28 md:py-36 bg-[#000000] text-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
        <div className="apple-badge mb-4 sm:mb-6 mx-auto">
          <span className="text-[#2997ff]">✦</span>
          <span>فلسفة الاستوديو</span>
        </div>

        <p
          ref={ref}
          className="font-display text-xl sm:text-3xl md:text-5xl font-semibold leading-[1.5] sm:leading-[1.4] tracking-tight"
        >
          {words.map((w, i) => (
            <Word
              key={i}
              w={w}
              i={i}
              total={words.length}
              p={scrollYProgress}
              highlight={highlightIndices.has(i)}
            />
          ))}
        </p>
      </div>
    </section>
  );
}
