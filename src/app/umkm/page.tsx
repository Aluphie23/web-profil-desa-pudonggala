import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Store, MapPin, Phone, ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { Button } from "@/components/ui/button";

export const revalidate = 60;

export default async function UMKMPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const umkms = await prisma.uMKM.findMany({
    where: category && category !== "Semua" ? { category } : undefined,
    orderBy: { createdAt: "desc" },
    include: { destination: true }
  });

  const categories = ["Semua", "Kuliner", "Kerajinan", "Jasa", "Fashion", "Lainnya"];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Produk Lokal & UMKM"
        subtitle="Dukung perekonomian lokal dengan berbelanja produk asli dari masyarakat Desa Pudonggala."
        imageUrl="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Filters */}
          <MotionSection className="flex flex-wrap gap-3 justify-center mb-14">
            {categories.map((c) => (
              <Link key={c} href={c === "Semua" ? "/umkm" : `/umkm?category=${c}`}>
                <span
                  className={`inline-block px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    (!category && c === "Semua") || category === c
                      ? "bg-gradient-primary text-white shadow-glow"
                      : "bg-white text-muted-foreground border border-gray-200 hover:border-primary/30 hover:text-primary hover:shadow-sm"
                  }`}
                >
                  {c}
                </span>
              </Link>
            ))}
          </MotionSection>

          {/* Grid */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {umkms.map((umkm) => (
              <StaggerItem key={umkm.id}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:-translate-y-3 flex flex-col h-full">
                  <div className="relative h-56 w-full overflow-hidden bg-muted">
                    <ImageWithFallback
                      src={umkm.imageUrl}
                      alt={umkm.name}
                      fill
                      className="group-hover:scale-110 transition-transform duration-700"
                      fallbackText="Tidak ada foto"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
                        {umkm.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-serif font-bold text-foreground mb-1">
                      {umkm.name}
                    </h3>
                    <p className="text-primary-dark text-sm font-medium mb-3 flex items-center gap-1.5">
                      <Store className="w-4 h-4" />
                      {umkm.ownerName}
                    </p>
                    
                    <p className="text-muted-foreground line-clamp-3 mb-4 text-sm leading-relaxed flex-1">
                      {umkm.description}
                    </p>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex items-center gap-2 text-sm text-foreground/80">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="line-clamp-1">{umkm.location}</span>
                      </div>
                      {umkm.priceRange && (
                        <div className="flex items-center gap-2 text-sm text-foreground/80 font-semibold">
                          <span className="text-primary">Harga:</span> {umkm.priceRange}
                        </div>
                      )}
                    </div>
                    
                    {umkm.whatsapp ? (
                      <Button asChild className="w-full bg-[#25D366] hover:bg-[#128C7E] text-white rounded-xl shadow-md transition-all">
                        <a href={`https://wa.me/${umkm.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer">
                          <Phone className="w-4 h-4 mr-2" />
                          Pesan via WhatsApp
                        </a>
                      </Button>
                    ) : (
                      <Button variant="outline" className="w-full rounded-xl border-dashed" disabled>
                        Tersedia di Lokasi
                      </Button>
                    )}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {umkms.length === 0 && (
            <MotionSection className="text-center py-20 text-muted-foreground">
              <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-10 h-10 text-muted-foreground/50" />
              </div>
              <p className="text-xl font-medium">Belum ada data UMKM.</p>
              <p className="mt-2 text-sm">Coba ubah kategori atau hubungi pihak desa untuk mendaftar.</p>
            </MotionSection>
          )}
        </div>
      </section>
    </div>
  );
}
