import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import type { MotionValue } from "motion/react";
import { SectionLabel } from "./Reveal";

const statement =
  "أنا لا ألتقط الصور فقط، أنا أصنع لحظات تُشاهَد مرتين. كل لقطة وكل تصميم يبدأ بسؤال واحد: كيف نجعل العين تتوقّف؟";
const words = statement.split(" ");
const accent = new Set([7, 8, 9, 10, 22, 23]);

function Word({ w, i, total, p, accentWord }: { w: string; i: number; total: number; p: MotionValue<number>; accentWord: boolean }) {
  const start = i / total;
  const end = start + 1.6 / total;
  const opacity = useTransform(p, [start, Math.min(end, 1)], [0.14, 1]);
  const y = useTransform(p, [start, Math.min(end, 1)], [10, 0]);
  return (
    <motion.span style={{ opacity, y }} className={`inline-block ${accentWord ? "text-lime" : ""}`}>
      {w}&nbsp;
    </motion.span>
  );
}

export default function About() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  return (
    <section id="about" className="relative px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1500px]">
        <SectionLabel index="٠٢">من أنا</SectionLabel>

        <p
          ref={ref}
          className="font-display text-[2.1rem] leading-[1.5] font-black md:text-[4.6rem] md:leading-[1.4]"
        >
          {words.map((w, i) => (
            <Word key={i} w={w} i={i} total={words.length} p={scrollYProgress} accentWord={accent.has(i)} />
          ))}
        </p>
      </div>
    </section>
  );
}
