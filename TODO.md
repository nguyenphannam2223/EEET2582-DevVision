# Job Manager Subsystem - Implementation To-Do List

This document outlines the tasks required to implement the Job Manager subsystem for Project DevVision, based on the `EEET2582_DevVision-JobManager-v1.1.txt` specification.

## 1. Project Setup & Architecture (Ultimo + Medium Backend)

### Backend (Microservices)
- [ ] **Infrastructure Setup**
    - [ ] Initialize a monorepo or separate repos for microservices (Node.js/Express).
    - [ ] Configure MongoDB connection (Mongoose/Native driver).
    - [ ] Set up Docker and Docker Compose (Requirement D.2.1).
    - [ ] Configure `src/config.py` (or JS/TS equivalent) for environment variables.
- [ ] **Common Module (Shared Library)**
    - [ ] Implement global error handling.
    - [ ] Create base DTO classes (Internal vs External DTOs - Req A.2.6).
    - [ ] Create base generic Repository interface (Req A.1.2).
- [ ] **Microservice Skeleton (for each service)**
    - [ ] **Layered Architecture (Req A.1.1, A.2.2)**: Setup Controller (Presentation), Service (Business), Repository (Data Access).
    - [ ] **Modular Monolith (Req A.2.1)**: Ensure clear module boundaries if multiple features are in one service.
    - [ ] **Database**: Configure separate database connections per service (Req A.3.3).

### Frontend (Micro-Frontend / Componentized)
- [ ] **Setup**
    - [ ] Initialize React/Vite project with TailwindCSS.
    - [ ] Initialize Shadcn UI and configure generic components.
    - [ ] Configure Routing.
- [ ] **Architecture Implementation**
    - [ ] **Headless UI (Req A.3.a)**: Create reusable headless logic for Tables/Lists (e.g., Job List, Applicant List).
    - [ ] **Componentization (Req A.2.a, A.2.b)**: Create component structure (separate files for JSX, Logic, Styles).
    - [ ] **API Client (Req A.2.c)**: Implement a generic REST HTTP Helper class.

## 2. Feature Implementation

### Feature Set 1: Authentication & Registration
*Scope: Company Registration & Login*

- [ ] **Registration (Simplex)**
    - [ ] [BE/FE] Implement Registration Form (Req 1.1.1): Email, Password, Country (Mandatory).
    - [ ] [BE/FE] Implement Password Strength Validation (Req 1.2.1).
    - [ ] [BE/FE] Implement Email Syntax Validation (Req 1.2.2).
- [ ] **Login (Simplex + Medium + Ultimo)**
    - [ ] [BE] Implement Basic Login (Email/Pass) (Req 2.1.1).
    - [ ] [BE] Implement JWE (Encrypted) Token Generation (Req 2.2.1).
    - [ ] [BE] Implement Token Refresh Mechanism (Access/Refresh Tokens) (Req 2.3.3).

### Feature Set 2: Company Profile
*Scope: Profile Management*

- [ ] **Profile Management**
    - [ ] [BE/FE] Implement "Upload Company Logo" (Req 3.2.1).
    - [ ] [BE] **API Provision**: Expose "Company Public Profile Data" endpoint.

### Feature Set 3: Job Management & Applications
*Scope: Job Post & Application Tracking*

- [ ] **Job Posting**
    - [ ] [BE/FE] Implement "Skill Tags" management for Job Posts (Req 4.2.1).
- [ ] **Application Management**
    - [ ] [BE/FE] Display Applications list (Pending/Archived) for a Job (Req 4.2.2).
    - [ ] [BE/FE] View Applicant's CV and Cover Letter files (Req 4.3.2).

### Feature Set 4: Applicant Search
*Scope: Searching & Filtering*

- [ ] **Search Engine**
    - [ ] [BE] **API Integration**: Create Mock Service/Data for "Applicant Profile Data".
    - [ ] [BE] Implement Full-Text Search (FTS) on Applicant data (Req 5.2.1).
    - [ ] [FE] Implement Responsive Search Page (Req 5.2.4).
- [ ] **Applicant Actions**
    - [ ] [BE/FE] Ability to mark Applicant as "Warning" or "Favorite" (Req 5.3.2).

## 3. Deployment (Medium)

- [ ] **Containerization**
    - [ ] Create `Dockerfile` for each microservice and frontend.
    - [ ] Create `docker-compose.yml` hosting components in simulated separate environments (Req D.2.1).

## 4. Documentation & Cleanup

- [ ] Write `README.md` with setup instructions.
- [ ] Verify all Selected Requirements are met.
