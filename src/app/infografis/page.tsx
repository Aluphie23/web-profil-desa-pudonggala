import { PageHero } from "@/components/shared/PageHero";
import { MotionSection } from "@/components/animations/MotionSection";
import { MapPin, Navigation, MapIcon, Users, User, PlusSquare, Map, UserPlus, UserMinus, Home } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import { DemographicsCharts } from "@/components/charts/DemographicsCharts";
import { DetailedDemographics } from "@/components/profile/DetailedDemographics";

export const revalidate = 60;

export default async function InfografisPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  const statCards = [
    { icon: Users, value: "269", label: "Total Penduduk", color: "from-primary to-primary-dark" },
    { icon: UserPlus, value: "142", label: "Laki-laki", color: "from-blue-500 to-blue-600" },
    { icon: UserMinus, value: "127", label: "Perempuan", color: "from-pink-500 to-pink-600" },
    { icon: Home, value: "88", label: "Kepala Keluarga", color: "from-accent to-accent-dark" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <PageHero
        title="Infografis Desa"
        subtitle="Visualisasi data geografis dan demografis Desa Pudonggala dalam format yang interaktif."
        imageUrl="https://images.unsplash.com/photo-1544716278-e513176f20b5?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Kartu Statistik Utama */}
      <section className="py-16 -mt-24 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-3xl p-8 text-center border border-white shadow-glass-lg hover:shadow-glass-xl hover:-translate-y-2 transition-all duration-500">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <AnimatedCounter target={parseInt(stat.value) || 0} className="text-4xl md:text-5xl font-black text-foreground mb-2 block tracking-tight" />
                    <p className="text-muted-foreground text-sm uppercase tracking-wider font-semibold">{stat.label}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Grafik Demografi */}
      <section className="py-12 relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection>
            <SectionHeading title="Visualisasi Data Demografi" centered />
            <p className="text-center text-muted-foreground max-w-2xl mx-auto -mt-6 mb-12">
              Distribusi penduduk berdasarkan jenis kelamin, wilayah dusun, usia, tingkat pendidikan, dan mata pencaharian.
            </p>
          </MotionSection>
          
          <DemographicsCharts />
        </div>
      </section>

      {/* Fasilitas & Potensi Terukur */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection className="text-center mb-16">
            <SectionHeading title="Fasilitas & Potensi Desa" centered />
          </MotionSection>

          <DetailedDemographics />
          
          <div className="mt-16 pt-8 border-t border-gray-100 flex justify-center">
            <p className="text-sm text-muted-foreground bg-gray-50 px-6 py-3 rounded-full border border-gray-100">
              <span className="font-semibold">Sumber data:</span> Pemerintah Desa Pudonggala | <span className="font-semibold">Diperbarui:</span> 2024
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
