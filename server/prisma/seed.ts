import 'dotenv/config'
import { prisma } from '../src/libs/prisma/prisma'

async function main() {
  console.log('Seeding organisation...')
  await prisma.organisation.upsert({
    where: { id: '00000000-0000-0000-0000-000000000000' },
    update: {
      name: 'Acme Corporation',
      plan: 'free',
      status: 'active',
    },
    create: {
      id: '00000000-0000-0000-0000-000000000000',
      name: 'Acme Corporation',
      plan: 'free',
      status: 'active',
    },
  })
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
