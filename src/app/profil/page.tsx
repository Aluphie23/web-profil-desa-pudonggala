import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Target, CheckCircle2, MapPin, Building2, Trees, Map, Users } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

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
                  <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
              </div>
            </MotionSection>
            <MotionSection direction="right" className="lg:w-1/2">
              <div className="relative w-full h-[400px] rounded-3xl overflow-hidden shadow-glass-lg ring-1 ring-black/5">
                <ImageWithFallback
                  src={profile.officeImageUrl || "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1200&q=80"}
                  alt={`Kantor ${profile.name}`}
                  fill
                />
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Visi & Misi Section */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
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

      {/* Kondisi Geografis Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <SectionHeading title="Kondisi Geografis" centered />
          </MotionSection>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionSection delay={0.1} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-center">
              <MapPin className="w-12 h-12 text-primary mb-6" />
              <h3 className="text-2xl font-bold mb-4">Letak & Luas Wilayah</h3>
              <p className="text-muted-foreground leading-relaxed">
                Desa Pudonggala berlokasi di Kecamatan Sawa, Kabupaten Konawe Utara. Memiliki total bentang alam seluas <strong className="text-foreground">10,20 km²</strong>, wilayah ini didominasi oleh topografi pesisir pantai dan dataran rendah yang subur.
              </p>
            </MotionSection>
            <MotionSection delay={0.2} className="bg-gray-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-center">
              <Map className="w-12 h-12 text-accent mb-6" />
              <h3 className="text-2xl font-bold mb-4">Batas Wilayah</h3>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex items-center gap-3"><span className="w-20 font-semibold text-foreground">Utara:</span> Berbatasan dengan Desa Pudonggala Utama</li>
                <li className="flex items-center gap-3"><span className="w-20 font-semibold text-foreground">Timur:</span> Berbatasan dengan Laut Banda</li>
                <li className="flex items-center gap-3"><span className="w-20 font-semibold text-foreground">Selatan:</span> Berbatasan dengan Desa Wawoluri</li>
                <li className="flex items-center gap-3"><span className="w-20 font-semibold text-foreground">Barat:</span> Berbatasan dengan Desa Kokapi</li>
              </ul>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Wilayah Administratif & Pemerintahan */}
      <section className="py-24 bg-muted/30 relative overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <MotionSection>
            <SectionHeading title="Pemerintahan & Administratif" centered />
          </MotionSection>
          <div className="max-w-5xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <MotionSection delay={0.1}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-4">Wilayah Administratif</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Secara administratif, Desa Pudonggala terbagi menjadi <strong className="text-foreground">3 Dusun</strong> utama yang menaungi seluruh warga:
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Dusun 1</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Dusun 2</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-primary" /> Dusun 3</li>
                </ul>
              </div>
            </MotionSection>
            <MotionSection delay={0.2}>
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm h-full">
                <Building2 className="w-10 h-10 text-accent mb-4" />
                <h3 className="text-xl font-bold mb-4">Struktur Pemerintahan</h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Pemerintahan Desa Pudonggala dijalankan oleh Kepala Desa beserta jajaran perangkat desa dan Badan Permusyawaratan Desa (BPD) guna melayani administrasi warga.
                </p>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center justify-between border-b border-gray-50 pb-2">
                    <span>Kepala Desa</span><span className="font-medium text-foreground">[Nama Kepala Desa]</span>
                  </li>
                  <li className="flex items-center justify-between border-b border-gray-50 pb-2 pt-2">
                    <span>Sekretaris Desa</span><span className="font-medium text-foreground">[Nama Sekretaris]</span>
                  </li>
                  <li className="flex items-center justify-between pt-2">
                    <span>Ketua BPD</span><span className="font-medium text-foreground">[Nama Ketua BPD]</span>
                  </li>
                </ul>
              </div>
            </MotionSection>
          </div>
        </div>
      </section>

      {/* Potensi Desa & Fasilitas */}
      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <MotionSection direction="left" className="lg:w-1/2">
              <SectionHeading title="Potensi Desa" />
              <div className="space-y-6 mt-8">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center shrink-0">
                    <Trees className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Pertanian & Perkebunan</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Sebagian besar wilayah digunakan untuk lahan produktif, menghasilkan komoditas lokal yang unggul dan mendongkrak ekonomi warga.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-2">Pariwisata Bahari</h4>
                    <p className="text-muted-foreground leading-relaxed">
                      Memiliki garis pantai yang indah, Desa Pudonggala terus mengembangkan sektor wisata pantai sebagai destinasi unggulan Kabupaten Konawe Utara.
                    </p>
                  </div>
                </div>
              </div>
            </MotionSection>
            
            <MotionSection direction="right" className="lg:w-1/2 w-full">
              <SectionHeading title="Peta & Fasilitas" />
              <div className="mt-8 rounded-3xl overflow-hidden shadow-glass ring-1 ring-black/5 bg-gray-100 h-[350px] relative flex items-center justify-center group">
                <iframe 
                  className="absolute inset-0 w-full h-full grayscale-[20%] group-hover:grayscale-0 transition-all duration-700" 
                  frameBorder="0" 
                  scrolling="no" 
                  marginHeight={0} 
                  marginWidth={0} 
                  src="https://maps.google.com/maps?q=Desa%20Pudonggala,%20Kecamatan%20Sawa,%20Kabupaten%20Konawe%20Utara&t=m&z=13&output=embed&iwloc=near"
                  title="Peta Desa Pudonggala"
                ></iframe>
              </div>
              <p className="text-muted-foreground leading-relaxed mt-6">
                Desa ini dilengkapi dengan berbagai fasilitas umum seperti Sekolah Dasar, Taman Kanak-kanak, Masjid, serta pusat layanan kesehatan desa (Posyandu/Pustu) yang mudah diakses oleh warga.
              </p>
            </MotionSection>
          </div>
        </div>
      </section>
    </div>
  );
}
