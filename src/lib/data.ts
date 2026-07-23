export const destinations = [
  {
    id: 1,
    slug: 'pantai-pudonggala',
    name: 'Pantai Pudonggala',
    category: 'Pantai',
    shortDesc: 'Pantai eksotis dengan pasir putih dan air jernih di Desa Pudonggala.',
    description: 'Pantai Pudonggala adalah destinasi unggulan desa yang menawarkan pemandangan sunset yang memukau. Dengan pasir putih yang lembut dan ombak yang tenang, pantai ini sangat cocok untuk wisata keluarga.',
    images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80'],
    facilities: ['Area Parkir', 'Warung Makan', 'Toilet Umum', 'Gazebo'],
    location: 'Dusun Pudonggala, Desa Pudonggala',
    openingHours: '08:00 - 18:00 WITA',
    ticketPrice: 'Rp 5.000 per orang',
    bestTimeToVisit: 'Sore hari (16:00 - 18:00 WITA)',
    featured: true,
  },
  {
    id: 2,
    slug: 'bukit-teletubbies',
    name: 'Bukit Hijau',
    category: 'Alam',
    shortDesc: 'Hamparan bukit hijau dengan udara sejuk yang menyegarkan.',
    description: 'Bukit dengan pemandangan rumput hijau yang luas, menawarkan panorama alam yang memanjakan mata serta udara pegunungan yang segar.',
    images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80'],
    facilities: ['Area Parkir', 'Spot Foto'],
    location: 'Dusun Timur, Desa Pudonggala',
    openingHours: '24 Jam',
    ticketPrice: 'Gratis',
    bestTimeToVisit: 'Pagi hari (06:00 - 09:00 WITA)',
    featured: true,
  },
  {
    id: 3,
    slug: 'pusat-kerajinan',
    name: 'Pusat Kerajinan Desa',
    category: 'Budaya',
    shortDesc: 'Pusat pembuatan anyaman khas Pudonggala.',
    description: 'Melihat langsung proses pembuatan anyaman bambu dan rotan khas desa oleh para pengrajin lokal.',
    images: ['https://images.unsplash.com/photo-1603539947678-cd3954ed515d?auto=format&fit=crop&w=1200&q=80'],
    facilities: ['Toko Suvenir', 'Area Workshop'],
    location: 'Pusat Desa Pudonggala',
    openingHours: '09:00 - 17:00 WITA',
    ticketPrice: 'Gratis',
    bestTimeToVisit: 'Siang hari',
    featured: true,
  }
];

export const galleryItems = [
  { id: 1, type: 'image', src: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80', alt: 'Pantai Pudonggala', album: 'Pantai' },
  { id: 2, type: 'image', src: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80', alt: 'Bukit Hijau', album: 'Alam' },
  { id: 3, type: 'image', src: 'https://images.unsplash.com/photo-1603539947678-cd3954ed515d?auto=format&fit=crop&w=800&q=80', alt: 'Kerajinan', album: 'Budaya' },
  { id: 4, type: 'image', src: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80', alt: 'Senja di Pantai', album: 'Pantai' },
  { id: 5, type: 'image', src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80', alt: 'Pemandangan Desa', album: 'Alam' },
  { id: 6, type: 'image', src: 'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=800&q=80', alt: 'Pantai Pagi Hari', album: 'Pantai' },
];

export const villageProfile = {
  name: 'Desa Pudonggala',
  tagline: 'Pesona Alam Sulawesi Tenggara',
  history: 'Desa Pudonggala telah ada sejak awal abad ke-20, berawal dari pemukiman nelayan kecil di pesisir pantai. Seiring berjalannya waktu, desa ini berkembang menjadi salah satu destinasi wisata utama di wilayah ini.',
  demographics: { 
    population: '2.450 Jiwa', 
    households: '650 KK', 
    male: '1.200 Jiwa', 
    female: '1.250 Jiwa',
    mainLivelihood: 'Nelayan dan Petani'
  },
  vision: '"Menjadi desa wisata yang mandiri, berbudaya, dan sejahtera pada tahun 2030"',
  mission: [
    'Meningkatkan kualitas infrastruktur pariwisata yang ramah lingkungan.',
    'Memberdayakan ekonomi masyarakat melalui UMKM dan kerajinan lokal.',
    'Melestarikan budaya dan tradisi leluhur sebagai daya tarik desa.'
  ],
  contact: { 
    address: 'Jl. Poros Pantai No. 1, Desa Pudonggala, Sulawesi Tenggara', 
    phone: '+62 812 3456 7890', 
    email: 'info@pudonggala.desa.id',
    hours: 'Senin - Jumat: 08:00 - 15:00 WITA'
  },
};
