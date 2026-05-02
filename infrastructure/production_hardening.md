# Production Grade Infrastructure
Documentation of advanced security, performance, and stability measures implemented in the project.

## 🔒 Advanced Security (Implemented)

### 1. Authentication Strategy
- **Dual-Token Cookie System**: Uses **HttpOnly** cookies for both `accessToken` (1h) and `refreshToken` (7d).
- **Refresh Token Rotation**: Implemented in `AuthController.refresh`. Every refresh event invalidates the old refresh token and issues a new one, mitigating token theft.
- **Session Blacklisting**: Logout logic (`/api/auth/logout`) explicitly revokes the session in the database (`isRevoked: true`), ensuring the token cannot be reused.
- **CSRF Protection**: Cookies are set with `SameSite: Strict` and `Secure: true` (in production) to prevent cross-site request forgery.

### 2. Infrastructure Protection
- **Tiered Rate Limiting**: 
    - **Global**: General API protection using `express-rate-limit`.
    - **Auth-Specific**: Stricter limit (20 req / 15 min) on `/api/auth/*` to prevent brute-force attacks.
- **Security Headers**: `Helmet.js` integrated to manage CSP, HSTS, and XSS protection headers.
- **Request Validation**: Schema enforcement on all routes to prevent malformed data injection.

## 🚀 Database Performance & Optimization

### 1. Indexing Strategy
- **Primary Indexes**: Unique constraints on `email`, `mobile`, `cardNumber`, and `refreshToken`.
- **Relational Integrity**: Foreign key constraints and cascading logic managed via Prisma.
- **Connection Pooling**: Optimized for high-concurrency via pgbouncer-compatible connection strings.

### 2. Data Integrity
- **Soft Deletes**: Uses `isDeleted` flags to preserve historical data while maintaining a clean active state.
- **Audit Logging**: Every critical change is logged with a timestamp and the user ID responsible.

## 🛠️ Reliability Measures

### 1. Global Error Handling
- Centralized middleware captures all exceptions, logging them for developers while returning a user-friendly, sanitized JSON response (preventing stack-trace leaks).

### 2. Scalability
- **Modular Structure**: Features are isolated into modules (Auth, Patients, Hospital, etc.) for easy transition to microservices if needed.
- **Background Tasks (Planned)**: Integration for BullMQ/Redis for PDF generation and SMS notifications.
