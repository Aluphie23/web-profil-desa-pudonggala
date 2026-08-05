import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // 1. Create Admin User
  const hashedPassword = await bcrypt.hash('admin123', 12);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@pudonggala.desa.id' },
    update: {},
    create: {
      email: 'admin@pudonggala.desa.id',
      name: 'Admin Pudonggala',
      password: hashedPassword,
    },
  });
  console.log(`Created admin user with id: ${admin.id}`);

  // 2. Create Village Profile
  const profileCount = await prisma.villageProfile.count();
  if (profileCount === 0) {
    await prisma.villageProfile.create({
      data: {
        name: 'Desa Pudonggala',
        tagline: 'Pesona Alam Sulawesi Tenggara',
        history: 'Desa Pudonggala telah ada sejak awal abad ke-20, berawal dari pemukiman nelayan kecil di pesisir pantai. Seiring berjalannya waktu, desa ini berkembang menjadi salah satu destinasi wisata utama di wilayah ini.',
        vision: 'Terwujudnya masyarakat Pudonggala yang dinamis, agamis, maju dan mandiri',
        mission: JSON.stringify([
          'Meningkatkan pengelolaan sektor-sektor unggulan.',
          'Memperkuat kapasitas kelembagaan desa dan kelembagaan masyarakat.',
          'Mendorong partisipasi aktif masyarakat dan kaum perempuan dalam pembangunan desa.'
        ]),
        population: '2.450 Jiwa',
        households: '650 KK',
        malePop: '1.200 Jiwa',
        femalePop: '1.250 Jiwa',
        area: '15 km²',
        address: 'Jl. Poros Pantai No. 1, Desa Pudonggala, Sulawesi Tenggara',
        phone: '+62 812 3456 7890',
        email: 'info@pudonggala.desa.id',
        officeHours: 'Senin - Jumat: 08:00 - 15:00 WITA',
        latitude: -4.123456,
        longitude: 122.123456,
      }
    });
    console.log('Created village profile');
  }

  // 3. Create Destinations
  const dest1 = await prisma.destination.upsert({
    where: { slug: 'pantai-pudonggala' },
    update: {},
    create: {
      slug: 'pantai-pudonggala',
      name: 'Pantai Pudonggala',
      category: 'Pantai',
      shortDesc: 'Pantai eksotis dengan pasir putih dan air jernih di Desa Pudonggala.',
      description: 'Pantai Pudonggala adalah destinasi unggulan desa yang menawarkan pemandangan sunset yang memukau. Dengan pasir putih yang lembut dan ombak yang tenang, pantai ini sangat cocok untuk wisata keluarga.',
      facilities: JSON.stringify(['Area Parkir', 'Warung Makan', 'Toilet Umum', 'Gazebo']),
      location: 'Dusun Pudonggala, Desa Pudonggala',
      openingHours: '08:00 - 18:00 WITA',
      ticketPrice: 'Rp 5.000 per orang',
      bestTimeToVisit: 'Sore hari (16:00 - 18:00 WITA)',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80', alt: 'Pantai Pudonggala', order: 1 }
        ]
      }
    }
  });
  console.log(`Created destination: ${dest1.name}`);

  const dest2 = await prisma.destination.upsert({
    where: { slug: 'bukit-hijau' },
    update: {},
    create: {
      slug: 'bukit-hijau',
      name: 'Bukit Hijau',
      category: 'Alam',
      shortDesc: 'Hamparan bukit hijau dengan udara sejuk yang menyegarkan.',
      description: 'Bukit dengan pemandangan rumput hijau yang luas, menawarkan panorama alam yang memanjakan mata serta udara pegunungan yang segar.',
      facilities: JSON.stringify(['Area Parkir', 'Spot Foto']),
      location: 'Dusun Timur, Desa Pudonggala',
      openingHours: '24 Jam',
      ticketPrice: 'Gratis',
      bestTimeToVisit: 'Pagi hari (06:00 - 09:00 WITA)',
      featured: true,
      images: {
        create: [
          { url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80', alt: 'Bukit Hijau', order: 1 }
        ]
      }
    }
  });
  console.log(`Created destination: ${dest2.name}`);

  // 4. Create Gallery Items
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    await prisma.galleryItem.createMany({
      data: [
        { type: 'image', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', alt: 'Pantai Pudonggala', album: 'Pantai', order: 1 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', alt: 'Bukit Hijau', album: 'Alam', order: 2 },
        { type: 'image', url: 'https://images.unsplash.com/photo-1603539947678-cd3954ed515d?auto=format&fit=crop&w=800&q=80', alt: 'Kerajinan', album: 'Budaya', order: 3 },
      ]
    });
    console.log('Created gallery items');
  }

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
