import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Users, UserPlus, UserMinus, Home, Target, CheckCircle2 } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";

export const revalidate = 60;

export default async function ProfilPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  let missions: string[] = [];
  try {
    missions = JSON.parse(profile.mission);
  } catch {
    missions = [profile.mission];
  }

  const statCards = [
    { icon: Users, value: profile.population, label: "Total Penduduk", color: "from-primary to-primary-dark" },
    { icon: UserPlus, value: profile.malePop, label: "Laki-laki", color: "from-blue-500 to-blue-600" },
    { icon: UserMinus, value: profile.femalePop, label: "Perempuan", color: "from-pink-500 to-pink-600" },
    { icon: Home, value: profile.households, label: "Kepala Keluarga", color: "from-accent to-accent-dark" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Profil Desa"
        subtitle="Mengenal lebih dekat sejarah, demografi, dan visi misi desa kami."
        imageUrl="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1920&q=80"
      />

      {/* Sejarah Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <MotionSection direction="left" className="lg:w-1/2">
              <SectionHeading title="Sejarah Desa" />
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                {profile.history.split("\n").map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </MotionSection>
            <MotionSection direction="right" className="lg:w-1/2">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-glass-lg ring-1 ring-black/5">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80"
                  alt="Sejarah Desa Pudonggala"
                  fill
                />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Demografi Section */}
      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <MotionSection>
            <SectionHeading title="Demografi" centered />
          </MotionSection>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statCards.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <StaggerItem key={idx}>
                  <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 shadow-glass hover:shadow-glass-lg hover:-translate-y-2 transition-all duration-500">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <AnimatedCounter target={parseInt(stat.value) || 0} className="text-3xl font-bold text-foreground mb-1 block" />
                    <p className="text-muted-foreground text-sm font-medium">{stat.label}</p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <MotionSection>
              <SectionHeading title="Visi & Misi" centered />
            </MotionSection>
            
            <MotionSection delay={0.2}>
              <div className="bg-gradient-to-br from-primary/5 via-primary-light/50 to-accent-light/30 rounded-3xl p-10 md:p-14 mb-14 text-center border border-primary/10 shadow-glass">
                <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 shadow-glow">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif italic text-foreground font-medium leading-relaxed">
                  &quot;{profile.vision}&quot;
                </h3>
              </div>
            </MotionSection>

            <StaggerContainer className="space-y-3">
              <h4 className="text-xl font-bold text-foreground mb-8 text-center">Misi Desa:</h4>
              {missions.map((mission, idx) => (
                <StaggerItem key={idx}>
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-glass hover:border-primary/20 transition-all duration-300">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-lg text-muted-foreground leading-relaxed">{mission}</p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>
    </div>
  );
}
