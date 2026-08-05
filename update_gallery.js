const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const items = await prisma.galleryItem.findMany();
  
  // Find the 3rd photo (Kerajinan/Smartphone)
  const target = items.find(i => i.url.includes('1603539947678') || i.alt === 'Kerajinan');
  if (target) {
    await prisma.galleryItem.delete({ where: { id: target.id } });
    console.log('Deleted smartphone photo:', target.url);
  } else {
    console.log('Smartphone photo not found');
  }

  // Add bg-pantai.jpg
  await prisma.galleryItem.create({
    data: {
      url: '/bg-pantai.jpg',
      type: 'image',
      album: 'Semua',
      order: 100
    }
  });
  console.log('Added bg-pantai.jpg');
}

run().catch(console.error).finally(() => prisma.$disconnect());
