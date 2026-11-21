import { useCallback, useEffect, useState } from 'react'
import { getRegistrations, getSummary, usingSampleData } from '../api/index.js'
import useDebounce from '../hooks/useDebounce.js'
import KpiCards from '../components/KpiCards.jsx'
import RegistrationFilters from '../components/RegistrationFilters.jsx'
import RegistrationTable from '../components/RegistrationTable.jsx'
import Pagination from '../components/Pagination.jsx'

// This page OWNS the state (filters, page, data, loading, error) and passes it down as props,
// so every child stays a simple, reusable component.
export default function RegistrationsPage() {
  // Filters + paging
  const [search, setSearch] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const debouncedSearch = useDebounce(search, 400)

  // Registrations
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Summary (KPI cards)
  const [summary, setSummary] = useState(null)
  const [summaryLoading, setSummaryLoading] = useState(true)
  const [summaryError, setSummaryError] = useState('')

  const loadSummary = useCallback(() => {
    setSummaryLoading(true)
    setSummaryError('')
    getSummary()
      .then(setSummary)
      .catch((e) => setSummaryError(e.message))
      .finally(() => setSummaryLoading(false))
  }, [])

  useEffect(() => { loadSummary() }, [loadSummary])

  // Re-fetch whenever a filter, the page or the page size changes.
  const [reloadKey, setReloadKey] = useState(0)
  useEffect(() => {
    let cancelled = false // ignore out-of-date responses (e.g. fast typing)
    setLoading(true)
    setError('')
    getRegistrations({ participantName: debouncedSearch, type, status, page, pageSize })
      .then((result) => { if (!cancelled) setData(result) })
      .catch((e) => { if (!cancelled) setError(e.message) })
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [debouncedSearch, type, status, page, pageSize, reloadKey])

  // Changing any filter goes back to page 1.
  const changeSearch = (v) => { setSearch(v); setPage(1) }
  const changeType = (v) => { setType(v); setPage(1) }
  const changeStatus = (v) => { setStatus(v); setPage(1) }
  const changePageSize = (v) => { setPageSize(v); setPage(1) }
  const clearFilters = () => { setSearch(''); setType(''); setStatus(''); setPage(1) }
  const retry = () => { setReloadKey((k) => k + 1); loadSummary() }

  const hasFilters = Boolean(search || type || status)
  const items = data?.items ?? []
  const isEmpty = !loading && !error && items.length === 0

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-6 sm:px-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Car Show 2027</h1>
          <p className="text-sm text-slate-500">Registration Dashboard · Sorsogon City Coliseum</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${usingSampleData ? 'bg-amber-50 text-amber-800 ring-amber-600/30' : 'bg-emerald-50 text-emerald-800 ring-emerald-600/30'}`}>
          {usingSampleData ? 'Sample data' : 'Live API'}
        </span>
      </header>

      <KpiCards summary={summary} loading={summaryLoading} error={summaryError} onRetry={retry} />

      <section className="mt-6 rounded-xl border border-slate-200 bg-white shadow-sm" aria-labelledby="registrations-heading">
        <div className="space-y-4 p-4">
          <h2 id="registrations-heading" className="text-lg font-semibold text-slate-900">Registrations</h2>
          <RegistrationFilters
            search={search}
            type={type}
            status={status}
            onSearchChange={changeSearch}
            onTypeChange={changeType}
            onStatusChange={changeStatus}
            onClear={clearFilters}
            hasFilters={hasFilters}
          />
        </div>

        {error ? (
          <div role="alert" className="border-t border-slate-200 p-10 text-center">
            <p className="font-semibold text-red-700">Cannot reach the API…</p>
            <p className="mt-1 text-sm text-slate-600">{error}</p>
            <button onClick={retry} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
              ↻ Try again
            </button>
          </div>
        ) : isEmpty ? (
          <div className="border-t border-slate-200 p-10 text-center">
            <p className="font-semibold text-slate-800">No registrations match your filters</p>
            <p className="mt-1 text-sm text-slate-500">Try a different name, type or status.</p>
            <button onClick={clearFilters} className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2">
              ✕ Clear filters
            </button>
          </div>
        ) : (
          <>
            {loading && <p role="status" className="border-t border-slate-200 px-4 py-2 text-sm text-slate-500">Loading registrations…</p>}
            <RegistrationTable items={items} loading={loading} pageSize={pageSize} />
          </>
        )}

        {!error && !isEmpty && (
          <Pagination
            page={data?.page ?? page}
            pageSize={pageSize}
            totalCount={data?.totalCount ?? 0}
            totalPages={data?.totalPages ?? 1}
            loading={loading}
            onPageChange={setPage}
            onPageSizeChange={changePageSize}
          />
        )}
      </section>
    </div>
  )
}
