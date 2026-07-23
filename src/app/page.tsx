import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { MapPin, Users, Home, TrendingUp, ArrowRight, Sparkles, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParallaxHero } from "@/components/animations/ParallaxHero";
import { MotionSection } from "@/components/animations/MotionSection";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const revalidate = 60;

export default async function HomePage() {
  const [profile, destinations, umkms] = await Promise.all([
    prisma.villageProfile.findFirst(),
    prisma.destination.findMany({
      where: { featured: true },
      take: 3,
      include: { images: { orderBy: { order: "asc" }, take: 1 } },
    }),
    prisma.uMKM.findMany({
      take: 3,
      orderBy: { createdAt: "desc" }
    }),
  ]);

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <ParallaxHero
        imageUrl="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"
        className="h-screen"
        overlayClass="bg-gradient-to-b from-black/60 via-black/40 to-primary-dark/80"
      >
        <div className="text-center px-4 max-w-5xl mx-auto">
          <MotionSection direction="up" delay={0.2}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-accent" />
              Selamat Datang di Desa Wisata
            </div>
          </MotionSection>
          <MotionSection direction="up" delay={0.3}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-6 tracking-tight">
              {profile.name}
            </h1>
          </MotionSection>
          <MotionSection direction="up" delay={0.5}>
            <p className="text-xl md:text-2xl text-white/80 mb-12 max-w-2xl mx-auto font-light leading-relaxed">
              {profile.tagline}
            </p>
          </MotionSection>
          <MotionSection direction="up" delay={0.7}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gradient-primary text-white rounded-full px-10 py-6 text-base font-semibold hover:shadow-glow hover:scale-105 transition-all">
                <Link href="/wisata">
                  Jelajahi Wisata
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 text-white border-white/25 hover:bg-white hover:text-primary-dark rounded-full px-10 py-6 text-base font-semibold backdrop-blur-md hover:scale-105 transition-all">
                <Link href="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </MotionSection>
        </div>

      </ParallaxHero>

      {/* Sambutan Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row gap-16 items-center">
            <MotionSection direction="left" className="md:w-1/3 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden shadow-glass-lg ring-4 ring-white">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80"
                    alt="Kepala Desa"
                    fill
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center shadow-glow-accent">
                  <span className="text-white text-2xl font-bold font-serif">&quot;</span>
                </div>
              </div>
            </MotionSection>
            <MotionSection direction="right" className="md:w-2/3 text-center md:text-left">
              <SectionHeading title="Sambutan Kepala Desa" centered={false} />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Selamat datang di website resmi {profile.name}. Kami sangat bangga
                  memperkenalkan potensi desa kami kepada masyarakat luas melalui
                  platform digital ini.
                </p>
                <p>
                  {profile.name} memiliki pesona alam yang luar biasa, terutama
                  pantainya yang indah. Kami terus berkomitmen untuk membangun desa
                  wisata yang ramah lingkungan dan memberdayakan ekonomi masyarakat
                  lokal.
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Destinasi Unggulan */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection>
            <SectionHeading
              title="Destinasi Unggulan"
              subtitle="Temukan tempat-tempat indah yang wajib Anda kunjungi di desa kami."
              centered
            />
          </MotionSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <StaggerItem key={dest.id}>
                <Link href={`/wisata/${dest.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2">
                    <div className="relative h-64 w-full overflow-hidden">
                      <ImageWithFallback
                        src={dest.images[0]?.url}
                        alt={dest.name}
                        fill
                        className="group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
                          {dest.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4 text-sm leading-relaxed">
                        {dest.shortDesc}
                      </p>
                      <span className="text-primary font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <MotionSection delay={0.4} className="mt-14 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 font-semibold hover:shadow-glow hover:scale-105 transition-all">
              <Link href="/wisata">
                Lihat Semua Destinasi
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </MotionSection>
        </div>
      </section>

      {/* UMKM Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection>
            <SectionHeading
              title="Produk Lokal & UMKM"
              subtitle="Dukung perekonomian lokal dengan berbelanja produk asli dari masyarakat kami."
              centered
            />
          </MotionSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {umkms.map((umkm) => (
              <StaggerItem key={umkm.id}>
                <Link href="/umkm" className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <ImageWithFallback
                        src={umkm.imageUrl}
                        alt={umkm.name}
                        fill
                        className="group-hover:scale-110 transition-transform duration-700"
                        fallbackText="Tidak ada foto"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
                          {umkm.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <h3 className="text-xl font-serif font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {umkm.name}
                      </h3>
                      <p className="text-primary-dark text-sm font-medium mb-3 flex items-center gap-1.5">
                        <Store className="w-4 h-4" />
                        {umkm.ownerName}
                      </p>
                      <p className="text-muted-foreground line-clamp-2 mb-4 text-sm leading-relaxed flex-1">
                        {umkm.description}
                      </p>
                      <span className="text-primary font-semibold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                        Lihat Katalog UMKM
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
          <MotionSection delay={0.4} className="mt-14 text-center">
            <Button asChild variant="outline" size="lg" className="rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white px-10 py-6 font-semibold hover:shadow-glow hover:scale-105 transition-all">
              <Link href="/umkm">
                Lihat Semua Produk
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </MotionSection>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-gradient-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyem0wLTEydi0ySDI0djJoMTJ6bS0xMiAxNnYyaDEydi0ySDI0em0xMi04di0ySDI0djJoMTJ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Desa dalam Angka</h2>
            <div className="flex items-center gap-1.5 justify-center">
              <div className="h-1 w-8 rounded-full bg-white/60" />
              <div className="h-1 w-3 rounded-full bg-accent" />
              <div className="h-1 w-1.5 rounded-full bg-white/30" />
            </div>
          </MotionSection>
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-7 h-7 text-accent" />
                </div>
                <AnimatedCounter target={destinations.length} suffix="+" className="text-4xl font-bold mb-2 block" />
                <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Destinasi</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Users className="w-7 h-7 text-accent" />
                </div>
                <AnimatedCounter target={parseInt(profile.population) || 0} className="text-4xl font-bold mb-2 block" />
                <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Penduduk</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <Home className="w-7 h-7 text-accent" />
                </div>
                <AnimatedCounter target={parseInt(profile.households) || 0} className="text-4xl font-bold mb-2 block" />
                <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Kepala Keluarga</span>
              </div>
            </StaggerItem>
            <StaggerItem>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/15 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-7 h-7 text-accent" />
                </div>
                <span className="text-4xl font-bold mb-2 block">{profile.area}</span>
                <span className="text-white/70 text-sm font-medium tracking-wide uppercase">Luas Wilayah</span>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Call to Action Banner */}
      <ParallaxHero
        imageUrl="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80"
        className="py-32"
        overlayClass="bg-gradient-to-r from-primary-dark/90 via-primary/80 to-primary-dark/90"
      >
        <div className="text-center px-4 max-w-3xl mx-auto">
          <MotionSection>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6 tracking-tight">
              Rencanakan Kunjungan Anda
            </h2>
          </MotionSection>
          <MotionSection delay={0.2}>
            <p className="text-lg md:text-xl text-white/70 mb-10 font-light leading-relaxed">
              Kami siap menyambut Anda dengan keindahan alam dan keramahan masyarakat desa.
            </p>
          </MotionSection>
          <MotionSection delay={0.4}>
            <Button asChild size="lg" className="bg-gradient-accent text-white rounded-full px-10 py-6 text-base font-semibold hover:shadow-glow-accent hover:scale-105 transition-all">
              <Link href="/kontak">
                Hubungi Kami Sekarang
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </MotionSection>
        </div>
      </ParallaxHero>
    </div>
  );
}
