export function QuizProgress({ current, total }: { current: number; total: number }) {
  return <div className="rounded-2xl bg-white px-6 py-4 shadow-sm shadow-foreground/5">
    <div className="mb-2.5 flex items-baseline justify-between"><span className="text-[13.5px] font-bold">Question Progress</span><span className="font-mono text-xs text-foreground/40">{current} / {total}</span></div>
    <div role="progressbar" aria-label="Question progress" aria-valuemin={0} aria-valuemax={total} aria-valuenow={current} className="h-2 overflow-hidden rounded-full bg-[#E5DFFB]"><div className="h-full rounded-full bg-gradient-to-r from-primary to-[#AF46E8] transition-all duration-500" style={{ width: `${current / total * 100}%` }} /></div>
  </div>;
}
