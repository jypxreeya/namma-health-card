# System Technical Flows
Detailed tracing of user actions from UI to Database.

## 1. Field Executive: Lead to Registration Flow
Tracing the path of onboarding a new member.

```mermaid
sequenceDiagram
    participant FE as Field App (FE)
    participant API as Backend API
    participant DB as PostgreSQL (Prisma)
    
    FE->>API: POST /api/registration/drafts (Lead Data)
    API->>DB: prisma.draft.upsert()
    DB-->>API: Draft Record
    API-->>FE: 200 OK (Draft Saved)
    
    FE->>API: POST /api/registration/onboard (Final Data)
    API->>DB: prisma.patient.create()
    DB-->>API: Patient ID
    API->>DB: prisma.membership.create()
    API->>DB: prisma.healthCard.create()
    DB-->>API: Card Details
    API-->>FE: 201 Created (Card Generated)
```

| Action | API Endpoint | DB Tables Impacted | Data Processing |
| :--- | :--- | :--- | :--- |
| **Save Lead** | `/registration/drafts` | `Draft` | Serializes JSON form data into storage. |
| **Complete Onboarding**| `/registration/onboard` | `Patient`, `Membership`, `HealthCard` | Validates phone uniqueness, creates relations, generates unique 12-digit card number. |

---

## 2. Hospital: Patient Validation Flow
Tracing the path when a patient visits a hospital.

```mermaid
graph TD
    A[Receptionist Scans/Enters Card #] --> B(API: /api/hospital/card/validate)
    B --> C{Prisma: healthCard.findUnique}
    C -->|NotFound| D[Error: Invalid Card]
    C -->|Found| E{Check Expiry & Plan}
    E -->|Active| F[Return: Patient Profile & Benefits]
    E -->|Expired| G[Return: Renewal Required]
```

---

## 3. Analytics: Super Admin Dashboard
Tracing data aggregation.

| View | Source API | Calculation Logic | DB Source |
| :--- | :--- | :--- | :--- |
| **Total Revenue** | `/analytics/overview` | `SUM(payments.amount)` | `Payment` Table |
| **Active Members** | `/analytics/overview` | `COUNT(membership.id) WHERE status='ACTIVE'` | `Membership` Table |
| **Executive Performance**| `/analytics/executives` | `COUNT(registrations) grouped by executiveId` | `Patient` + `User` Tables |
