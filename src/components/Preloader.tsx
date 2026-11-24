import { useEffect, useState } from "react";
import { animate, motion } from "motion/react";
import { VoxaMark } from "./icons";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setProgress(v),
      onComplete: () => setTimeout(onDone, 200),
    });
    return () => controls.stop();
  }, [onDone]);

  return (
    <motion.div
      className="fixed inset-0 z-[150] flex flex-col items-center justify-center bg-black text-white"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3"
        >
          <VoxaMark className="h-10 w-auto text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.25)]" />
          <span className="font-display text-2xl font-bold tracking-[0.2em]" dir="ltr">
            VOXA
          </span>
        </motion.div>

        {/* Minimal Apple hairline progress bar */}
        <div className="h-[2px] w-44 overflow-hidden rounded-full bg-white/15">
          <motion.div
            className="h-full bg-white"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}
