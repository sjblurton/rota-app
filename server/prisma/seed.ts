import "dotenv/config";
import { prisma } from "../src/libs/prisma/prisma";

async function main() {
  await prisma.organisation.create({
    data: {
      id: "00000000-0000-0000-0000-000000000000",
      name: "Acme Corporation",
      plan: "free",
      status: "active",
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
