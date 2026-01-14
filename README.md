# EEET2582-DevVision

## Student Information

- **Course**: EEET2582/ISYS3461 Systems Architecture and Design
- **Institute**: RMIT University
- **Student ID**: s3873792
- **Student Name**: Nguyen Phan Nam

## Project Overview

DevVision is a comprehensive job management platform designed to streamline the recruitment process for companies and job seekers. The platform enables companies to manage their profiles, post job openings, track applications, and search for qualified candidates.

## Architecture

The project follows a **microservices architecture** with clear separation of concerns:

### Backend Services (Node.js + Express)
- **auth-service**: User authentication and authorization using JWT
- **company-service**: Company profile management and logo uploads
- **job-service**: Job posting creation and application tracking
- **search-service**: Full-text search for applicant profiles

### Frontend (React + TypeScript)
- Modern React application built with Vite
- TypeScript for type safety
- TailwindCSS for styling
- Shadcn UI component library

### Infrastructure
- **Docker & Docker Compose**: Containerization and orchestration
- **Nginx**: API Gateway and reverse proxy
- **MongoDB Atlas**: Cloud database for each microservice
- **Redis**: Session management and caching

## Project Structure

```
EEET2582-DevVision/
├── job-manager-subsystem/     # Main application
│   ├── backend/
│   │   ├── auth-service/      # Authentication microservice
│   │   ├── company-service/   # Company management microservice
│   │   ├── job-service/       # Job posting microservice
│   │   ├── search-service/    # Search microservice
│   │   ├── common/            # Shared utilities and middleware
│   │   └── seed_db/           # Database seeding scripts
│   ├── frontend/              # React frontend application
│   ├── docker-compose.yml     # Container orchestration
│   └── nginx.conf             # API Gateway configuration
└── docs/                      # Project documentation
```

## Key Features

### For Companies
- User authentication and authorization
- Company profile management
- Logo and image uploads
- Job posting creation and management
- Application tracking and status updates
- Candidate search with full-text search capabilities

### For Job Seekers (Future)
- Profile creation
- Job search and filtering
- Application submission
- Application status tracking

## Technology Stack

| Component | Technology |
|-----------|------------|
| Backend Runtime | Node.js 18+ |
| Backend Framework | Express.js |
| Database | MongoDB Atlas |
| Caching | Redis |
| Frontend Framework | React 19 |
| Build Tool | Vite 7 |
| Language | TypeScript |
| Styling | TailwindCSS v3 |
| UI Components | Shadcn UI |
| Containerization | Docker |
| API Gateway | Nginx |

## Getting Started

For detailed setup instructions, please refer to the [Job Manager Subsystem README](job-manager-subsystem/README.md).

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EEET2582-DevVision/job-manager-subsystem
   ```

2. **Start backend services**
   ```bash
   docker compose up --build
   ```

3. **Start frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed the database** (optional but recommended)
   ```bash
   cd backend/seed_db
   npm install
   npm run seed
   ```

5. **Access the application**
   - Frontend: http://localhost:5173
   - API Gateway: http://localhost:8080/api

## Test Credentials

After running the seed script, you can log in with any generated email using:
- **Password**: `Test@123`

The seed script creates 10 test company accounts. Check the console output for the generated email addresses.

## Development Progress

### Completed 
- Microservices architecture setup
- Authentication service with JWT
- Company profile management
- Job posting CRUD operations
- Application tracking system
- Applicant search with full-text indexing
- Database seeding scripts
- Docker containerization
- API Gateway with Nginx

## Documentation

- [Job Manager Subsystem README](job-manager-subsystem/README.md) - Detailed setup and API documentation
- [Seed Database README](job-manager-subsystem/backend/seed_db/README.md) - Database seeding instructions

## License

This project is developed as part of the EEET2582/ISYS3461 course at RMIT University.
