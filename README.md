# Car Show Registration System

A registration management system for **Car Show 2027** by AutoVista Events. This project was developed for **Integrative Programming 2** at CCDI Sorsogon Campus.

The system consists of a C# .NET 10 Vertical Slice API with SQLite for data storage and a React dashboard for event staff.

## Team Members

| Member             | Role               |
| ------------------ | ------------------ |
| Diomar Mangubat    | Backend Developer  |
| Andrea Lucas David | Frontend Developer |

## Repository Structure

```text
car-show-registration/
├── backend/
│   ├── Domain/
│   ├── Application/
│   ├── Infrastructure/
│   └── Api/
├── frontend/
├── docs/
│   └── screenshots/
└── README.md
```

## Requirements

- [.NET 10 SDK](https://dotnet.microsoft.com/download/dotnet/10.0)
- Node.js and npm
- Visual Studio Code (recommended)

## How to Run the Backend

Open a terminal in the project root and execute:

```bash
cd backend
dotnet restore
dotnet run --project Api
```

Backend URLs:

- API: http://localhost:5205
- Scalar API documentation: http://localhost:5205/scalar/v1

The SQLite database (`carshow.db`) is created when the API starts and is seeded with 25 sample registrations on initial setup. The database file is not committed to Git.

CORS is configured to allow the React development server at `http://localhost:5173`.

## How to Run the Frontend

Open another terminal in the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend dashboard:

http://localhost:5173

The React application connects to the backend API at `http://localhost:5205`.

See `frontend/README.md` for instructions on switching between sample data and the real API.

## Database Migrations

The API applies database migrations at startup.

To generate the initial migration, run:

```bash
dotnet tool install --global dotnet-ef
cd backend
dotnet ef migrations add InitialCreate --project Infrastructure --startup-project Api --output-dir Migrations
```

The migration files are stored in:

`backend/Infrastructure/Migrations/`

Commit migration files to Git so other developers can create the database correctly.

## API Endpoints

| Method | Endpoint                     | Description                                    | Success | Errors   |
| ------ | ---------------------------- | ---------------------------------------------- | ------- | -------- |
| POST   | `/api/registrations`         | Create a registration                          | 201     | 400, 409 |
| GET    | `/api/registrations`         | List registrations with pagination and filters | 200     | 400      |
| GET    | `/api/registrations/{id}`    | Get a registration by ID                       | 200     | 404      |
| GET    | `/api/registrations/summary` | Get dashboard KPI totals                       | 200     | -        |

### Available Registration Filters

The registration listing endpoint supports:

- `type`
- `status`
- `participantName`
- `page`
- `pageSize`

## Business Rules

The server manages the following registration information:

- Registration numbers follow the format `CS27-0001`.
- Registration dates use UTC.
- Registration fees depend on registration type:
  - Exhibitor: ₱1,500
  - Competitor: ₱2,500
  - VIP: ₱5,000
- New registrations start with `Pending` status.
- Payment statuses (`Unpaid`, `Partial`, `Paid`) are computed from the amount paid.
- Enum values are exchanged as strings.

## Manual API Testing

Manual API test scenarios (Cases 01–40) are available in:

`backend/Api/Api.http`

Use the file to test the registration endpoints and their expected responses.

## Backend Architecture

The backend follows the Vertical Slice Architecture pattern.

| Project        | Responsibility                                                           |
| -------------- | ------------------------------------------------------------------------ |
| Domain         | Registration entity, enums, result types, and fee rules                  |
| Application    | Registration commands, queries, handlers, and validators                 |
| Infrastructure | SQLite database context, entity mapping, seed data, and migrations       |
| API            | Minimal API endpoints, validation filters, and application configuration |

## Running Both Applications

For the complete system, keep both applications running in separate terminals:

1. Start the backend on port `5205`.
2. Start the frontend on port `5173`.
3. Open http://localhost:5173 in your browser.
