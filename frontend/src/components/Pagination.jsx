const PAGE_SIZES = [5, 10, 20]

// 1 … 4 5 6 … 12 — keeps the number of buttons small for long lists.
function pageNumbers(page, totalPages) {
  const pages = new Set([1, totalPages, page - 1, page, page + 1])
  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)
  const result = []
  sorted.forEach((p, i) => {
    if (i > 0 && p - sorted[i - 1] > 1) result.push('gap-' + p)
    result.push(p)
  })
  return result
}

const btn =
  'min-w-9 rounded-lg border px-3 py-1.5 text-sm font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 disabled:cursor-not-allowed disabled:opacity-40'

export default function Pagination({ page, pageSize, totalCount, totalPages, loading, onPageChange, onPageSizeChange }) {
  const from = totalCount === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(page * pageSize, totalCount)

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 px-4 py-3">
      <nav aria-label="Pagination" className="flex flex-wrap items-center gap-1">
        <button
          type="button"
          onClick={() => onPageChange(page - 1)}
          disabled={loading || page <= 1}
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
        >
          ‹ Prev
        </button>

        {pageNumbers(page, totalPages).map((p) =>
          typeof p === 'string' ? (
            <span key={p} className="px-1 text-slate-400" aria-hidden="true">…</span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onPageChange(p)}
              disabled={loading}
              aria-current={p === page ? 'page' : undefined}
              className={`${btn} ${p === page ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onPageChange(page + 1)}
          disabled={loading || page >= totalPages}
          className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-50`}
        >
          Next ›
        </button>
      </nav>

      <p className="text-sm text-slate-600" aria-live="polite">
        Showing <span className="font-semibold">{from}–{to}</span> of <span className="font-semibold">{totalCount}</span>
      </p>

      <label className="flex items-center gap-2 text-sm text-slate-600">
        Per page
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          disabled={loading}
          className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/30 disabled:opacity-50"
        >
          {PAGE_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </label>
    </div>
  )
}
