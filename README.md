# Car Show Registration System

Course project for **Integrative Programming 2** (CCDI Sorsogon Campus) — registration system for
**Car Show 2027** by AutoVista Events. A C# Vertical Slice API stores registrations in SQLite and a
React dashboard shows them to the event staff.

## Team

| MEMBER                | ROLE               |
| --------------------- | ------------------ |
| Diomar Mangubat       | Backend Developer  |
| Andrea Lucas David    | Frontend Developer |

## Repository layout

```
car-show-registration/
├── backend/      C# .NET 10 Vertical Slice API (Domain, Application, Infrastructure, Api)
├── frontend/     React (Vite) app
├── docs/
│   └── screenshots/
└── README.md
```

## Run the backend

Requirements: [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0).

```bash
cd backend
dotnet restore
dotnet run --project Api
```

- API: <http://localhost:5205>
- Scalar (API docs and testing): <http://localhost:5205/scalar/v1>
- The SQLite file `carshow.db` is created next to where the API is started and is seeded with 25
  sample registrations the first time. It is not committed to Git.
- CORS allows the React dev server at `http://localhost:5173`.

### Database migrations (one-time)

The API applies migrations at startup. Generate the first one with:

```bash
dotnet tool install --global dotnet-ef        # only once per computer
cd backend
dotnet ef migrations add InitialCreate --project Infrastructure --startup-project Api --output-dir Migrations
```

This creates `backend/Infrastructure/Migrations/`. Commit it. If you ran the API before this step,
delete `carshow.db` once, then start the API again so the migration creates the database.

## Run the frontend

```bash
cd frontend
npm install
npm run dev
```

The React app runs on <http://localhost:5173> and calls the API at `http://localhost:5205`.

## API endpoints

| Method | Endpoint                                    | Description                                   | Success | Errors   |
| ------ | ------------------------------------------- | --------------------------------------------- | ------- | -------- |
| POST   | `/api/registrations`                        | Make a new registration                       | 201     | 400, 409 |
| GET    | `/api/registrations`                        | List (paged), filters `type`, `status`, `participantName`, `page`, `pageSize` | 200 | 400 |
| GET    | `/api/registrations/{id}`                   | Find one registration by id                   | 200     | 404      |
| GET    | `/api/registrations/summary`                | KPI totals for the dashboard                  | 200     | —        |

Business rules (set by the server, never by the client): registration number (`CS27-0001`, …),
registration date (UTC), fee by type (Exhibitor ₱1,500 · Competitor ₱2,500 · VIP ₱5,000), status
(`Pending` on create). Payment status (`Unpaid`, `Partial`, `Paid`) is computed from the amount paid.
Enums are sent and received as strings.

Manual test scenarios (Cases 01–40) are in [`backend/Api/Api.http`](backend/Api/Api.http).

## Backend structure

```
backend/
├── Domain/           Registration entity, enums, Result<T>, fee rules
├── Application/
│   └── Features/Registrations/
│       ├── CreateRegistration/        command, handler, validator
│       ├── GetRegistrations/          query (+ response), handler, validator
│       ├── GetRegistrationById/       query, handler
│       ├── GetRegistrationSummary/    query (+ response), handler
│       └── Common/                    shared RegistrationResponse
├── Infrastructure/   AppDbContext (SQLite), Registration mapping, seed data, Migrations
└── Api/              Minimal API endpoints, ValidationFilter, ResultExtensions, Program.cs
```
