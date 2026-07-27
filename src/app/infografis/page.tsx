import { PageHero } from "@/components/shared/PageHero";
import { MotionSection } from "@/components/animations/MotionSection";
import { MapPin, Navigation, MapIcon, Users, User, PlusSquare, Map } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

export default async function InfografisPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <PageHero
        title="Infografis Desa"
        subtitle="Visualisasi data geografis dan demografis Desa Pudonggala dalam format yang interaktif."
        imageUrl="https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Geografi & Wilayah Utama */}
      <section className="py-16 -mt-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <MotionSection direction="up" delay={0.1}>
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-glass-lg border border-white flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors" />
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 ring-8 ring-primary/5 group-hover:scale-110 transition-transform">
                  <Map className="w-10 h-10" />
                </div>
                <h4 className="font-semibold text-primary-dark tracking-wider uppercase text-sm mb-2">Luas Wilayah</h4>
                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-4">10,20 <span className="text-2xl text-muted-foreground font-medium">km²</span></h3>
                <p className="text-muted-foreground max-w-sm">
                  Total bentang alam dan wilayah administratif Desa Pudonggala di Kecamatan Sawa.
                </p>
              </div>
            </MotionSection>

            <MotionSection direction="up" delay={0.2}>
              <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-glass-lg border border-white flex flex-col items-center text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-accent/10 transition-colors" />
                <div className="w-20 h-20 bg-accent/10 text-accent-dark rounded-full flex items-center justify-center mb-6 ring-8 ring-accent/5 group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10" />
                </div>
                <h4 className="font-semibold text-accent-dark tracking-wider uppercase text-sm mb-2">Total Penduduk</h4>
                <h3 className="text-5xl md:text-6xl font-black text-foreground mb-4">{profile.population} <span className="text-2xl text-muted-foreground font-medium">Jiwa</span></h3>
                <p className="text-muted-foreground max-w-sm">
                  Jumlah total masyarakat yang berdomisili menetap di wilayah Desa Pudonggala.
                </p>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>



      {/* Aksesibilitas & Jarak Tempuh */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">Aksesibilitas Wilayah</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Jarak tempuh strategis dari pusat Desa Pudonggala menuju ke pusat-pusat pemerintahan dan fasilitas kesehatan utama.
            </p>
          </MotionSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { val: "2", label: "Ibu Kota Kecamatan", icon: MapPin, color: "text-emerald-500", bg: "bg-emerald-500" },
              { val: "80", label: "Ibu Kota Kabupaten", icon: Navigation, color: "text-blue-500", bg: "bg-blue-500" },
              { val: "17", label: "Ibu Kota Provinsi", icon: MapIcon, color: "text-amber-500", bg: "bg-amber-500" },
              { val: "2", label: "Puskesmas Terdekat", icon: PlusSquare, color: "text-rose-500", bg: "bg-rose-500" },
            ].map((jarak, idx) => (
              <MotionSection key={idx} delay={idx * 0.1} direction="up">
                <div className="group relative bg-muted/30 rounded-3xl p-8 hover:bg-white hover:shadow-glass-lg transition-all duration-500 border border-transparent hover:border-gray-100 h-full flex flex-col">
                  <div className={`w-14 h-14 ${jarak.bg}/10 ${jarak.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-transform`}>
                    <jarak.icon className="w-7 h-7" />
                  </div>
                  <div className="flex items-baseline gap-2 mb-2 mt-auto">
                    <h3 className="text-5xl font-black text-foreground tracking-tight group-hover:text-primary transition-colors">{jarak.val}</h3>
                    <span className="text-muted-foreground font-medium">km</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground/80 leading-snug">Jarak ke {jarak.label}</p>
                </div>
              </MotionSection>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
