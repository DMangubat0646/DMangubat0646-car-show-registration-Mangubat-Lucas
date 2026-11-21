const TONES = {
  brand: 'bg-indigo-50 text-indigo-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-red-50 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
}

export default function KpiCard({ label, value, hint, icon, tone = 'brand', loading = false }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-base ${TONES[tone]}`} aria-hidden="true">
          {icon}
        </span>
      </div>
      {loading ? (
        <div className="mt-3 h-8 w-24 animate-pulse rounded bg-slate-200" aria-label="Loading" />
      ) : (
        <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 tabular-nums">{value}</p>
      )}
      {hint && <p className="mt-1 text-xs text-slate-500">{hint}</p>}
    </div>
  )
}
