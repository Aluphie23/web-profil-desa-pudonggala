import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { MapPin, Users, Home, TrendingUp, ArrowRight, Sparkles, Store, Calendar, HeartPulse, GraduationCap, Building2, Megaphone, CheckCircle2, FileText, CreditCard, Briefcase, FileBadge } from "lucide-react";
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
        imageUrl={profile.heroImageUrl || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80"}
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


      {/* Pengantar Wilayah Section */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[url('https://images.unsplash.com/photo-1596489370009-41e9ab6eb37e?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-[0.03] rounded-full blur-2xl -translate-y-1/2 translate-x-1/3" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection direction="up" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <MapPin className="w-4 h-4" />
              Geografi Wilayah
            </div>
            
            <p className="text-xl md:text-2xl text-foreground leading-relaxed font-serif text-justify md:text-center">
              {profile.regency ? `Kabupaten ${profile.regency}` : "Kabupaten Konawe Utara"} memiliki total <strong className="text-primary">159 desa</strong> dan <strong className="text-primary">11 kelurahan</strong> yang tersebar di <strong className="text-primary">13 kecamatan</strong>.
              Karena jumlahnya yang sangat banyak, daftar lengkap nama seluruh desa dapat dilihat langsung melalui Situs Resmi Kabupaten atau data BPS setempat.
            </p>
            
            <div className="mt-16 flex flex-col items-center justify-center gap-6">
              <div className="w-full flex items-center justify-center gap-6">
                <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent flex-1 max-w-[200px]" />
                <Sparkles className="w-5 h-5 text-accent animate-pulse" />
                <div className="h-px bg-gradient-to-r from-transparent via-accent to-transparent flex-1 max-w-[200px]" />
              </div>
              <h3 className="text-3xl md:text-5xl lg:text-6xl font-black font-serif text-transparent bg-clip-text bg-gradient-to-br from-primary-dark via-primary to-accent drop-shadow-sm pb-2">
                Dan salah satunya adalah <br className="hidden md:block" /> Desa Pudonggala
              </h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-primary to-accent rounded-full mt-2 shadow-glow-accent" />
            </div>
          </MotionSection>
        </div>
      </section>

      {/* Fasilitas & Layanan Publik Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Fasilitas & Layanan Publik</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Akses cepat ke informasi berbagai fasilitas kesehatan, pendidikan, dan pusat administrasi di Desa Pudonggala.
            </p>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Kesehatan", desc: "Puskesmas & Posyandu", icon: HeartPulse, color: "text-rose-500", bg: "bg-rose-500/10" },
              { title: "Pendidikan", desc: "SD Negeri 3 Sawa", icon: GraduationCap, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Keagamaan", desc: "Tempat Ibadah / Masjid", icon: Users, color: "text-amber-500", bg: "bg-amber-500/10" },
              { title: "Pemerintahan", desc: "Kantor Kepala Desa", icon: Building2, color: "text-emerald-500", bg: "bg-emerald-500/10" },
            ].map((item, idx) => (
              <MotionSection key={idx} delay={idx * 0.1} direction="up" className="h-full">
                <div className="bg-white rounded-2xl p-6 text-center shadow-glass border border-gray-100 hover:shadow-lg transition-all hover:-translate-y-1 group h-full flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>

      {/* Layanan Mandiri / Administrasi Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-1/3 sticky top-24">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent-dark text-sm font-medium mb-6">
                <FileText className="w-4 h-4" />
                Layanan Administrasi
              </div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-6">
                Persyaratan Surat & Dokumen
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Informasi persyaratan umum untuk pembuatan berbagai dokumen administrasi kependudukan atau surat pengantar di Kantor Desa Pudonggala.
              </p>
              <Button asChild size="lg" className="rounded-full bg-primary text-white hover:bg-primary-dark">
                <Link href="/kontak">Hubungi Perangkat Desa</Link>
              </Button>
            </div>
            
            <div className="lg:w-2/3 grid gap-6">
              {[
                { 
                  title: "Pembuatan e-KTP Baru", 
                  icon: CreditCard,
                  reqs: ["Berusia minimal 17 tahun / sudah menikah.", "Fotokopi Kartu Keluarga (KK).", "Datang langsung ke kantor kecamatan untuk rekam foto/biometrik."] 
                },
                { 
                  title: "Pembuatan Kartu Keluarga (KK)", 
                  icon: Users,
                  reqs: ["Buku Nikah / Akta Perkawinan (bagi pasangan baru).", "Surat Pindah (jika dari luar wilayah).", "Fotokopi KK lama (jika pecah KK)."] 
                },
                { 
                  title: "Surat Keterangan Domisili", 
                  icon: Building2,
                  reqs: ["Fotokopi KTP pemohon.", "Fotokopi Kartu Keluarga (KK).", "Surat pengantar dari RT/RW setempat (opsional sesuai kebijakan)."] 
                },
                { 
                  title: "Surat Keterangan Usaha (SKU)", 
                  icon: Briefcase,
                  reqs: ["Fotokopi KTP dan KK.", "Foto lokasi/tempat usaha.", "Pengantar RT/RW (jika diperlukan)."] 
                }
              ].map((service, idx) => (
                <MotionSection key={idx} direction="right" delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row gap-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">{service.title}</h4>
                      <ul className="space-y-2">
                        {service.reqs.map((req, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 text-muted-foreground text-sm">
                            <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </MotionSection>
              ))}
            </div>
          </MotionSection>
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
