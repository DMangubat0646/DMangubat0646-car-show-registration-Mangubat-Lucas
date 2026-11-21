import KpiCard from './KpiCard.jsx'
import { formatNumber, formatPeso, formatPercent } from '../utils/format.js'

// Values come from GET /api/registrations/summary, never from the rows on the current page.
export default function KpiCards({ summary, loading, error, onRetry }) {
  if (error) {
    return (
      <div role="alert" className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        <span>Could not load the summary: {error}</span>
        <button onClick={onRetry} className="rounded-lg border border-red-300 bg-white px-3 py-1.5 font-medium hover:bg-red-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500">
          Try again
        </button>
      </div>
    )
  }

  const s = summary
  const rate = s && s.totalFees > 0 ? s.totalPayments / s.totalFees : 0

  const cards = [
    { label: 'Total Registrations', icon: '👥', tone: 'brand', value: s && formatNumber(s.totalRegistrations) },
    { label: 'Total Payments', icon: '₱', tone: 'green', value: s && formatPeso(s.totalPayments), hint: 'Collected' },
    { label: 'Uncollected Payments', icon: '⏳', tone: 'red', value: s && formatPeso(s.uncollectedPayments), hint: 'Still to collect' },
    { label: 'Confirmed', icon: '✔', tone: 'brand', value: s && formatNumber(s.confirmed) },
    { label: 'Checked In', icon: '🚗', tone: 'green', value: s && formatNumber(s.checkedIn) },
    { label: 'Pending / Cancelled', icon: '⚑', tone: 'amber', value: s && `${formatNumber(s.pending)} / ${formatNumber(s.cancelled)}` },
    { label: 'Collection Rate', icon: '%', tone: 'slate', value: s && formatPercent(rate), hint: 'Payments ÷ fees' },
  ]

  return (
    <section aria-label="Key figures" className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {cards.map((c) => (
        <KpiCard key={c.label} {...c} loading={loading || !s} />
      ))}
    </section>
  )
}
