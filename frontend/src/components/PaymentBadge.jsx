// Red = Unpaid, amber = Partial, green = Paid. The text label is always shown (color is never the only cue).
const STYLES = {
  Unpaid: 'bg-red-50 text-red-800 ring-red-600/30',
  Partial: 'bg-amber-50 text-amber-800 ring-amber-600/30',
  Paid: 'bg-emerald-50 text-emerald-800 ring-emerald-600/30',
}

const ICONS = { Unpaid: '✖', Partial: '◐', Paid: '✔' }

export default function PaymentBadge({ paymentStatus }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${STYLES[paymentStatus] ?? STYLES.Unpaid}`}>
      <span aria-hidden="true">{ICONS[paymentStatus]}</span>
      {paymentStatus}
    </span>
  )
}
