/*
  Warnings:

  - The values [declined] on the enum `InviteStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "InviteStatus_new" AS ENUM ('invited', 'accepted', 'revoked', 'expired');
ALTER TABLE "public"."Invite" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Invite" ALTER COLUMN "status" TYPE "InviteStatus_new" USING ("status"::text::"InviteStatus_new");
ALTER TYPE "InviteStatus" RENAME TO "InviteStatus_old";
ALTER TYPE "InviteStatus_new" RENAME TO "InviteStatus";
DROP TYPE "public"."InviteStatus_old";
ALTER TABLE "Invite" ALTER COLUMN "status" SET DEFAULT 'invited';
COMMIT;

-- AlterTable
ALTER TABLE "Invite" ALTER COLUMN "expires_at" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';
