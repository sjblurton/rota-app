import "dotenv/config";
import { prisma } from "../src/libs/prisma/prisma";

async function main() {
  console.log("Seeding organisation...");
  await prisma.organisation.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {
      name: "Acme Corporation",
      plan: "free",
      status: "active",
    },
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Acme Corporation",
      plan: "free",
      status: "active",
    },
  });
  await prisma.invite.upsert({
    where: { id: "00000000-0000-0000-0000-000000000000" },
    update: {
      email: "user@test.com",
      role: "admin",
      preferred_contact_method: "email",
      organisation_id: "00000000-0000-0000-0000-000000000000",
    },
    create: {
      id: "00000000-0000-0000-0000-000000000000",
      email: "user@test.com",
      role: "admin",
      preferred_contact_method: "email",
      organisation_id: "00000000-0000-0000-0000-000000000000",
    },
  });
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
