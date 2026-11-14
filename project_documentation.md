# Clinical Management System – Backend Documentation

**Project:** Clinical Management System  
**Application:** Backend API  
**Framework:** NestJS  
**Documentation Status:** Initial Development  
**Last Updated:** 14 November 2026

---

# 1. Project Overview

## 1.1 Purpose

The Clinical Management System is a personal software project intended to manage clinical operations and healthcare-related workflows through a centralized application.

The backend is responsible for handling business logic, authentication, authorization, database operations, and API communication with the frontend.

## 1.2 Application Architecture

The project follows a separate frontend and backend architecture.

- **Frontend:** Next.js
- **Backend:** NestJS
- **Database:** PostgreSQL hosted on Neon
- **ORM:** Prisma
- **Communication:** REST API

The frontend communicates with the backend through HTTP requests. The backend processes requests, applies business logic, interacts with the database, and returns responses.

## 1.3 Planned Core Modules

- Authentication
- User Management
- Role and Permission Management
- Patient Management
- Appointment Management
- Doctor Management
- Clinical Records
- Prescriptions
- Billing and Payments

These modules represent the planned scope and may evolve during development.

---

# 2. Technology Stack

| Technology | Purpose |
|---|---|
| NestJS | Backend framework |
| Node.js | JavaScript runtime |
| TypeScript | Programming language |
| Prisma | Database ORM |
| Neon | Hosted PostgreSQL database |
| PostgreSQL | Relational database |
| bcrypt | Password hashing |
| JWT | Token-based authentication |
| Next.js | Separate frontend application |
| REST API | Frontend/backend communication |

## 2.1 NestJS

NestJS provides the backend application structure.

It uses a modular architecture with controllers, services, modules, guards, middleware, and dependency injection.

## 2.2 Prisma

Prisma handles database communication and provides:

- Database schema definition
- Type-safe database queries
- Model relationships
- Database migrations
- CRUD operations

## 2.3 Neon PostgreSQL

Neon provides the hosted PostgreSQL database.

The backend connects to Neon using the database connection configuration.

Database credentials must be maintained in environment variables and must never be committed to GitHub.

## 2.4 bcrypt

bcrypt is used to hash user passwords before storing them in the database.

Plain-text passwords must never be stored.

## 2.5 JWT

JSON Web Tokens are used to authenticate users after successful login.

The backend validates tokens to identify authenticated users when accessing protected endpoints.

---

# 3. System Architecture

## 3.1 General Request Flow

1. User performs an action in the Next.js frontend.
2. Frontend sends an HTTP request to the NestJS backend.
3. NestJS receives the request through a controller.
4. Request validation is performed.
5. Controller delegates processing to the relevant service.
6. Service executes business logic.
7. Prisma communicates with PostgreSQL.
8. Backend returns an appropriate HTTP response.
9. Frontend processes and displays the response.

## 3.2 Backend Architectural Layers

### Modules
Organize application functionality into independent feature areas.

### Controllers
Handle incoming HTTP requests and return responses.

### Services
Contain business logic and coordinate application operations.

### DTOs
Define and validate incoming request data.

### Guards
Control access to protected routes.

### Prisma Service
Provides database access through Prisma Client.

---

# 4. Project Structure

**Current implementation:**

```text
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   ├── guards/
│   └── strategies/
│
├── users/
│
├── prisma/
│   └── prisma.service.ts
│
│
├── app.module.ts
└── main.ts
|
prisma/
└── schema.prisma
|
PROJECT_DOCUMENTATION.md
```


---

# 5. Database Architecture

## 5.1 Database Technology

- Database: PostgreSQL
- Hosting: Neon
- ORM: Prisma

## 5.2 Database Management

Prisma is responsible for communicating with the PostgreSQL database.

Database schema changes should be tracked through Prisma migrations.

## 5.3 Planned Database Entities

Potential entities include:

- User
- Role
- Permission
- Patient
- Doctor
- Appointment
- ClinicalRecord
- Prescription

Actual entities and relationships will be documented as the database schema develops.

---

# 6. Authentication and Authorization

## 6.1 Authentication Overview

The backend uses token-based authentication with two types of JWT tokens:

