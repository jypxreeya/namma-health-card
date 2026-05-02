# System Credentials

> [!IMPORTANT]
> These credentials are for development and staging environments. Default password for all accounts is `admin123!`.

| Role | Username (Mobile) | Email | Portal Link |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `9999999999` | `admin@nammahealth.com` | [Dashboard](http://localhost:3001/) |
| **Field Manager** | `9988776655` | `ravi.manager@nammahealth.com` | [FM Portal](http://localhost:3001/fm) |
| **Field Executive** | `8888888888` | `field@nammahealth.com` | [Mobile App](http://localhost:3001/) |
| **Receptionist** | `7777777777` | `reception@nammahealth.com` | [Login](http://localhost:3001/login) |

---

### Role Definitions

*   **Super Admin**: Platform owner. Manages users, roles, system-wide settings, and global analytics.
*   **Operational Admin**: Business manager. Focuses on registration approvals, membership plans, hospital partnerships, and revenue monitoring.
*   **Field Manager**: Regional supervisor. Monitors field executives, territory assignments, and regional lead funnels.
*   **Field Executive**: Frontline acquisition. Registers patients, issues cards, and manages field visits.
*   **Receptionist**: Hospital frontline. Handles patient retrieval, check-ins, card validation, and service logging.

---

### Key Data Relationships:
- **Field Manager**: Ravi Manager is linked to the **North Bangalore** region.
- **Hierarchy**: The Field Executive (`8888888888`) is directly managed by Ravi Manager.
- **Hospital**: The Receptionist (`7777777777`) is assigned to **City Multi-Specialty Hospital (Indiranagar Branch)**.
- **OTP Fallback**: In dev mode, any 6-digit code (e.g., `123456`) works for phone login.
