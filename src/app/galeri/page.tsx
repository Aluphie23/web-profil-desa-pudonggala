import { prisma } from "@/lib/prisma";
import { PageHero } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const revalidate = 60;

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: { album?: string };
}) {
  const album = searchParams.album;

  const items = await prisma.galleryItem.findMany({
    where: album && album !== "Semua" ? { album } : undefined,
    orderBy: { order: "asc" },
  });

  const albumsRaw = await prisma.galleryItem.findMany({
    select: { album: true },
    distinct: ["album"],
  });
  const albums = ["Semua", ...albumsRaw.map((a) => a.album).filter(Boolean)];

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Galeri Desa"
        subtitle="Kumpulan momen dan keindahan Desa Pudonggala dalam lensa."
        imageUrl="/pudonggalakelapa.jpeg"
        className="h-screen min-h-screen"
      />

      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <GalleryGrid items={items} albums={albums} currentAlbum={album || "Semua"} />
        </div>
      </section>
    </div>
  );
}
