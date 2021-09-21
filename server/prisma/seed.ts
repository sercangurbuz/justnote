import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany();

  console.log('Seeding...');

  const note1 = await prisma.note.create({
    data: {
      title: 'Learn NestJs',
      description: 'Watch Udemy and Pluralsight lessons',
      status: 'PENDING',
    },
  });
  const note2 = await prisma.note.create({
    data: {
      title: 'Study samples of NestJs',
      description: 'Look at the github for examples',
      status: 'PENDING',
    },
  });

  console.log({ note1, note2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
