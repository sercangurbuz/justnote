import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.note.deleteMany();
  await prisma.user.deleteMany();

  console.log('Seeding...');

  const user = await prisma.user.create({
    data: {
      email: 'sercangurbuz@msn.com',
      password: '$2b$10$EpRnTzVlqHNP0.fUbXUwSOyuiXe/QLSUG6xNekdHgTGmrpHEfIoxm', // secret42
      firstname: 'Sercan',
      lastname: 'Gürbüz',
    },
  });

  const note1 = await prisma.note.create({
    data: {
      title: 'Learn NestJs',
      description: 'Watch Udemy and Pluralsight lessons',
      status: 'PENDING',
      userId: user.id,
    },
  });
  const note2 = await prisma.note.create({
    data: {
      title: 'Study samples of NestJs',
      description: 'Look at the github for examples',
      status: 'PENDING',
      userId: user.id,
    },
  });

  console.log({ note1, note2 });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
