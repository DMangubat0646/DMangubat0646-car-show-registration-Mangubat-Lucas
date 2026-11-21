const TYPES = ['Exhibitor', 'Competitor', 'VIP']
const STATUSES = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Confirmed', label: 'Confirmed' },
  { value: 'CheckedIn', label: 'Checked In' },
  { value: 'Cancelled', label: 'Cancelled' },
]

const control =
  'rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30'

// Controlled inputs: the parent (RegistrationsPage) owns the filter state.
export default function RegistrationFilters({ search, type, status, onSearchChange, onTypeChange, onStatusChange, onClear, hasFilters }) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex min-w-[14rem] flex-1 flex-col gap-1 text-xs font-medium text-slate-600">
        Participant
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search participant name…"
          maxLength={150}
          className={control}
        />
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
        Type
        <select value={type} onChange={(e) => onTypeChange(e.target.value)} className={control}>
          <option value="">All types</option>
          {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
        Status
        <select value={status} onChange={(e) => onStatusChange(e.target.value)} className={control}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
        </select>
      </label>

      <button
        type="button"
        onClick={onClear}
        disabled={!hasFilters}
        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-50"
      >
        ✕ Clear filters
      </button>
    </div>
  )
}
