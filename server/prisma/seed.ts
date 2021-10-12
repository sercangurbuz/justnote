import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.deleteMany();
  await prisma.note.deleteMany();

  console.log('Seeding...');

  const user = await prisma.user.create({
    data: {
      email: 'sercangurbuz@msn.com',
      sub: 'auth0-sub',
    },
  });

  const note1 = await prisma.note.create({
    data: {
      note: 'Watch Udemy and Pluralsight lessons',
      userId: user.id,
    },
  });
  const note2 = await prisma.note.create({
    data: {
      note: 'Look at the github for examples',
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
