# Namma Health Card System - Local Setup Guide

Welcome to the Namma Health Card System! This guide outlines how to easily set up your local development environment to match the rest of the team. We use Docker to standardize the database environment and Prisma as our ORM.

## Prerequisites
- [Docker & Docker Compose](https://www.docker.com/products/docker-desktop) installed and running.
- [Node.js](https://nodejs.org/) (v18+) and npm installed.

## 1. Clone the Repository
Clone this repository to your local machine:
```bash
git clone <repository_url>
cd namma-health-card
```

## 2. Environment Configuration
Navigate to the `backend` directory and set up your `.env` file based on the provided template:
```bash
cd backend
cp .env.example .env
```
*Note: The default `.env` is pre-configured to connect to the Docker PostgreSQL instance on port `5433`.*

## 3. Spin Up the Database
Return to the root directory and spin up the Docker containers (PostgreSQL 16 and pgAdmin):
```bash
cd ..
docker-compose up -d
```
You can verify the database is running by accessing **pgAdmin** at `http://localhost:5050`
- **Email:** `admin@nammahealth.com`
- **Password:** `admin`

*(If you register the server in pgAdmin, use Host: `host.docker.internal` and Port: `5433`)*

## 4. Install Dependencies
Navigate back to the `backend` directory and install the Node packages:
```bash
cd backend
npm install
```

## 5. Migrate and Seed the Database
Apply the database schema and populate it with foundational roles, menus, permissions, and the default Super Admin user.
```bash
npx prisma migrate dev
npx prisma db seed
```

## 6. Verify Installation
To visually verify that your database is correctly structured and seeded, run:
```bash
npx prisma studio
```
This will open a browser tab at `http://localhost:5555` where you can inspect the tables.

---

## Troubleshooting & Resetting
If you ever need to completely wipe the local database and start fresh:
```bash
# This will drop the database, re-create it, run all migrations, and run the seed script.
npx prisma migrate reset
```

If Docker is having issues, you can wipe the database volume:
```bash
docker-compose down -v
docker-compose up -d
```


How to find which Database Table the data is from?
If you see something on the screen and want to find the table, follow these 3 Steps:

Step 1: Find the Frontend API call
Open the .tsx file for that page (e.g., frontend/src/app/field/page.tsx). Look for api.get or useQuery.

Example: You'll see api.get('/field/dashboard').
Step 2: Find the Backend Route
Go to backend/src/modules/field/field.routes.ts. Look for the path /dashboard. It will point to a controller method.

Example: router.get('/dashboard', controller.getDashboard).
Step 3: Check the Controller & Prisma
Open the controller (e.g., field.controller.ts). Look for the getDashboard function. You will see lines like:

prisma.lead.count(...) → This data comes from the leads table.
prisma.patient.count(...) → This data comes from the patients table.