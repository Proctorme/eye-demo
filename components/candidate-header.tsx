"use client";
import type { CandidateData } from "@/lib/candidate-context";
import { CandidateAvatar } from "./candidate-avatar";
export function CandidateHeader({ candidateData }: { candidateData: CandidateData }) {
  return <div className="flex min-w-0 flex-1 items-center gap-4 rounded-[20px] bg-white px-6 py-[18px] shadow-[0_1px_2px_#1b0e440d,0_16px_40px_-20px_#6a2be933]">
    <CandidateAvatar candidateData={candidateData} />
    <div className="min-w-0"><h2 className="truncate text-base font-extrabold tracking-tight">{candidateData.firstName} {candidateData.lastName}</h2><p className="mt-0.5 truncate font-mono text-[11.5px] text-foreground/40">ID: {candidateData.candidateId}</p>{candidateData.enableFacialRecognition && <p className="mt-1.5 flex items-center gap-1.5 text-[11.5px] font-bold text-primary"><span className="size-[7px] shrink-0 rounded-full bg-primary motion-safe:animate-pulse" />Facial Recognition Enabled</p>}</div>
  </div>;
}
