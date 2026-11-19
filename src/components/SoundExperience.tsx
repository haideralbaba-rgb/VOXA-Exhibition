import { useCallback, useEffect, useRef, useState } from "react";

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

export default function SoundExperience() {
  const [enabled, setEnabled] = useState(false);
  const [ambient, setAmbient] = useState(true);
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const padRef = useRef<{ oscillators: OscillatorNode[]; gain: GainNode } | null>(null);

  const getAudio = useCallback(() => {
    if (contextRef.current) return contextRef.current;
    const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.38;
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
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(570, now);
    oscillator.frequency.exponentialRampToValueAtTime(360, now + 0.06);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.055, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.075);
    oscillator.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.08);
  }, [getAudio]);

  const playWhoosh = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const filter = context.createBiquadFilter();
    const gain = context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(150, now);
    oscillator.frequency.exponentialRampToValueAtTime(620, now + 0.15);
    oscillator.frequency.exponentialRampToValueAtTime(220, now + 0.34);
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, now);
    filter.frequency.exponentialRampToValueAtTime(2200, now + 0.16);
    filter.frequency.exponentialRampToValueAtTime(420, now + 0.36);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(0.028, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.38);
    oscillator.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    oscillator.start(now);
    oscillator.stop(now + 0.39);
  }, [getAudio]);

  const startPad = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master || padRef.current) return;
    if (context.state === "suspended") void context.resume();
    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.setTargetAtTime(0.035, context.currentTime, 2.2);
    gain.connect(master);
    const oscillators = [110, 164.81].map((frequency) => {
      const oscillator = context.createOscillator();
      oscillator.type = "sine";
      oscillator.frequency.value = frequency;
      oscillator.connect(gain);
      oscillator.start();
      return oscillator;
    });
    padRef.current = { oscillators, gain };
  }, [getAudio]);

  const stopPad = useCallback(() => {
    const pad = padRef.current;
    const context = contextRef.current;
    if (!pad || !context) return;
    pad.gain.gain.setTargetAtTime(0.0001, context.currentTime, 0.2);
    window.setTimeout(() => {
      pad.oscillators.forEach((oscillator) => {
        try { oscillator.stop(); } catch { /* already stopped */ }
      });
      pad.gain.disconnect();
      if (padRef.current === pad) padRef.current = null;
    }, 1000);
  }, []);

  const toggleSound = () => {
    if (enabled) {
      setEnabled(false);
      stopPad();
      if (contextRef.current) void contextRef.current.suspend();
      return;
    }
    const context = getAudio();
    if (context?.state === "suspended") void context.resume();
    setEnabled(true);
    if (ambient) startPad();
    playClick();
  };

  useEffect(() => {
    if (!enabled) return;
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element) || target.closest("[data-sound-control]")) return;
      const interactive = target.closest("button, a, [role='button'], [data-cursor], .cursor-pointer");
      if (!interactive) return;
      const projectSurface = target.closest("[data-cursor='عرض'], [data-cursor='معاينة'], .cursor-pointer");
      if (projectSurface) playWhoosh();
      else playClick();
    };
    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [enabled, playClick, playWhoosh]);

  useEffect(() => {
    if (!enabled) return;
    if (ambient) startPad();
    else stopPad();
  }, [ambient, enabled, startPad, stopPad]);

  useEffect(() => () => {
    const context = contextRef.current;
    if (context && context.state !== "closed") void context.close();
  }, []);

  return (
    <div data-sound-control className="fixed bottom-5 end-5 z-[80]">
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/75 p-1.5 ps-3 shadow-2xl backdrop-blur-xl">
        <span className="text-[10px] font-bold tracking-[0.16em] text-white/55" dir="ltr">SOUND</span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={enabled}
          aria-label={enabled ? "إيقاف الصوت" : "تشغيل الصوت"}
          className={`flex h-10 items-center gap-2 rounded-full px-3 font-display text-xs font-black transition-colors ${enabled ? "bg-lime text-black" : "bg-white/10 text-white hover:bg-white/20"}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${enabled ? "bg-black" : "bg-white/45"}`} />
          {enabled ? "الصوت يعمل" : "الصوت مغلق"}
        </button>
        {enabled && (
          <button
            type="button"
            onClick={() => setAmbient((value) => !value)}
            aria-pressed={ambient}
            aria-label={ambient ? "إيقاف الخلفية الصوتية" : "تشغيل الخلفية الصوتية"}
            className="rounded-full px-2 py-2 text-[10px] font-bold text-white/65 transition-colors hover:text-white"
          >
            {ambient ? "AMBIENT ON" : "AMBIENT OFF"}
          </button>
        )}
      </div>
    </div>
  );
}
