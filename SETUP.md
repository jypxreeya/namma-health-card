# Namma Health Card System - Setup Guide (Cloud DB)

Welcome to the Namma Health Card System! We are using a shared Supabase PostgreSQL database for real-time collaboration.

## Prerequisites
- [Node.js](https://nodejs.org/) (v18+) and npm installed.
- Access to the Supabase project credentials.

## 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone <repository_url>
cd namma-health-card
```

## 2. Environment Configuration
Navigate to the `backend` directory and set up your `.env` file:
```bash
cd backend
cp .env.example .env
```
Ensure your `backend/.env` has the correct Supabase connection strings:
```env
DATABASE_URL="postgresql://postgres.hkorqkpfgncrvljdledt:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.hkorqkpfgncrvljdledt:[YOUR-PASSWORD]@aws-1-ap-northeast-1.pooler.supabase.com:5432/postgres"
```
**Make sure to replace `[YOUR-PASSWORD]` with the actual Supabase database password.**

## 3. Install Dependencies & Push Schema
Navigate to the `backend` directory, install packages, and deploy the schema to Supabase:
```bash
cd backend
npm install
npx prisma migrate deploy
npx prisma db seed
```
*(Note: Use `migrate deploy` instead of `migrate dev` when working with a shared cloud database to avoid resetting other people's data).*

## 4. Running the Application
You can now run the backend and frontend locally:
- **Backend:** `cd backend && npm run dev`
- **Frontend:** `cd frontend && npm run dev`

Alternatively, if you want to run the backend via Docker, run from the root:
```bash
docker-compose up -d backend
```

## 5. Verify Installation (Prisma Studio)
To visually inspect the cloud database tables, run:
```bash
npx prisma studio
```
This opens `http://localhost:5555`.

---

## How to find which Database Table the data is from?
If you see something on the screen and want to find the table, follow these 3 Steps:

Step 1: Find the Frontend API call
Open the .tsx file for that page (e.g., frontend/src/app/field/page.tsx). Look for api.get or useQuery.

Step 2: Find the Backend Route
Go to backend/src/modules/field/field.routes.ts. Look for the path /dashboard. It will point to a controller method.

Step 3: Check the Controller & Prisma
Open the controller (e.g., field.controller.ts). Look for the getDashboard function. You will see lines like:
- `prisma.lead.count(...)` → This data comes from the leads table.
- `prisma.patient.count(...)` → This data comes from the patients table.