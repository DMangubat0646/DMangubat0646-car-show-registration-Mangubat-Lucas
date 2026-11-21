# Car Show 2027 – Registration Dashboard (React + Vite + Tailwind)

## Run it

```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

## Switch between sample data and the real API

All data access goes through `src/api/index.js`, which reads one setting in `frontend/.env.development`:

```env
VITE_API_BASE_URL=http://localhost:5205
VITE_USE_SAMPLE_DATA=true     # true  -> src/api/sample-data.js (no backend needed)
                              # false -> src/api/registrationsApi.js (real C# API)
```

1. Start the backend: `cd backend` then `dotnet run --project Api` (it listens on `http://localhost:5205`).
2. Set `VITE_USE_SAMPLE_DATA=false`.
3. Restart `npm run dev` (Vite only reads `.env` files at startup).

The top-right badge on the dashboard shows **Sample data** or **Live API**.
`sample-data.js` and `registrationsApi.js` export the same functions (`getRegistrations`, `getSummary`) with the same return shapes, so no component changes when switching.

## Structure

```
src/
  api/         registrationsApi.js (real fetch), sample-data.js, index.js (switch)
  hooks/       useDebounce.js (400 ms search delay)
  components/  KpiCard(s), RegistrationFilters, RegistrationTable, Pagination, StatusBadge, PaymentBadge
  pages/       RegistrationsPage.jsx (owns filter/page/data/loading/error state)
  utils/       format.js (₱ currency, dates, percent)
```

Filtering, paging and KPI totals are done by the API (query params `participantName`, `type`, `status`, `page`, `pageSize`; KPIs from `GET /api/registrations/summary`).
