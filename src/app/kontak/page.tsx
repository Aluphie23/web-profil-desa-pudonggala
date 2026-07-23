import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const revalidate = 60;

export default async function KontakPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  const contactInfo = [
    { icon: MapPin, label: "Alamat", value: profile.address, color: "from-primary to-primary-dark" },
    { icon: Phone, label: "Telepon", value: profile.phone, color: "from-blue-500 to-blue-600" },
    { icon: Mail, label: "Email", value: profile.email, color: "from-accent to-accent-dark" },
    { icon: Clock, label: "Jam Kerja", value: profile.officeHours, color: "from-pink-500 to-pink-600" },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Hubungi Kami"
        subtitle="Kami siap mendengarkan saran, pertanyaan, atau membantu rencana kunjungan Anda."
        imageUrl="https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col lg:flex-row gap-14 max-w-6xl mx-auto">
            {/* Contact Form */}
            <MotionSection direction="left" className="lg:w-1/2">
              <div className="bg-white p-8 md:p-10 rounded-3xl shadow-glass-lg border border-gray-100 hover:shadow-glass-lg transition-shadow duration-500">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2">
                  Kirim Pesan
                </h2>
                <p className="text-muted-foreground mb-8 text-sm">Isi formulir di bawah ini dan kami akan segera merespons.</p>
                <ContactForm />
              </div>
            </MotionSection>

            {/* Contact Info Cards */}
            <div className="lg:w-1/2 space-y-6">
              <MotionSection direction="right">
                <h2 className="text-2xl font-serif font-bold text-foreground mb-2 hidden lg:block">
                  Informasi Kontak
                </h2>
                <p className="text-muted-foreground mb-8 text-sm hidden lg:block">Anda juga bisa menghubungi kami melalui informasi berikut.</p>
              </MotionSection>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-4" initialDelay={0.2}>
                {contactInfo.map((info, idx) => {
                  const Icon = info.icon;
                  return (
                    <StaggerItem key={idx}>
                      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-glass hover:shadow-glass-lg hover:-translate-y-1 transition-all duration-300">
                        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${info.color} flex items-center justify-center mb-4 shadow-lg`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <h3 className="font-semibold text-foreground text-sm mb-1">{info.label}</h3>
                        <p className="text-muted-foreground text-sm">{info.value}</p>
                      </div>
                    </StaggerItem>
                  );
                })}
              </StaggerContainer>

              <MotionSection delay={0.5}>
                <div className="mt-6 relative w-full h-[280px] rounded-2xl overflow-hidden shadow-glass border border-gray-100 group">
                  <iframe
                    src="https://maps.google.com/maps?q=-3.7882585,122.4528668&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  ></iframe>
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                    <a 
                      href="https://maps.app.goo.gl/gu2TPkhpG25MwagWA" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-block bg-white/90 backdrop-blur-sm text-primary-dark px-5 py-2 rounded-full text-sm font-semibold shadow-lg border border-gray-200 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                    >
                      Buka di Google Maps
                    </a>
                  </div>
                </div>
              </MotionSection>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
