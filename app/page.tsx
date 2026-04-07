'use client';

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Bot,
  Camera,
  Eye,
  EyeOff,
  Globe,
  GraduationCap,
  Home as HomeIcon,
  Mic,
  Play,
  Settings as SettingsIcon,
  SlidersHorizontal,
  Sparkles,
  Square,
} from "lucide-react";
import { generateAnswer } from "./actions";

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: ((this: SpeechRecognition, ev: Event) => void) | null;
  onend: ((this: SpeechRecognition, ev: Event) => void) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => void) | null;
}

interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

type SpeechRecognitionWindow = Window & {
  webkitSpeechRecognition?: { new (): SpeechRecognition };
  SpeechRecognition?: { new (): SpeechRecognition };
};

type Theme = "sunrise" | "night";
type VoiceStyle = "female" | "male";
type ActiveTab = "home" | "settings";

type AnswerPayload = {
  text: string;
  image: string | null;
};

const STORAGE_KEYS = {
  theme: "kids_theme",
  voiceStyle: "kids_voice_style",
  speechRate: "kids_speech_rate",
  cameraEnabled: "kids_camera_enabled",
};

const MIN_RATE = 0.8;
const MAX_RATE = 2;
const QUICK_RATES = [1, 1.5, 2];

const useSpeechRecognition = (onResult: (text: string) => void) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const win = window as SpeechRecognitionWindow;
    const SpeechRecognitionCtor = win.webkitSpeechRecognition || win.SpeechRecognition;
    if (!SpeechRecognitionCtor) return;

    recognitionRef.current = new SpeechRecognitionCtor();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => setIsListening(true);
    recognitionRef.current.onend = () => setIsListening(false);
    recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
      onResult(event.results[0][0].transcript);
    };
  }, [onResult]);

  const startListening = () => {
    try {
      recognitionRef.current?.start();
    } catch (error) {
      console.error(error);
    }
  };

  const stopListening = () => recognitionRef.current?.stop();

  return { isListening, startListening, stopListening };
};

type InlineCameraProps = {
  isDark: boolean;
  enabled: boolean;
  onToggle: () => void;
};

