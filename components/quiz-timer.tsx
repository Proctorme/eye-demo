"use client";
import { useEffect, useRef, useState } from "react";
export function QuizTimer({ duration, onTimeUp }: { duration: number; onTimeUp: () => void }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const callback = useRef(onTimeUp);
  useEffect(() => { callback.current = onTimeUp; }, [onTimeUp]);
  useEffect(() => {
    const deadline = Date.now() + duration * 1000;
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (!remaining) { clearInterval(timer); callback.current(); }
    }, 250);
    return () => clearInterval(timer);
  }, [duration]);
  return <div role="timer" aria-label="Time remaining" className={`flex min-w-[132px] items-center justify-between gap-3.5 rounded-[20px] px-[26px] py-[18px] text-white shadow-[0_16px_40px_-18px_#1b0e448c] transition-colors sm:flex-col sm:justify-center sm:gap-1 ${timeLeft <= 60 ? "bg-[#B3400F]" : "bg-[#1B0E44]"}`}><span className="font-mono text-[9.5px] uppercase tracking-[.18em] text-white/50">Time Left</span><span className="font-mono text-[27px] font-semibold tracking-[.02em] tabular-nums">{String(Math.floor(timeLeft / 60)).padStart(2, "0")}:{String(timeLeft % 60).padStart(2, "0")}</span></div>;
}
