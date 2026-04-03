-- CreateEnum
CREATE TYPE "PlanType" AS ENUM ('free');

-- CreateEnum
CREATE TYPE "OrganisationStatus" AS ENUM ('active', 'inactive', 'invited');

-- CreateTable
CREATE TABLE "Organisation" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "plan" "PlanType" NOT NULL DEFAULT 'free',
    "sms_limit" INTEGER NOT NULL DEFAULT 100,
    "sms_used_this_month" INTEGER NOT NULL DEFAULT 0,
    "status" "OrganisationStatus" NOT NULL DEFAULT 'invited',
    "stripe_customer_id" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Organisation_pkey" PRIMARY KEY ("id")
);
