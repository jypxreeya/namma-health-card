-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');

-- CreateEnum
CREATE TYPE "KycStatus" AS ENUM ('PENDING', 'VERIFIED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ConsentStatus" AS ENUM ('GRANTED', 'REVOKED');

-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('AADHAAR', 'PAN', 'VOTER_ID', 'PASSPORT');

-- CreateEnum
CREATE TYPE "VerificationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "CardStatus" AS ENUM ('ISSUED', 'ACTIVE', 'SUSPENDED', 'EXPIRED', 'REVOKED');

-- CreateEnum
CREATE TYPE "RelationshipType" AS ENUM ('SPOUSE', 'CHILD', 'PARENT', 'SIBLING', 'OTHER');

-- CreateTable
CREATE TABLE "patients" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_code" VARCHAR(50) NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "mobile" VARCHAR(20) NOT NULL,
    "email" VARCHAR(255),
    "dob" DATE,
    "gender" "Gender",
    "primary_address_id" UUID,
    "field_executive_id" UUID,
    "active_membership_id" UUID,
    "kyc_status" "KycStatus" NOT NULL DEFAULT 'PENDING',
    "consent_status" "ConsentStatus" NOT NULL DEFAULT 'REVOKED',
    "registration_source" VARCHAR(50),
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "version" INTEGER NOT NULL DEFAULT 1,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,
    "deleted_at" TIMESTAMPTZ(6),

    CONSTRAINT "patients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_addresses" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "address_line_1" VARCHAR(255) NOT NULL,
    "address_line_2" VARCHAR(255),
    "city" VARCHAR(100) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "postal_code" VARCHAR(20) NOT NULL,
    "country" VARCHAR(100) NOT NULL DEFAULT 'India',
    "geo_lat" DECIMAL(10,8),
    "geo_long" DECIMAL(11,8),
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "patient_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "family_members" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "full_name" VARCHAR(150) NOT NULL,
    "relationship_type" "RelationshipType" NOT NULL,
    "dob" DATE,
    "gender" "Gender",
    "mobile" VARCHAR(20),
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "family_members_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "patient_documents" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "document_type" "DocumentType" NOT NULL,
    "document_url" VARCHAR(512) NOT NULL,
    "verification_status" "VerificationStatus" NOT NULL DEFAULT 'PENDING',
    "uploaded_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "patient_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "consent_records" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "consent_type" VARCHAR(100) NOT NULL,
    "consent_version" VARCHAR(50) NOT NULL,
    "ip_address" VARCHAR(45),
    "status" "ConsentStatus" NOT NULL DEFAULT 'GRANTED',
    "consent_given_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consent_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "membership_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "plan_code" VARCHAR(50) NOT NULL,
    "plan_name" VARCHAR(150) NOT NULL,
    "duration_days" INTEGER NOT NULL,
    "pricing" DECIMAL(10,2) NOT NULL,
    "family_limit" INTEGER NOT NULL DEFAULT 0,
    "benefits" JSONB,
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) NOT NULL,

    CONSTRAINT "membership_plans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "memberships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "membership_plan_id" UUID NOT NULL,
    "enrolled_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valid_from" TIMESTAMPTZ(6) NOT NULL,
    "valid_to" TIMESTAMPTZ(6) NOT NULL,
    "renewal_status" VARCHAR(50) NOT NULL DEFAULT 'ACTIVE',
    "status" "RecordStatus" NOT NULL DEFAULT 'ACTIVE',

    CONSTRAINT "memberships_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "health_cards" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "patient_id" UUID NOT NULL,
    "membership_id" UUID NOT NULL,
    "card_number" VARCHAR(100) NOT NULL,
    "qr_code_url" VARCHAR(512),
    "pdf_url" VARCHAR(512),
    "issue_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiry_date" TIMESTAMPTZ(6) NOT NULL,
    "card_status" "CardStatus" NOT NULL DEFAULT 'ISSUED',

    CONSTRAINT "health_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "card_status_history" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "card_id" UUID NOT NULL,
    "old_status" "CardStatus" NOT NULL,
    "new_status" "CardStatus" NOT NULL,
    "changed_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "card_status_history_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "renewals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "membership_id" UUID NOT NULL,
    "previous_expiry" TIMESTAMPTZ(6) NOT NULL,
    "new_expiry" TIMESTAMPTZ(6) NOT NULL,
    "renewal_date" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "payment_reference" VARCHAR(255),

    CONSTRAINT "renewals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "patients_patient_code_key" ON "patients"("patient_code");

