import { useCallback, useEffect, useRef, useState } from "react";

type AudioWindow = Window & { webkitAudioContext?: typeof AudioContext };

export default function SoundExperience() {
  const [enabled, setEnabled] = useState(false);
  const contextRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<number | null>(null);

  // تهيئة Web Audio للنقرات وسحبات الانتقال السريعة
  const getAudio = useCallback(() => {
    if (contextRef.current) return contextRef.current;
    const AudioContextClass = window.AudioContext || (window as AudioWindow).webkitAudioContext;
    if (!AudioContextClass) return null;
    const context = new AudioContextClass();
    const master = context.createGain();
    master.gain.value = 0.28; // مستوى صوت ناعم وهادئ
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

  // نبضات خفيفة للانتقالات (Subtle Whooshes): سحبة هواء ناعمة وقصيرة (< 0.3s)
  const playWhoosh = useCallback(() => {
    const context = getAudio();
    const master = masterRef.current;
    if (!context || !master) return;
    if (context.state === "suspended") void context.resume();
    const now = context.currentTime;

    const bufferSize = Math.floor(context.sampleRate * 0.28);
    const buffer = context.createBuffer(1, bufferSize, context.sampleRate);
    const channelData = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      channelData[i] = (Math.random() * 2 - 1) * Math.sin((Math.PI * i) / bufferSize);
    }
    const noise = context.createBufferSource();
    noise.buffer = buffer;

    const filter = context.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(320, now);
    filter.frequency.exponentialRampToValueAtTime(1100, now + 0.11);
    filter.frequency.exponentialRampToValueAtTime(260, now + 0.26);
    filter.Q.value = 1.3;

    const noiseGain = context.createGain();
    noiseGain.gain.setValueAtTime(0.0001, now);
    noiseGain.gain.linearRampToValueAtTime(0.03, now + 0.09);
    noiseGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.27);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start(now);

    const tone = context.createOscillator();
    const toneGain = context.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(150, now);
    tone.frequency.exponentialRampToValueAtTime(380, now + 0.1);
    tone.frequency.exponentialRampToValueAtTime(120, now + 0.26);

    toneGain.gain.setValueAtTime(0.0001, now);
    toneGain.gain.linearRampToValueAtTime(0.02, now + 0.08);
    toneGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

    tone.connect(toneGain);
    toneGain.connect(master);
    tone.start(now);
    tone.stop(now + 0.27);
  }, [getAudio]);

  // تشغيل الموسيقى السينمائية المحيطية الجديدة عبر ملف الصوت المتقن
  const startMusic = useCallback(() => {
    if (!bgAudioRef.current) {
      const audio = new Audio("/audio/ambient.mp3");
      audio.loop = true;
      audio.volume = 0;
      bgAudioRef.current = audio;
    }
    const audio = bgAudioRef.current;
    audio.play().catch(() => {
      /* ignore autoplay rejection until user gesture */
    });

    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    // تدرج صوتي ناعم في البداية (fade in) حتى مستوى 0.22 الهادئ
    fadeIntervalRef.current = window.setInterval(() => {
      if (audio.volume < 0.22) {
        audio.volume = Math.min(0.22, audio.volume + 0.02);
      } else {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
      }
    }, 100);
  }, []);

  const stopMusic = useCallback(() => {
    const audio = bgAudioRef.current;
    if (!audio) return;
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    // تدرج صوتي سريع للإغلاق (fade out)
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

      const whooshTrigger = target.closest(
        "[data-cursor='عرض'], [data-cursor='معاينة'], [data-cursor='تشغيل'], [data-cursor='ريل'], [data-cursor='إغلاق'], [data-sound='whoosh'], [role='tab']"
      );
      if (whooshTrigger) {
        playWhoosh();
        return;
      }

      const interactive = target.closest("button, a, [role='button'], [data-cursor], .cursor-pointer");
      if (interactive) {
        playClick();
      }
    };

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
    <div data-sound-control className="fixed bottom-5 end-5 z-[80]">
      {/* زر مدمج وصغير جداً وأنيق (Micro Sound Toggle) */}
      <button
        type="button"
        onClick={toggleSound}
        aria-pressed={enabled}
        aria-label={enabled ? "إيقاف المؤثرات الصوتية والموسيقى" : "تشغيل المؤثرات الصوتية والموسيقى"}
        title={enabled ? "إيقاف الصوت" : "تشغيل الصوت"}
        className={`group relative flex h-10 items-center gap-2 rounded-full border px-3 py-1.5 shadow-xl backdrop-blur-xl transition-all duration-300 ${
          enabled
            ? "border-lime/40 bg-black/85 text-lime shadow-lime/10"
            : "border-white/15 bg-black/70 text-white/60 hover:border-white/30 hover:text-white"
        }`}
      >
        {/* أيقونة الموجات الصوتية المصغرة أو مكبر الصوت المكتوم */}
        {enabled ? (
          <span className="flex items-center gap-0.5" aria-hidden="true">
            <span className="h-3 w-0.5 animate-[pulse_0.8s_ease-in-out_infinite] rounded-full bg-lime" />
            <span className="h-4.5 w-0.5 animate-[pulse_0.6s_ease-in-out_infinite_0.15s] rounded-full bg-lime" />
            <span className="h-2.5 w-0.5 animate-[pulse_0.9s_ease-in-out_infinite_0.3s] rounded-full bg-lime" />
          </span>
        ) : (
          <svg
            className="h-4 w-4 transition-transform group-hover:scale-110"
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

        <span className="font-display text-[11px] font-bold tracking-wider">
          {enabled ? "SOUND ON" : "SOUND OFF"}
        </span>

        {/* نقطة ضوئية نابضة عند تفعيل الصوت */}
        {enabled && (
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
          </span>
        )}
      </button>
    </div>
  );
}
