-- CreateEnum
CREATE TYPE "LeadStatus" AS ENUM ('NEW', 'CONTACTED', 'INTERESTED', 'NOT_INTERESTED', 'CONVERTED');

-- CreateEnum
CREATE TYPE "VisitType" AS ENUM ('IN_PERSON', 'CALL', 'FOLLOW_UP');

-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('PLANNED', 'COMPLETED', 'CANCELLED', 'NO_SHOW');

-- CreateEnum
CREATE TYPE "AssignmentStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- CreateTable
CREATE TABLE "leads" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_code" VARCHAR(50) NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "mobile" VARCHAR(20) NOT NULL,
    "alternate_mobile" VARCHAR(20),
    "address" TEXT,
    "area" VARCHAR(100),
    "source" VARCHAR(50),
    "lead_status" "LeadStatus" NOT NULL DEFAULT 'NEW',
    "assigned_executive_id" UUID,
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "leads_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "field_visits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "executive_id" UUID NOT NULL,
    "lead_id" UUID NOT NULL,
    "patient_id" UUID,
    "visit_date" TIMESTAMPTZ(6) NOT NULL,
    "visit_type" "VisitType" NOT NULL DEFAULT 'IN_PERSON',
    "visit_status" "VisitStatus" NOT NULL DEFAULT 'PLANNED',
    "geo_lat" DECIMAL(10,8),
    "geo_long" DECIMAL(11,8),
    "notes" TEXT,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "field_visits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lead_conversion_logs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "lead_id" UUID NOT NULL,
    "patient_id" UUID NOT NULL,
    "converted_by" UUID NOT NULL,
    "conversion_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "conversion_notes" TEXT,

    CONSTRAINT "lead_conversion_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "executive_targets" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "executive_id" UUID NOT NULL,
    "target_period" VARCHAR(50) NOT NULL,
    "target_registrations" INTEGER NOT NULL DEFAULT 0,
    "achieved_registrations" INTEGER NOT NULL DEFAULT 0,
    "target_revenue" DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    "achieved_revenue" DECIMAL(12,2) NOT NULL DEFAULT 0.0,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "executive_targets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "area_assignments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "executive_id" UUID NOT NULL,
    "area_name" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "assignment_status" "AssignmentStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "area_assignments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "leads_lead_code_key" ON "leads"("lead_code");

-- CreateIndex
CREATE INDEX "leads_mobile_idx" ON "leads"("mobile");

-- CreateIndex
CREATE INDEX "leads_lead_code_idx" ON "leads"("lead_code");

-- CreateIndex
CREATE INDEX "leads_assigned_executive_id_idx" ON "leads"("assigned_executive_id");

-- CreateIndex
CREATE INDEX "field_visits_executive_id_visit_date_idx" ON "field_visits"("executive_id", "visit_date");

-- CreateIndex
CREATE INDEX "lead_conversion_logs_lead_id_idx" ON "lead_conversion_logs"("lead_id");

-- CreateIndex
CREATE INDEX "executive_targets_executive_id_idx" ON "executive_targets"("executive_id");

-- CreateIndex
CREATE INDEX "area_assignments_executive_id_idx" ON "area_assignments"("executive_id");

-- AddForeignKey
ALTER TABLE "leads" ADD CONSTRAINT "leads_assigned_executive_id_fkey" FOREIGN KEY ("assigned_executive_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_visits" ADD CONSTRAINT "field_visits_executive_id_fkey" FOREIGN KEY ("executive_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_visits" ADD CONSTRAINT "field_visits_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "field_visits" ADD CONSTRAINT "field_visits_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_conversion_logs" ADD CONSTRAINT "lead_conversion_logs_lead_id_fkey" FOREIGN KEY ("lead_id") REFERENCES "leads"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_conversion_logs" ADD CONSTRAINT "lead_conversion_logs_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lead_conversion_logs" ADD CONSTRAINT "lead_conversion_logs_converted_by_fkey" FOREIGN KEY ("converted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "executive_targets" ADD CONSTRAINT "executive_targets_executive_id_fkey" FOREIGN KEY ("executive_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "area_assignments" ADD CONSTRAINT "area_assignments_executive_id_fkey" FOREIGN KEY ("executive_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