const InlineCamera = ({ isDark, enabled, onToggle }: InlineCameraProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [cameraState, setCameraState] = useState<"loading" | "ready" | "blocked">(enabled ? "loading" : "ready");

  useEffect(() => {
    const stopStream = () => {
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    };

    if (!enabled) {
      stopStream();
      return stopStream;
    }

    let ignore = false;

    const startCamera = async () => {
      setCameraState("loading");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (ignore) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCameraState("ready");
      } catch (error) {
        console.error("Camera Error:", error);
        stopStream();
        setCameraState("blocked");
      }
    };

    startCamera();

    return () => {
      ignore = true;
      stopStream();
    };
  }, [enabled]);

  return (
    <div className={`relative h-full w-full overflow-hidden ${isDark ? "bg-slate-950" : "bg-[#d9ecff]"}`}>
      {enabled && cameraState !== "blocked" && (
        <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover [transform:scaleX(-1)]" />
      )}

      <button
        type="button"
        onClick={onToggle}
        className={`absolute right-3 top-3 z-10 inline-flex items-center gap-2 rounded-full px-3 py-2 text-xs font-semibold shadow-lg backdrop-blur md:right-4 md:top-4 ${
          enabled
            ? "bg-black/65 text-white"
            : isDark
              ? "bg-slate-800/90 text-slate-100"
              : "bg-white/90 text-slate-700"
        }`}
      >
        {enabled ? <EyeOff size={14} /> : <Eye size={14} />}
        {enabled ? "Camera Off" : "Camera On"}
      </button>

      {cameraState === "loading" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-slate-950/35 text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/25 border-t-white" />
          <p className="text-sm font-medium">Starting camera...</p>
        </div>
      )}

      {!enabled && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center ${isDark ? "text-slate-300" : "text-slate-700"}`}>
          <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${isDark ? "bg-slate-800 text-slate-200" : "bg-white/80 text-sky-700"}`}>
            <Camera size={28} />
          </div>
          <div>
            <p className="text-base font-semibold">Camera is off</p>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Turn it on anytime from the corner button.</p>
          </div>
        </div>
      )}

      {cameraState === "blocked" && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center ${isDark ? "bg-slate-950 text-slate-200" : "bg-[#f8fbff] text-slate-700"}`}>
          <div className={`flex h-16 w-16 items-center justify-center rounded-3xl ${isDark ? "bg-slate-800 text-slate-200" : "bg-sky-100 text-sky-700"}`}>
            <Camera size={28} />
          </div>
          <div>
            <p className="text-base font-semibold">Camera access unavailable</p>
            <p className={`mt-1 text-sm ${isDark ? "text-slate-400" : "text-slate-600"}`}>Allow camera permission, then use the corner button to try again.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [theme, setTheme] = useState<Theme>("sunrise");
  const [voiceStyle, setVoiceStyle] = useState<VoiceStyle>("female");
  const [speechRate, setSpeechRate] = useState(1.2);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [activeTab, setActiveTab] = useState<ActiveTab>("home");
  const [query, setQuery] = useState("");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [result, setResult] = useState<AnswerPayload | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const savedTheme = window.localStorage.getItem(STORAGE_KEYS.theme) as Theme | null;
    const savedVoice = window.localStorage.getItem(STORAGE_KEYS.voiceStyle) as VoiceStyle | null;
    const savedRate = window.localStorage.getItem(STORAGE_KEYS.speechRate);
    const savedCameraEnabled = window.localStorage.getItem(STORAGE_KEYS.cameraEnabled);

    if (savedTheme === "sunrise" || savedTheme === "night") setTheme(savedTheme);
    if (savedVoice === "female" || savedVoice === "male") setVoiceStyle(savedVoice);
    if (savedRate) {
      const rate = Number(savedRate);
      if (!Number.isNaN(rate) && rate >= MIN_RATE && rate <= MAX_RATE) setSpeechRate(rate);
    }
    if (savedCameraEnabled === "true" || savedCameraEnabled === "false") {
      setCameraEnabled(savedCameraEnabled === "true");
    }

    window.localStorage.removeItem("kids_language");
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.theme, theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.voiceStyle, voiceStyle);
  }, [voiceStyle]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.speechRate, String(speechRate));
  }, [speechRate]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEYS.cameraEnabled, String(cameraEnabled));
  }, [cameraEnabled]);

  const isDark = theme === "night";

  const palette = useMemo(
    () =>
      isDark
        ? {
            page: "bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_32%),linear-gradient(180deg,#020617_0%,#0f172a_45%,#111827_100%)] text-slate-100",
            card: "border-slate-700/80 bg-slate-900/80",
            softCard: "border-slate-700/70 bg-slate-900/60",
            muted: "text-slate-400",
            heading: "text-slate-50",
            subheading: "text-slate-300",
            pill: "bg-cyan-500/15 text-cyan-200 border border-cyan-400/25",
            accent: "from-cyan-400 to-blue-500",
            accentSolid: "bg-cyan-500 text-slate-950",
            secondaryButton: "bg-slate-800 text-slate-200",
            input: "border-slate-700 bg-slate-950/80 text-slate-100 placeholder:text-slate-500",
            answerPanel: "border-slate-700 bg-slate-950/85 text-slate-200",
            visualPanel: "border-slate-700 bg-slate-950",
            nav: "border-slate-700 bg-slate-900/90",
          }
        : {
            page: "bg-[radial-gradient(circle_at_top,_rgba(125,211,252,0.45),_transparent_30%),linear-gradient(180deg,#f7fcff_0%,#eef8ff_55%,#fff6e8_100%)] text-slate-900",
            card: "border-white/70 bg-white/85",
            softCard: "border-sky-100 bg-white/75",
            muted: "text-slate-600",
            heading: "text-slate-900",
            subheading: "text-slate-700",
            pill: "bg-sky-100 text-sky-700 border border-sky-200",
            accent: "from-sky-500 via-cyan-500 to-emerald-400",
            accentSolid: "bg-sky-500 text-white",
            secondaryButton: "bg-sky-50 text-slate-700",
            input: "border-sky-100 bg-white text-slate-700 placeholder:text-slate-400",
            answerPanel: "border-sky-100 bg-white text-slate-800",
            visualPanel: "border-sky-100 bg-[#f8fbff]",
            nav: "border-white/80 bg-white/90",
          },
    [isDark]
  );

  const labels = useMemo(
    () => ({
      askQuestion: "Ask Your Question",
      voiceCamera: "Voice + Camera",
      speakQuestion: "Speak Question",
      stopListening: "Stop Listening",
      typeQuestion: "Type your question...",
      ask: "Ask",
      lastQuestion: "Last question",
      answerVisual: "AI Answer & Visual",
      ready: "Ready",
      thinking: "Thinking...",
      answerPlaceholder: "Answer will appear here after you ask a question.",
      playAnswer: "Play AI Answer",
      stopAnswer: "Stop AI Answer",
    }),
    []
  );

  const onSpeechResult = (text: string) => {
    setQuery(text);
    setTypedQuestion(text);
    processInput(text);
  };

  const { isListening, startListening, stopListening } = useSpeechRecognition(onSpeechResult);

  const pickVoice = (voices: SpeechSynthesisVoice[]) => {
    const englishVoices = voices.filter((voice) => voice.lang.toLowerCase().startsWith("en"));
    const pool = englishVoices.length > 0 ? englishVoices : voices;
    const hints = voiceStyle === "female" ? ["female", "zira", "samantha", "aria"] : ["male", "david", "alex", "mark"];
    const picked = pool.find((voice) => hints.some((hint) => voice.name.toLowerCase().includes(hint)));
    return picked ?? pool[0] ?? null;
  };

  const speak = (text: string) => {
    if (typeof window === "undefined") return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = speechRate;
    utterance.pitch = voiceStyle === "female" ? 1.08 : 0.96;
    const voice = pickVoice(window.speechSynthesis.getVoices());
    if (voice) utterance.voice = voice;
    utterance.onstart = () => setAiSpeaking(true);
    utterance.onend = () => setAiSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const processInput = async (input: string) => {
    const cleaned = input.trim();
    if (!cleaned) return;
    setIsLoading(true);
    if (typeof window !== "undefined") window.speechSynthesis.cancel();
    try {
      const data = await generateAnswer(cleaned, "en");
      setResult(data);
      speak(data.text);
    } catch (error) {
      console.error(error);
      setResult({ text: "Error connecting to service.", image: null });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSpeech = () => {
    if (typeof window === "undefined") return;
    if (aiSpeaking) {
      window.speechSynthesis.cancel();
      setAiSpeaking(false);
      return;
    }
    if (result?.text) speak(result.text);
  };

  const submitTypedQuestion = () => {
    const input = typedQuestion.trim();
    if (!input) return;
    setQuery(input);
    processInput(input);
    setTypedQuestion("");
  };

  return (
    <main className={`min-h-screen px-4 pb-28 pt-5 md:px-8 md:pb-10 md:pt-8 ${palette.page}`}>
      <div className="mx-auto w-full max-w-[560px] md:max-w-[1120px]">
        <header className={`rounded-[2rem] border px-4 py-4 shadow-[0_22px_60px_rgba(15,23,42,0.12)] backdrop-blur md:px-7 md:py-6 ${palette.card}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3 md:gap-4">
              <div className={`flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-gradient-to-br ${palette.accent} text-white shadow-lg md:h-16 md:w-16`}>
                <GraduationCap size={26} />
              </div>
              <div>
                <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${palette.pill}`}>
                  <Sparkles size={14} />
                  Friendly AI Learning Assistant
                </div>
                <h1 className={`mt-3 text-[1.8rem] font-semibold leading-none tracking-tight md:text-4xl ${palette.heading}`}>Mohammed Buhari Ijaz</h1>
                <p className={`mt-2 text-sm font-medium md:text-xl ${palette.subheading}`}>Second Year - Department of EEE</p>
                <p className={`mt-1 text-xs uppercase tracking-[0.18em] md:text-sm ${palette.muted}`}>DR MGR Educational and Research Institute</p>
              </div>
            </div>
            <button className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full shadow-sm md:h-14 md:w-14 ${palette.secondaryButton}`}>
              <Bell size={18} />
            </button>
          </div>

          <div className="mt-5 hidden grid-cols-2 gap-3 md:grid">
            <button
              onClick={() => setActiveTab("home")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeTab === "home" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${activeTab === "settings" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
            >
              Settings
            </button>
          </div>
        </header>

        {activeTab === "home" && (
          <div className="mt-5 grid grid-cols-1 gap-5 md:mt-7 md:grid-cols-2 md:items-start md:gap-6">
            <section className={`overflow-hidden rounded-[2rem] border shadow-[0_18px_48px_rgba(14,165,233,0.12)] backdrop-blur ${palette.card}`}>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Camera size={22} className="text-sky-500" />
                  <h2 className="text-[1.4rem] font-semibold tracking-tight md:text-2xl">{labels.askQuestion}</h2>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold md:text-sm ${palette.pill}`}>{labels.voiceCamera}</span>
              </div>
              <div className={`h-px ${isDark ? "bg-slate-700/80" : "bg-sky-100"}`} />

              <div className="p-4">
                <div className={`relative aspect-[4/3] overflow-hidden rounded-[1.75rem] border ${isDark ? "border-slate-700 bg-slate-950" : "border-sky-100 bg-white"}`}>
                  <InlineCamera isDark={isDark} enabled={cameraEnabled} onToggle={() => setCameraEnabled((current) => !current)} />
                  <div className="absolute left-3 top-3 flex items-center gap-2 rounded-full bg-slate-900/65 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white md:left-4 md:top-4 md:text-sm">
                    <span className={`h-2.5 w-2.5 rounded-full ${isListening ? "animate-pulse bg-rose-500" : cameraEnabled ? "bg-emerald-400" : "bg-amber-400"}`} />
                    {isListening ? "Listening" : cameraEnabled ? "Live" : "Camera Off"}
                  </div>

                  <button
                    onClick={isListening ? stopListening : startListening}
                    className={`absolute bottom-4 left-1/2 flex w-[78%] min-w-[220px] -translate-x-1/2 items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-semibold text-white shadow-xl transition-transform active:scale-95 md:bottom-5 md:w-auto md:min-w-0 md:px-7 md:text-lg ${
                      isListening ? "bg-gradient-to-r from-rose-500 to-red-500" : `bg-gradient-to-r ${palette.accent}`
                    }`}
                  >
                    {isListening ? <Square size={18} fill="currentColor" /> : <Mic size={20} />}
                    {isListening ? labels.stopListening : labels.speakQuestion}
                  </button>
                </div>

                <div className={`mt-4 space-y-3 rounded-[1.75rem] border px-4 py-4 ${palette.softCard}`}>
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className={`text-sm font-semibold ${palette.heading}`}>Type or talk naturally</p>
                      <p className={`text-sm ${palette.muted}`}>Short questions work best for faster answers.</p>
                    </div>
                    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${palette.pill}`}>English only</div>
                  </div>

                  <textarea
                    value={typedQuestion}
                    onChange={(event) => setTypedQuestion(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" && !event.shiftKey) {
                        event.preventDefault();
                        submitTypedQuestion();
                      }
                    }}
                    placeholder={labels.typeQuestion}
                    className={`min-h-[96px] w-full resize-none rounded-[1.35rem] border px-4 py-3 text-base outline-none ring-sky-500/30 focus:ring-4 ${palette.input}`}
                  />
                  <div className="flex items-center justify-between gap-3">
                    <p className={`truncate text-sm ${palette.muted}`}>
                      {query ? `${labels.lastQuestion}: ${query}` : "You can ask by typing or using your microphone."}
                    </p>
                    <button
                      onClick={submitTypedQuestion}
                      disabled={!typedQuestion.trim() || isLoading}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold shadow-sm transition ${
                        !typedQuestion.trim() || isLoading ? "cursor-not-allowed bg-slate-300 text-slate-500" : `${palette.accentSolid}`
                      }`}
                    >
                      {labels.ask}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <section className={`overflow-hidden rounded-[2rem] border shadow-[0_18px_48px_rgba(14,165,233,0.12)] backdrop-blur ${palette.card}`}>
              <div className="flex items-center justify-between px-5 py-4">
                <div className="flex items-center gap-3">
                  <Sparkles size={22} className="text-sky-500" />
                  <h2 className="text-[1.4rem] font-semibold tracking-tight md:text-2xl">{labels.answerVisual}</h2>
                </div>
                <div className={`flex items-center gap-2 text-sm md:text-base ${palette.muted}`}>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  {labels.ready}
                </div>
              </div>
              <div className={`h-px ${isDark ? "bg-slate-700/80" : "bg-sky-100"}`} />

              <div className="space-y-4 p-4">
                <div className={`flex min-h-[240px] items-center justify-center rounded-[1.75rem] border p-4 ${palette.visualPanel}`}>
                  {isLoading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative">
                        <div className="h-14 w-14 animate-spin rounded-full border-4 border-sky-200 border-t-sky-500" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Sparkles size={15} className="text-sky-500" />
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-sky-500">{labels.thinking}</span>
                    </div>
                  ) : result?.image ? (
                    <Image src={result.image} alt="Visual Answer" width={420} height={220} className="max-h-[220px] w-auto rounded-[1.35rem] object-contain" />
                  ) : (
                    <div className={`flex flex-col items-center gap-2 ${palette.muted}`}>
                      <div className={`rounded-[1.35rem] border border-dashed px-8 py-8 ${isDark ? "border-slate-700 bg-slate-900" : "border-sky-200 bg-white"}`}>
                        <Globe size={18} />
                      </div>
                      <span className="text-sm">Visual answer area</span>
                    </div>
                  )}
                </div>

                <div className={`custom-scrollbar max-h-[220px] overflow-y-auto rounded-[1.75rem] border px-5 py-4 text-base leading-relaxed md:text-[1.05rem] ${palette.answerPanel}`}>
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600">
                      <Bot size={18} />
                    </div>
                    {result?.text ? <div className="whitespace-pre-wrap">{result.text}</div> : <p className={`italic ${palette.muted}`}>{labels.answerPlaceholder}</p>}
                  </div>
                </div>

                <button
                  onClick={toggleSpeech}
                  disabled={!result}
                  className={`flex w-full items-center justify-center gap-2 rounded-[1.5rem] border px-5 py-4 text-lg font-semibold transition active:scale-[0.99] md:text-xl ${
                    !result
                      ? "cursor-not-allowed border-slate-300 bg-slate-200 text-slate-500"
                      : aiSpeaking
                        ? "border-orange-300 bg-orange-50 text-orange-600"
                        : isDark
                          ? "border-cyan-400/40 bg-slate-950 text-cyan-300"
                          : "border-sky-200 bg-white text-sky-600"
                  }`}
                >
                  {aiSpeaking ? <Square size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
                  {aiSpeaking ? labels.stopAnswer : labels.playAnswer}
                </button>
              </div>
            </section>
          </div>
        )}

        {activeTab === "settings" && (
          <section className={`mt-5 overflow-hidden rounded-[2rem] border shadow-[0_18px_48px_rgba(14,165,233,0.12)] backdrop-blur md:mt-7 ${palette.card}`}>
            <div className="flex items-center gap-3 px-5 py-4">
              <SettingsIcon size={22} className="text-sky-500" />
              <h2 className="text-[1.4rem] font-semibold tracking-tight md:text-2xl">Settings</h2>
            </div>
            <div className={`h-px ${isDark ? "bg-slate-700/80" : "bg-sky-100"}`} />
            <div className="space-y-5 p-4">
              <div className={`rounded-[1.6rem] border p-4 ${palette.softCard}`}>
                <p className={`mb-3 text-sm font-semibold ${palette.muted}`}>Theme</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setTheme("sunrise")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${theme === "sunrise" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
                  >
                    Sunrise
                  </button>
                  <button
                    onClick={() => setTheme("night")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${theme === "night" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
                  >
                    Night
                  </button>
                </div>
              </div>

              <div className={`rounded-[1.6rem] border p-4 ${palette.softCard}`}>
                <p className={`mb-3 text-sm font-semibold ${palette.muted}`}>Voice style</p>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => setVoiceStyle("female")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${voiceStyle === "female" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
                  >
                    Female
                  </button>
                  <button
                    onClick={() => setVoiceStyle("male")}
                    className={`rounded-2xl px-4 py-3 text-sm font-semibold transition ${voiceStyle === "male" ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
                  >
                    Male
                  </button>
                </div>
              </div>

              <div className={`rounded-[1.6rem] border p-4 ${palette.softCard}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold ${palette.muted}`}>Speech speed</p>
                    <p className={`mt-1 text-lg font-semibold ${palette.heading}`}>{speechRate.toFixed(1)}x</p>
                  </div>
                  <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${palette.pill}`}>
                    <SlidersHorizontal size={14} />
                    Up to 2x
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-2">
                  {QUICK_RATES.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSpeechRate(rate)}
                      className={`rounded-2xl px-3 py-2 text-sm font-semibold transition ${
                        speechRate === rate ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton
                      }`}
                    >
                      {rate.toFixed(rate === 1 ? 0 : 1)}x
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min={MIN_RATE}
                  max={MAX_RATE}
                  step="0.1"
                  value={speechRate}
                  onChange={(event) => setSpeechRate(Number(event.target.value))}
                  className="mt-4 w-full accent-sky-500"
                />
              </div>

              <div className={`rounded-[1.6rem] border p-4 ${palette.softCard}`}>
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className={`text-sm font-semibold ${palette.muted}`}>Camera</p>
                    <p className={`mt-1 text-sm ${palette.subheading}`}>Use the live preview when needed, or switch it off for privacy.</p>
                  </div>
                  <button
                    onClick={() => setCameraEnabled((current) => !current)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${cameraEnabled ? `${palette.accentSolid} shadow-lg` : palette.secondaryButton}`}
                  >
                    {cameraEnabled ? "On" : "Off"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      <nav className={`fixed bottom-4 left-1/2 flex w-[calc(100%-2rem)] max-w-[560px] -translate-x-1/2 items-center justify-around rounded-[2rem] border p-3 shadow-[0_16px_34px_rgba(15,23,42,0.16)] backdrop-blur md:hidden ${palette.nav}`}>
        <button
          onClick={() => setActiveTab("home")}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${activeTab === "home" ? `${palette.accentSolid}` : isDark ? "text-slate-300" : "text-slate-500"}`}
        >
          <HomeIcon size={22} />
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex h-12 w-12 items-center justify-center rounded-full ${activeTab === "settings" ? `${palette.accentSolid}` : isDark ? "text-slate-300" : "text-slate-500"}`}
        >
          <SettingsIcon size={22} />
        </button>
      </nav>
    </main>
  );
}
