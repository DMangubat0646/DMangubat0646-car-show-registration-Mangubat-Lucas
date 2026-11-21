import StatusBadge from './StatusBadge.jsx'
import PaymentBadge from './PaymentBadge.jsx'
import { formatDate, formatPeso } from '../utils/format.js'

const HEADERS = [
  { label: 'Reg. No.' },
  { label: 'Date' },
  { label: 'Participant' },
  { label: 'Car' },
  { label: 'Type' },
  { label: 'Status' },
  { label: 'Fee / Paid', right: true },
  { label: 'Payment' },
]

function SkeletonRows({ count }) {
  return Array.from({ length: count }, (_, i) => (
    <tr key={i} className="border-t border-slate-100">
      {HEADERS.map((h) => (
        <td key={h.label} className="px-4 py-3">
          <div className="h-4 w-full max-w-[7rem] animate-pulse rounded bg-slate-200" />
        </td>
      ))}
    </tr>
  ))
}

export default function RegistrationTable({ items, loading, pageSize }) {
  return (
    // overflow-x-auto: on small screens the table scrolls instead of breaking the layout.
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
          <tr>
            {HEADERS.map((h) => (
              <th key={h.label} scope="col" className={`whitespace-nowrap px-4 py-3 font-semibold ${h.right ? 'text-right' : ''}`}>
                {h.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonRows count={pageSize} />
          ) : (
            items.map((r) => (
              <tr key={r.id} className="border-t border-slate-100 hover:bg-indigo-50/40">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs font-medium text-slate-700">{r.registrationNumber}</td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-600">{formatDate(r.registrationDate)}</td>
                <td className="px-4 py-3">
                  <div className="font-medium text-slate-900">{r.participantName}</div>
                  <div className="text-xs text-slate-500">{r.contactNumber} · {r.email}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-slate-900">{r.carMakeModel}</div>
                  <div className="text-xs text-slate-500">{r.plateNumber}</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-slate-700">{r.registrationType}</td>
                <td className="whitespace-nowrap px-4 py-3"><StatusBadge status={r.status} /></td>
                <td className="whitespace-nowrap px-4 py-3 text-right tabular-nums">
                  <div className="text-slate-900">{formatPeso(r.registrationFee)}</div>
                  <div className="text-xs text-slate-500">{formatPeso(r.amountPaid)} paid</div>
                </td>
                <td className="whitespace-nowrap px-4 py-3"><PaymentBadge paymentStatus={r.paymentStatus} /></td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
