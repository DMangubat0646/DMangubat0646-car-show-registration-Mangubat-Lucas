# Car Show Registration System

Registration system for Car Show 2027 (AutoVista Events, Sorsogon City Coliseum).
Participants register as Exhibitors, Competitors or VIPs, and event staff track
registrations and payments from a dashboard.

Course project: Integrative Programming 2 (API Backend Development), CCDI Sorsogon Campus.

## Team

| MEMBER | ROLE |
| ------ | ---- |
| Diomar Mangubat | <Backend Developer or Frontend Developer> |
| Andrea Lucas | <Backend Developer or Frontend Developer> |

## Tech Stack

| PART | TECHNOLOGY |
| ---- | ---------- |
| Backend API | C# / .NET 10, EF Core, SQLite, FluentValidation, Scalar |
| Frontend | React JS (Vite), Tailwind CSS / Bootstrap |

## Repository Layout

```
car-show-registration-Mangubat-Lucas/
├── backend/            C# Vertical Slice solution
├── frontend/           React app (Vite)
├── docs/
│   └── screenshots/    Test screenshots
└── README.md           Team, roles, how to run both apps
```

## How to Run

### Backend

Requires the .NET 10 SDK.

```bash
cd backend
dotnet run --project Api
```

The API runs at http://localhost:5205 and the Scalar API docs are at
http://localhost:5205/scalar/v1.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173, the address the API's CORS policy allows.