"use client";
import { useEffect, useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import type { CandidateData } from "@/lib/candidate-context";
import { CandidateAvatar } from "./candidate-avatar";

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  candidateData: CandidateData;
  timeUsed?: number;
  onRetry: () => void;
}
export function ResultsScreen({ score, totalQuestions, candidateData, timeUsed = 0, onRetry }: ResultsScreenProps) {
  const percentage = totalQuestions > 0 ? Math.round(score / totalQuestions * 100) : 0;
  const passed = percentage >= 60;
  const [animated, setAnimated] = useState(false);
  useEffect(() => { const frame = requestAnimationFrame(() => setAnimated(true)); return () => cancelAnimationFrame(frame); }, []);
  const meta = [["Assessment ID", candidateData.assessmentId], ["Candidate ID", candidateData.candidateId], ["Time Used", `${Math.floor(timeUsed / 60)}:${String(timeUsed % 60).padStart(2, "0")}`]];
  return <main className="assessment-stage">
    <section className="assessment-card w-full max-w-[460px] px-6 pb-8 pt-11 text-center sm:px-10">
      <CandidateAvatar candidateData={candidateData} large />
      <h1 className="font-display text-[26px] font-bold tracking-tight">{candidateData.firstName} {candidateData.lastName}</h1>
      <p className="mb-7 mt-1 text-sm text-foreground/60">Assessment Complete</p>
      <div className={`mb-[26px] rounded-[20px] px-6 pb-[22px] pt-[26px] ${passed ? "bg-gradient-to-br from-[#C6F15C]/35 to-[#C6F15C]/14 text-[#3D6310]" : "bg-gradient-to-br from-[#FEB591]/42 to-[#F0A2FD]/18 text-[#A83A0C]"}`}>
        <div className="relative mx-auto mb-3.5 size-32" role="img" aria-label={`Score: ${percentage} percent`}>
          <svg viewBox="0 0 128 128" className="size-32 -rotate-90" aria-hidden="true"><circle cx="64" cy="64" r="54" fill="none" stroke="rgba(27,14,68,.1)" strokeWidth="9" /><circle cx="64" cy="64" r="54" fill="none" stroke={passed ? "#4C7A12" : "#C2410C"} strokeWidth="9" strokeLinecap="round" strokeDasharray={339.292} strokeDashoffset={339.292 * (1 - (animated ? percentage : 0) / 100)} className="transition-[stroke-dashoffset] duration-[1400ms] ease-out" /></svg>
          <span className="absolute inset-0 grid place-items-center font-display text-[34px] font-bold tracking-tight text-foreground">{percentage}%</span>
        </div>
        <p className="text-[14.5px] font-bold">{score} out of {totalQuestions} correct</p>
        <span className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest ${passed ? "bg-[#C6F15C]/55" : "bg-[#FEB591]/50"}`}>{passed ? <Check size={13} /> : <X size={13} />}{passed ? "Passed" : "Did not pass"}</span>
      </div>
      <button onClick={onRetry} className="assessment-button w-full"><RotateCcw size={16} />Take Quiz Again</button>
      <dl className="mt-[26px] grid grid-cols-3 gap-3 border-t-[1.5px] border-dashed border-border pt-5 text-left">{meta.map(([label, value]) => <div key={label} className="min-w-0"><dt className="mb-[3px] font-mono text-[9.5px] uppercase tracking-[.12em] text-foreground/40">{label}</dt><dd className="break-all font-mono text-[13px] font-semibold">{value}</dd></div>)}</dl>
    </section>
  </main>;
}
