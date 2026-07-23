import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { ArrowRight } from "lucide-react";
import { MotionSection } from "@/components/animations/MotionSection";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";

export const revalidate = 60;

export default async function WisataPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category;

  const destinations = await prisma.destination.findMany({
    where: category && category !== "Semua" ? { category } : undefined,
    include: { images: { orderBy: { order: "asc" }, take: 1 } },
    orderBy: { featured: "desc" },
  });

  const categories = ["Semua", "Pantai", "Alam", "Budaya"];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Destinasi Wisata"
        subtitle="Jelajahi keindahan alam dan budaya yang ditawarkan oleh Desa Pudonggala."
        imageUrl="https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="py-16 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Filters */}
          <MotionSection className="flex flex-wrap gap-3 justify-center mb-14">
            {categories.map((c) => (
              <Link key={c} href={c === "Semua" ? "/wisata" : `/wisata?category=${c}`}>
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
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {destinations.map((dest) => (
              <StaggerItem key={dest.id}>
                <Link href={`/wisata/${dest.slug}`} className="block group">
                  <div className="bg-white rounded-2xl overflow-hidden shadow-glass hover:shadow-glass-lg border border-gray-100 hover:border-primary/20 transition-all duration-500 hover:-translate-y-3">
                    <div className="relative h-64 w-full overflow-hidden">
                      <ImageWithFallback
                        src={dest.images[0]?.url}
                        alt={dest.name}
                        fill
                        className="group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-sm text-primary-dark shadow-sm">
                          {dest.category}
                        </span>
                        {dest.featured && (
                          <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-accent/90 backdrop-blur-sm text-white shadow-sm">
                            ⭐ Unggulan
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-serif font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {dest.name}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4 text-sm leading-relaxed">
                        {dest.shortDesc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                        Lihat Detail
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {destinations.length === 0 && (
            <MotionSection className="text-center py-20 text-muted-foreground">
              <p className="text-xl">Tidak ada destinasi ditemukan untuk kategori ini.</p>
            </MotionSection>
          )}
        </div>
      </section>
    </div>
  );
}
