import 'dotenv/config';
import { PrismaClient } from '../src/generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Testing database connection...\n');

  const itemTypes = await prisma.itemType.findMany({
    orderBy: { name: 'asc' },
  });

  console.log(`✓ Connected. Found ${itemTypes.length} system item types:\n`);
  for (const type of itemTypes) {
    console.log(`  ${type.icon.padEnd(12)} ${type.name} (${type.color})`);
  }

  console.log('\nDatabase test passed!');
}

main()
  .catch((e) => {
    console.error('Database test failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
