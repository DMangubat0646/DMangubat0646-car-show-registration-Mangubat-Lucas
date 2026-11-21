const STYLES = {
  Pending: 'bg-amber-50 text-amber-800 ring-amber-600/30',
  Confirmed: 'bg-blue-50 text-blue-800 ring-blue-600/30',
  CheckedIn: 'bg-emerald-50 text-emerald-800 ring-emerald-600/30',
  Cancelled: 'bg-slate-100 text-slate-700 ring-slate-500/30',
}

const LABELS = { CheckedIn: 'Checked In' }

export default function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[status] ?? STYLES.Cancelled}`}>
      {LABELS[status] ?? status}
    </span>
  )
}
