# Namma Health Card System Overview

## System Architecture Logic

The Namma Health Card System is built on a modern, decoupled architecture designed for scalability, security, and enterprise operations.

### Frontend Architecture (Next.js & React)
- **Framework:** Next.js 16+ using the App Router for fast, SEO-friendly routing and server-side rendering where applicable.
- **State Management:** Zustand is used for lightweight, fast, global state management (e.g., Auth state, Dashboard state). React Query (TanStack Query) handles server state, data fetching, caching, and background synchronization.
- **Styling:** Vanilla CSS modules paired with Tailwind CSS for rapid utility-based styling. The application follows a cohesive "Pink & Slate" luxurious brand aesthetic.
- **Role-Based Routing:** The frontend actively guards routes. Upon login, the application redirects the user to the appropriate portal (`/admin`, `/field`, `/customer`, `/hospital`) based on their authenticated role code.

### Backend Architecture (Express.js & Node.js)
- **Framework:** Express.js utilizing a Controller-Service-Route architecture pattern.
- **Database:** PostgreSQL managed via Prisma ORM for type-safe database access, robust migrations, and schema validation.
- **Authentication:** JWT (JSON Web Tokens) with a secure, stateless approach. Passwords are cryptographically hashed using `bcryptjs`. Session tracking is maintained in the database to allow token revocation and session invalidation.
- **RBAC (Role-Based Access Control):** Permissions and menus are dynamically served based on the user's role. The database schema strictly maps Users -> Roles -> Permissions/Menus.

## Role Credentials

To test the different portals, you can log in using the seeded credentials. All accounts share the same password.

**Password for all accounts:** `admin123!`

| Role / Portal | Login Email | Redirects To | Description |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `admin@nammahealth.com` | `/admin` | Full system access, dynamic menus, metrics, user management. |
| **Field Executive** | `field@nammahealth.com` | `/field` | On-the-ground lead capture, customer registration, field visit tracking. |
| **Receptionist** | `reception@nammahealth.com` | `/hospital` | Hospital portal for patient check-in, card validation, and service logging. |
| **Customer** | `customer@nammahealth.com` | `/customer` | Patient portal to view active memberships, benefits, and QR health card. |

## Project Phase Summary

The Namma Health Card System is being developed through an enterprise-grade multi-phase rollout:

1. **Phase 1: Foundational Auth & RBAC (Completed)**
   - Database schema setup (PostgreSQL + Prisma).
   - JWT Authentication, password hashing, session management.
   - Dynamic Role-Based Access Control and Menu rendering logic.
2. **Phase 2: Core User Portals (Completed)**
   - Super Admin, Field Executive, Hospital Reception, and Customer dashboards created.
   - Luxury UI/UX integration (Pink/Slate branding, Poppins typography).
3. **Phase 3: Security & Optimization (In Progress)**
   - API Rate Limiting, IP tracking, and audit logging.
   - System hardening for HIPAA/enterprise compliance.
4. **Phase 4: Operational Expansion (Upcoming)**
   - Dynamic membership plan management.
   - Advanced analytics and graphical reporting.
   - Real-time notifications and external integrations.
