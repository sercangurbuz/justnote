import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany();

  console.log('Seeding...');

  const note1 = await prisma.note.create({
    data: {
      note: 'Watch Udemy and Pluralsight lessons',
    },
  });
  const note2 = await prisma.note.create({
    data: {
      note: 'Look at the github for examples',
    },
  });

  console.log({ note1, note2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
