-- CreateEnum
CREATE TYPE "InviteContactMethod" AS ENUM ('email');

-- AlterTable
ALTER TABLE "Invite" ADD COLUMN     "preferred_contact_method" "InviteContactMethod" NOT NULL DEFAULT 'email',
ALTER COLUMN "expires_at" SET DEFAULT CURRENT_TIMESTAMP + INTERVAL '7 days';
