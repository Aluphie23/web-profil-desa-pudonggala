const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  await prisma.galleryItem.create({
    data: {
      url: '/laut.png',
      type: 'image',
      album: 'Semua',
      order: 101
    }
  });
  console.log('Added laut.png to gallery');
}

run().catch(console.error).finally(() => prisma.$disconnect());
