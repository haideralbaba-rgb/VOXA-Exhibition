import { useCallback, useEffect, useRef, useState } from "react";

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

export default function SoundExperience() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  const getAudio = useCallback(() => {
    if (contextRef.current) return contextRef.current;
    const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.22;
    master.connect(context.destination);
    contextRef.current = context;
    masterRef.current = master;
    return context;
  }, []);

  const playClick = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;

    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.04);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.035, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.055);
  }, [getAudio]);

  const startMusic = useCallback(() => {
    if (!bgAudioRef.current) {
      const audio = new Audio("/audio/ambient.mp3");
      audio.loop = true;
      audio.volume = 0;
      bgAudioRef.current = audio;
    }
    const audio = bgAudioRef.current;
    audio.play().catch(() => {});

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume < 0.2) {
        audio.volume = Math.min(0.2, audio.volume + 0.02);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  }, []);

  const stopMusic = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume > 0.02) {
        audio.volume = Math.max(0, audio.volume - 0.04);
      } else {
        audio.pause();
        audio.volume = 0;
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 60);
  }, []);

  const toggleSound = () => {
    if (enabled) {
      setEnabled(false);
      stopMusic();
      if (contextRef.current) void contextRef.current.suspend();
      return;
    }
    const context = getAudio();
    if (context?.state === "suspended") void context.resume();
    setEnabled(true);
    startMusic();
    playClick();
  };

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest("[data-sound-control]")) return;
      const interactive = target.closest("button, a, [role='button'], .cursor-pointer");
      if (interactive) playClick();
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [enabled, playClick]);

  useEffect(() => () => {
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (bgAudioRef.current) {
      bgAudioRef.current.pause();
      bgAudioRef.current = null;
    }
    const context = contextRef.current;
    if (context && context.state !== "closed") void context.close();
  }, []);

  return (
    <div data-sound-control className="fixed bottom-6 start-6 z-40">
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={enabled}
        aria-label={enabled ? "إيقاف الصوت المحيطي" : "تشغيل الصوت المحيطي"}
        className={`group flex items-center gap-2.5 rounded-full border px-3.5 py-2 shadow-2xl backdrop-blur-2xl transition-all duration-300 ${
          enabled
            ? "border-[#2997ff]/40 bg-[#161617]/90 text-white shadow-[#2997ff]/10"
            : "border-white/[0.08] bg-black/70 text-[#86868b] hover:border-white/20 hover:text-white"
        }`}
      >
        {enabled ? (
          <span className="flex items-center gap-0.5" aria-hidden="true">
            <span className="h-2.5 w-0.5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-full bg-[#2997ff]" />
            <span className="h-3.5 w-0.5 animate-[pulse_0.6s_ease-in-out_infinite_0.15s] rounded-full bg-[#2997ff]" />
            <span className="h-2 w-0.5 animate-[pulse_0.9s_ease-in-out_infinite_0.3s] rounded-full bg-[#2997ff]" />
          </span>
        ) : (
          <svg
            className="h-3.5 w-3.5 transition-transform group-hover:scale-110"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </svg>
        )}

        <span className="text-[11px] font-semibold tracking-wider">
          {enabled ? "صوت محيطي" : "مكتوم"}
        </span>
      </button>
    </div>
  );
}
