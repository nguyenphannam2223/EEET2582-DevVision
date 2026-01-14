# DevVision Job Manager Subsystem

This project handles the complete job management lifecycle for the DevVision platform, including company profiles, job postings, application tracking, and candidate search.

## Tech Stack

**Backend** (Microservices):
- **Node.js**: Runtime environment.
- **Express**: Web framework.
- **MongoDB**: Database for each service.
- **Microservices**:
  - `auth-service`: Authentication (JWE), User Management.
  - `company-service`: Company Profile, Logo Uploads.
  - `job-service`: Job Posting, Applications.
  - `search-service`: Applicant Search (Full-text).
- **Common**: Shared error handling, middlewares, and utilities.

**Frontend**:
- **React**: UI Library.
- **Vite**: Build tool.
- **TypeScript**: Static typing.
- **TailwindCSS**: Utility-first CSS.
- **Shadcn UI**: Component library.

**Infrastructure**:
- **Docker & Docker Compose**: Containerization and orchestration.
- **Nginx**: API Gateway (Reverse Proxy).

## Prerequisites

- **Docker Desktop**: Enabled and running.
- **Node.js** (optional, for local dev without Docker): v18+.

## How to Run

1.  **Clone the Repository**:
    ```bash
    git clone <repository-url>
    cd EEET2582-DevVision/job-manager-subsystem
    ```

2.  **Start Services**:
    We use Docker Compose to spin up all backend services, databases, and the API gateway.
    ```bash
    docker-compose up --build
    ```
    *This may take a few minutes for the first build.*

3.  **Start Frontend**:
    Run the frontend locally for the best development experience.
    ```bash
    cd frontend
    npm install
    npm run dev
    ```
    The frontend will be available at `http://localhost:5173`.

## Test Credentials

To populate the database with test data, run the seed script:

```bash
cd backend/seed_db
npm install
npm run seed
```

After seeding, you can log in with any of the created user emails using:
- **Password**: `Test@123`

The seed script creates 10 test company accounts. Check the console output after running the seed to see the generated email addresses.

## API Documentation

The API Gateway exposes services on `http://localhost:8080/api`:

- **Auth**:
  - `POST /api/auth/signup`: Register new user.
  - `POST /api/auth/signin`: Login.
- **Company**:
  - `PUT /api/company/:id`: Update profile.
  - `POST /api/company/:id/logo`: Upload logo (multipart).
- **Jobs**:
  - `POST /api/jobs`: Create job.
  - `GET /api/jobs/company/:id`: List company jobs.
- **Search**:
  - `GET /api/search/applicants?q=keyword`: Search candidates.

## Verification

To verify the setup:

1.  **Register** a new company account at `/auth/register`.
2.  **Create a Job** via the Dashboard.
3.  **Search** for "React" or "Java" in the Candidate Search to see mock data.