-- CreateIndex
CREATE UNIQUE INDEX "patients_mobile_key" ON "patients"("mobile");

-- CreateIndex
CREATE INDEX "patients_mobile_idx" ON "patients"("mobile");

-- CreateIndex
CREATE INDEX "patients_patient_code_idx" ON "patients"("patient_code");

-- CreateIndex
CREATE INDEX "patients_field_executive_id_idx" ON "patients"("field_executive_id");

-- CreateIndex
CREATE INDEX "patient_addresses_patient_id_idx" ON "patient_addresses"("patient_id");

-- CreateIndex
CREATE INDEX "family_members_patient_id_idx" ON "family_members"("patient_id");

-- CreateIndex
CREATE INDEX "patient_documents_patient_id_idx" ON "patient_documents"("patient_id");

-- CreateIndex
CREATE INDEX "consent_records_patient_id_idx" ON "consent_records"("patient_id");

-- CreateIndex
CREATE UNIQUE INDEX "membership_plans_plan_code_key" ON "membership_plans"("plan_code");

-- CreateIndex
CREATE INDEX "membership_plans_plan_code_idx" ON "membership_plans"("plan_code");

-- CreateIndex
CREATE INDEX "memberships_patient_id_idx" ON "memberships"("patient_id");

-- CreateIndex
CREATE INDEX "memberships_membership_plan_id_idx" ON "memberships"("membership_plan_id");

-- CreateIndex
CREATE UNIQUE INDEX "health_cards_card_number_key" ON "health_cards"("card_number");

-- CreateIndex
CREATE INDEX "health_cards_card_number_idx" ON "health_cards"("card_number");

-- CreateIndex
CREATE INDEX "health_cards_card_status_idx" ON "health_cards"("card_status");

-- CreateIndex
CREATE INDEX "health_cards_patient_id_idx" ON "health_cards"("patient_id");

-- CreateIndex
CREATE INDEX "health_cards_membership_id_idx" ON "health_cards"("membership_id");

-- CreateIndex
CREATE INDEX "card_status_history_card_id_idx" ON "card_status_history"("card_id");

-- CreateIndex
CREATE INDEX "renewals_membership_id_idx" ON "renewals"("membership_id");

-- AddForeignKey
ALTER TABLE "patients" ADD CONSTRAINT "patients_field_executive_id_fkey" FOREIGN KEY ("field_executive_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_addresses" ADD CONSTRAINT "patient_addresses_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "family_members" ADD CONSTRAINT "family_members_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "patient_documents" ADD CONSTRAINT "patient_documents_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "consent_records" ADD CONSTRAINT "consent_records_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "memberships" ADD CONSTRAINT "memberships_membership_plan_id_fkey" FOREIGN KEY ("membership_plan_id") REFERENCES "membership_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_cards" ADD CONSTRAINT "health_cards_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "health_cards" ADD CONSTRAINT "health_cards_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "card_status_history" ADD CONSTRAINT "card_status_history_card_id_fkey" FOREIGN KEY ("card_id") REFERENCES "health_cards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "renewals" ADD CONSTRAINT "renewals_membership_id_fkey" FOREIGN KEY ("membership_id") REFERENCES "memberships"("id") ON DELETE CASCADE ON UPDATE CASCADE;