- **Access Token:** Used to authenticate requests to protected API endpoints.
- **Refresh Token:** Used to obtain a new access token when the current access token expires.

### Technologies
- bcrypt – Password hashing and verification.
- JWT – Token generation and verification.
- NestJS Guards – Protecting authenticated routes.

## 6.2 Access Token

The access token is used to authenticate API requests.

Responsibilities:
- Identify the authenticated user.
- Provide access to protected endpoints.
- Carry relevant user claims.
- Have a relatively short expiration time.

The frontend sends the access token with protected API requests using the Authorization Bearer header.

Example:

`Authorization: Bearer <access_token>`

## 6.3 Refresh Token

The refresh token is used to obtain a new access token without requiring the user to log in again.

Responsibilities:
- Maintain the authenticated session.
- Obtain new access tokens after expiration.
- Support session renewal.
- Support session invalidation when implemented.

Refresh tokens should have a longer expiration time than access tokens.

The refresh token should be stored and transmitted securely. For browser-based applications, an appropriately configured HttpOnly, Secure, SameSite cookie is generally preferable.

## 6.4 Login Flow

1. User submits email and password.
2. Auth Controller receives the login request.
3. DTO validates the input.
4. Auth Service retrieves the user from the database.
5. bcrypt compares the submitted password with the stored password hash.
6. If credentials are valid:
   - Generate an access token.
   - Generate a refresh token.
7. Return the access token and deliver the refresh token through the configured secure mechanism.
8. User is authenticated.

## 6.5 Access Token Validation Flow

1. Frontend sends an API request with the access token.
2. JWT authentication guard extracts the token.
3. Backend verifies its signature and expiration.
4. If valid, authenticated user information is attached to the request.
5. The requested controller and service execute.
6. If invalid or expired, the backend rejects the request.

## 6.6 Token Refresh Flow

1. Access token expires.
2. Frontend sends a refresh request.
3. Backend receives the refresh token.
4. Backend validates the refresh token.
5. Backend verifies the associated user and session.
6. If valid, a new access token is generated.
7. Depending on the refresh-token strategy, a new refresh token may also be generated.
8. New tokens are returned through the configured delivery mechanism.

If the refresh token is invalid, expired, revoked, or otherwise unacceptable, the refresh request is rejected and the user may need to authenticate again.

## 6.7 Logout Flow

1. User initiates logout.
2. Frontend sends a logout request.
3. Backend invalidates the refresh-token session or revokes the refresh token.
4. Refresh-token cookie is cleared if cookies are used.
5. Frontend clears its locally held access token.
6. User must authenticate again to establish a new session.

## 6.8 Token Security Considerations

- Access tokens should have short expiration times.
- Refresh tokens should have longer but limited expiration times.
- Refresh tokens should be securely stored.
- Refresh-token rotation should be considered.
- Refresh-token reuse detection should be considered.
- Logout should invalidate the relevant refresh session.
- JWT secrets must be stored in environment variables.
- Tokens must never be logged or committed to GitHub.
- Refresh endpoints must validate the refresh token independently of the access token.

**Implementation Status:** Authentication in progress. Exact token expiration settings, storage strategy, rotation, and revocation mechanisms to be documented according to the actual implementation.


# 7. API Architecture

The backend exposes REST API endpoints for frontend communication.

Proposed endpoint organization:

| Module | Example Endpoint |
|---|---|
| Authentication | POST /auth/login |
| Authentication | POST /auth/register |
| Users | GET /users |
| Patients | GET /patients |
| Appointments | GET /appointments |

These are illustrative endpoint examples. Actual routes will be recorded as they are implemented.

API responses should follow a consistent structure, including appropriate HTTP status codes and error messages.

---

# 8. Security Considerations

Security is particularly important because this application is designed around clinical workflows.

Initial security considerations:

- Password hashing using bcrypt.
- JWT signature validation.
- Authentication guards for protected endpoints.
- Role-based access control.
- Input validation using DTOs.
- Environment variable management.
- Secure database connections.
- Appropriate CORS configuration.
- Protection against unauthorized data access.
- Audit logging for sensitive operations.
- Avoid exposing sensitive information in API responses.

Patient information must not be exposed through public repositories, development logs, or unsecured test data.

---
