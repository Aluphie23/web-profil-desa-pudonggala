const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function run() {
  const items = await prisma.galleryItem.findMany();
  
  // Find all items that are NOT bg-pantai.jpg or KKNBoy1.png
  const toDelete = items.filter(i => !i.url.includes('bg-pantai.jpg') && !i.url.includes('KKNBoy1.png'));
  
  for (const item of toDelete) {
    await prisma.galleryItem.delete({ where: { id: item.id } });
    console.log('Deleted photo:', item.url);
  }
}

run().catch(console.error).finally(() => prisma.$disconnect());
