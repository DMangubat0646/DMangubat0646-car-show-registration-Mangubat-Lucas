const peso = new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' })
const number = new Intl.NumberFormat('en-PH')
const dateFmt = new Intl.DateTimeFormat('en-US', {
  year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: true,
})

/** 2500 -> ₱2,500.00 */
export const formatPeso = (value) => peso.format(value ?? 0)

/** 25 -> 25 */
export const formatNumber = (value) => number.format(value ?? 0)

/** "2027-02-10T08:30:00Z" -> "Feb 10, 2027 08:30 AM" (browser local time) */
export const formatDate = (iso) => (iso ? dateFmt.format(new Date(iso)).replace(/(\d{4}), /, '$1 ') : '')

/** 0.686 -> "68.6%" */
export const formatPercent = (value) => `${(value * 100).toFixed(1)}%`
