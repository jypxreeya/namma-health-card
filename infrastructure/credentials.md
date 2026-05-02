# System Credentials
> [!IMPORTANT]
> These credentials are for development and staging environments. Default password for all accounts is `admin123!`.

| Role | Username (Mobile/Email) | Password | Purpose |
| :--- | :--- | :--- | :--- |
| **Super Admin** | `9876543210` / `admin@nammahealth.com` | `admin123!` | Full system control & Analytics |
| **Field Manager** | `9988776655` / `ravi.manager@nammahealth.com` | `admin123!` | Regional oversight & Team management |
| **Field Executive** | `9000000001` / `executive1@nammahealth.com` | `admin123!` | Lead generation & Patient registration |
| **Receptionist** | `9000000002` / `reception1@nammahealth.com` | `admin123!` | Hospital visit check-ins & Validation |

---

### Key Data Relationships:
- **Field Manager**: Ravi Manager (linked to North Bangalore).
- **Subordinates**: Executive 1 is linked to Ravi Manager.
- **OTP Fallback**: In dev mode, any 6-digit code works for phone login.
