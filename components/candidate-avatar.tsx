"use client";
import { useState } from "react";
import type { CandidateData } from "@/lib/candidate-context";

export function CandidateAvatar({ candidateData, large = false }: { candidateData: CandidateData; large?: boolean }) {
  const [failedSource, setFailedSource] = useState<string | null>(null);
  return <div className={`grid shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-primary to-[#F0A2FD] font-display font-bold text-white ring-white ${large ? "mx-auto mb-[18px] size-[88px] text-[30px] shadow-[0_0_0_4px_white,0_0_0_7px_#e5dffb,0_18px_36px_-14px_#6a2be980]" : "size-[52px] text-lg shadow-[0_0_0_3px_white,0_0_0_5px_#e5dffb]"}`}>
    {candidateData.imageUrl && failedSource !== candidateData.imageUrl ? <img src={candidateData.imageUrl} alt={`${candidateData.firstName} ${candidateData.lastName}`} className="size-full object-cover" onError={() => setFailedSource(candidateData.imageUrl)} /> : `${candidateData.firstName.charAt(0)}${candidateData.lastName.charAt(0)}`.toUpperCase()}
  </div>;
}
