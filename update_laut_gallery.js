const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const items = await prisma.galleryItem.findMany();
  
  // Find laut.png
  const target = items.find(i => i.url.includes('/laut.png'));
  if (target) {
    await prisma.galleryItem.update({
      where: { id: target.id },
      data: { url: '/laut1.png' }
    });
    console.log('Updated laut.png to laut1.png in gallery');
  } else {
    // If not found, add it
    await prisma.galleryItem.create({
      data: {
        url: '/laut1.png',
        type: 'image',
        album: 'Semua',
        order: 101
      }
    });
    console.log('Added laut1.png to gallery');
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
