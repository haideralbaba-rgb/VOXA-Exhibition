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
    master.gain.value = 0.32; // مستوى صوت ناعم وهادئ جداً
    master.connect(context.destination);
    contextRef.current = context;
    masterRef.current = master;
    return context;
  }, []);

  // نقرات دقيقة للتفاعل (Soft UI Clicks / Pops): لمسة ناعمة مثل قطرة ماء دقيقة
  const playClick = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;

    const osc = context.createOscillator();
    const gain = context.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(620, now);
    osc.frequency.exponentialRampToValueAtTime(360, now + 0.045);

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.042, now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);

    osc.connect(gain);
    gain.connect(master);
    osc.start(now);
    osc.stop(now + 0.06);
  }, [getAudio]);

  // نبضات خفيفة للانتقالات (Subtle Whooshes / Swishes): سحبة هواء ناعمة وقصيرة (< 0.35s)
  const playWhoosh = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;

    // طبقة هواء ناعمة مبنية على نويز مفلتر بحزمة ترددية متحركة
    const bufferSize = Math.floor(context.sampleRate * 0.3);
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / bufferSize);
    }
    const noise = context.createBufferSource();
    noise.buffer = buffer;

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(340, now);
    filter.frequency.exponentialRampToValueAtTime(1150, now + 0.12);
    filter.frequency.exponentialRampToValueAtTime(260, now + 0.28);
    filter.Q.value = 1.3;

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.034, now + 0.1);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.29);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);

    // نغمة داعمة هادئة تعطي إحساساً بالانتقال السلس
    const tone = context.createOscillator();
    const toneGain = context.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(160, now);
    tone.frequency.exponentialRampToValueAtTime(420, now + 0.11);
    tone.frequency.exponentialRampToValueAtTime(130, now + 0.28);

    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.022, now + 0.09);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

    tone.connect(toneGain);
    toneGain.connect(master);
    tone.start(now);
    tone.stop(now + 0.29);
  }, [getAudio]);

  // أجواء إلكترونية هادئة (Ambient / Minimal Synth): طبقة صوتية خفيفة ومكتومة (Low-pass)
  const startPad = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master || padRef.current) return;
    if (context.state === "suspended") void context.resume();

    const gain = context.createGain();
    gain.gain.setValueAtTime(0.0001, context.currentTime);
    gain.gain.setTargetAtTime(0.022, context.currentTime, 2.4);

    const lowpass = context.createBiquadFilter();
    lowpass.type = "lowpass";
    lowpass.frequency.value = 320; // صوت مكتوم دافئ بدون أي حدّة

    gain.connect(lowpass);
    lowpass.connect(master);

    const freqs = [110, 164.81]; // وتر خماسي هادئ (A2 + E3)
    const oscillators = freqs.map((frequency) => {
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
    pad.gain.gain.setTargetAtTime(0.0001, context.currentTime, 0.3);
    window.setTimeout(() => {
      pad.oscillators.forEach((oscillator) => {
        try { oscillator.stop(); } catch { /* ignore */ }
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

      // سحبة Whoosh عند فتح بطاقة مشروع، ريل، نافذة منبثقة، أو تبديل فلتر
      const whooshTrigger = target.closest(
        "[data-cursor='عرض'], [data-cursor='معاينة'], [data-cursor='تشغيل'], [data-cursor='ريل'], [data-cursor='إغلاق'], [data-sound='whoosh'], [role='tab']"
      );
      if (whooshTrigger) {
        playWhoosh();
        return;
      }

      // نقرة دقيقة Soft Click عند الضغط على الأزرار والتفاعلات العادية
      const interactive = target.closest("button, a, [role='button'], [data-cursor], .cursor-pointer");
      if (interactive) {
        playClick();
      }
    };

    // الاستماع لأي أحداث صوتية مخصصة من المكونات
    const handleCustomSound = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      if (detail === "whoosh") playWhoosh();
      else if (detail === "click") playClick();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("voxa:sound", handleCustomSound);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("voxa:sound", handleCustomSound);
    };
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
      <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/80 p-1.5 ps-3 shadow-2xl backdrop-blur-xl">
        <span className="text-[10px] font-bold tracking-[0.16em] text-white/55" dir="ltr">SOUND</span>
        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={enabled}
          aria-label={enabled ? "إيقاف المؤثرات الصوتية" : "تشغيل المؤثرات الصوتية"}
          className={`flex h-10 items-center gap-2 rounded-full px-3.5 font-display text-xs font-black transition-colors ${
            enabled ? "bg-lime text-black shadow-md shadow-lime/20" : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <span className={`h-2 w-2 rounded-full transition-transform ${enabled ? "bg-black scale-110" : "bg-white/45"}`} />
          {enabled ? "الصوت يعمل" : "الصوت مغلق"}
        </button>
        {enabled && (
          <button
            type="button"
            onClick={() => setAmbient((value) => !value)}
            aria-pressed={ambient}
            aria-label={ambient ? "إيقاف الخلفية الموسيقية الهادئة" : "تشغيل الخلفية الموسيقية الهادئة"}
            className="rounded-full px-2.5 py-2 text-[10px] font-bold text-white/65 transition-colors hover:text-white"
          >
            {ambient ? "AMBIENT ON" : "AMBIENT OFF"}
          </button>
        )}
      </div>
    </div>
  );
}
