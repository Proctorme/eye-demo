"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import { ArrowRight, ScanFace, SquareCheck } from "lucide-react";
import { Switch } from "@/components/ui/switch";
export type { CandidateData } from "@/lib/candidate-context";
import type { CandidateData } from "@/lib/candidate-context";

export function CandidateModal({ onSubmit }: { onSubmit: (data: CandidateData) => Promise<void> | void }) {
  const [formData, setFormData] = useState<CandidateData>({ apiKey: "", candidateId: "", assessmentId: "", firstName: "", lastName: "", imageUrl: "", enableFacialRecognition: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => setFormData(previous => ({ ...previous, [event.target.name]: event.target.value }));
  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!formData.apiKey.trim() || !formData.firstName.trim() || !formData.lastName.trim()) {
      setError("Please fill in your API key, first name and last name."); return;
    }
    setError(""); setLoading(true);
    try { await onSubmit(formData); }
    catch { setError("Unable to start the assessment. Please try again."); }
    finally { setLoading(false); }
  };
  const field = (name: Exclude<keyof CandidateData, "enableFacialRecognition">, label: string, placeholder: string, required = false, type = "text") => (
    <div className="min-w-0 space-y-2">
      <label htmlFor={name} className="block font-mono text-[11px] font-medium uppercase tracking-[.12em] text-foreground/60">{label} {required && <span className="text-primary">*</span>}</label>
      <input id={name} name={name} type={type} value={formData[name]} onChange={handleChange} placeholder={placeholder} autoComplete={name === "firstName" ? "given-name" : name === "lastName" ? "family-name" : "off"} aria-required={required} className="w-full rounded-[14px] border-[1.5px] border-border bg-[#FCFBFE] px-4 py-[13px] text-[15px] font-medium outline-none transition placeholder:font-normal placeholder:text-foreground/40 focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/8" />
    </div>
  );
  return (
    <main className="assessment-stage">
      <section className="assessment-card w-full max-w-[520px] px-[26px] py-9 sm:px-11 sm:pb-10 sm:pt-12">
        <div className="mb-9 flex items-center gap-2.5"><span className="grid size-[34px] place-items-center rounded-[11px] bg-gradient-to-br from-primary to-[#AF46E8] text-white shadow-lg shadow-primary/25"><SquareCheck size={17} /></span><span className="font-mono text-[13px] font-semibold tracking-[.06em]">EYEPROCTOR<span className="text-primary">·</span>IO</span></div>
        <h1 className="mb-2 font-display text-[clamp(30px,4.4vw,38px)] font-semibold leading-[1.08] tracking-tight">Eye demo <span className="text-primary">Assessment</span></h1>
        <p className="mb-8 text-[15px] text-foreground/60">Enter your details to begin the evaluation.</p>
        <form onSubmit={handleSubmit} className="space-y-[18px]">
          {error && <p role="alert" className="rounded-[10px] bg-[#FEB591]/30 px-3.5 py-2.5 text-[13px] font-semibold text-[#C2410C]">{error}</p>}
          {field("apiKey", "Widget API Key", "Enter your API key", true, "password")}
          <div className="grid gap-[14px] sm:grid-cols-2">{field("candidateId", "Candidate ID", "Auto-generated if blank")}{field("assessmentId", "Assessment ID", "Auto-generated if blank")}</div>
          <div className="grid gap-[14px] sm:grid-cols-2">{field("firstName", "First Name", "John", true)}{field("lastName", "Last Name", "Doe", true)}</div>
          {field("imageUrl", "Candidate Image URL", "https://example.com/image.jpg", false, "url")}
          <div className="my-[22px] flex items-center justify-between gap-3 rounded-[14px] bg-primary/8 px-4 py-3.5">
            <label htmlFor="facialRecognition" className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold"><ScanFace size={17} className="shrink-0 text-primary" />Enable Facial Recognition</label>
            <Switch id="facialRecognition" checked={formData.enableFacialRecognition} onCheckedChange={checked => setFormData(previous => ({ ...previous, enableFacialRecognition: checked }))} className="h-[26px] w-[46px] data-[state=unchecked]:bg-[#D3BBF4] [&_span]:size-5 [&_span]:data-[state=checked]:translate-x-[22px]" />
          </div>
          <button type="submit" disabled={loading} className="assessment-button w-full">{loading ? "Starting…" : "Start Quiz"}<ArrowRight size={16} /></button>
        </form>
      </section>
    </main>
  );
}
