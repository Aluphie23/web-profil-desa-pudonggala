const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.galleryItem.create({
  data: {
    url: '/KKNBoy1.png',
    type: 'image',
    album: 'Semua',
    order: 99
  }
}).then(console.log).catch(console.error).finally(() => prisma.$disconnect());
