import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { MapPin, Phone, Mail, Clock, AtSign } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const revalidate = 60;

export default async function KontakPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  const contactInfo = [
    { icon: MapPin, label: "Alamat", value: profile.address, color: "from-primary to-primary-dark" },
    { icon: Phone, label: "Telepon", value: "0822-8876-7876 / 0813-3246-8276", color: "from-blue-500 to-blue-600" },
    { icon: Mail, label: "Email", value: profile.email, color: "from-accent to-accent-dark" },
    { 
      icon: AtSign, 
      label: "Instagram", 
      value: (
        <a 
          href="https://www.instagram.com/samara.gala?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          @samara.gala
        </a>
      ), 
      color: "from-pink-500 to-purple-600" 
    },
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
          <div className="max-w-4xl mx-auto">
            {/* Contact Info Cards */}
            <div className="space-y-8">
              <MotionSection direction="up" className="text-center">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-4">
                  Informasi Kontak
                </h2>
                <p className="text-muted-foreground mb-8 text-base">Anda bisa menghubungi kami melalui informasi berikut.</p>
              </MotionSection>
              
              <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 gap-6" initialDelay={0.2}>
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


            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
