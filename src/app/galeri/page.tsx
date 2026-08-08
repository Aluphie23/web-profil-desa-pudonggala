import fs from "fs";
import path from "path";
import { PageHero } from "@/components/shared/PageHero";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export const revalidate = 60;

export default async function GaleriPage({
  searchParams,
}: {
  searchParams: { album?: string };
}) {
  const album = searchParams.album;

  const publicDir = path.join(process.cwd(), "public");
  
  // Get all directories dynamically, excluding 'logo'
  const allEntries = fs.existsSync(publicDir) ? fs.readdirSync(publicDir, { withFileTypes: true }) : [];
  const folderNames = allEntries
    .filter(dirent => dirent.isDirectory() && !['logo'].includes(dirent.name))
    .map(dirent => dirent.name);
  
  let items: any[] = [];
  let foldersData: { name: string; coverImage: string | null; count: number }[] = [];
  let orderCounter = 1;

  folderNames.forEach((folder) => {
    const folderPath = path.join(publicDir, folder);
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath);
      const imageFiles = files.filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file));
      
      if (imageFiles.length > 0) {
        foldersData.push({
          name: folder,
          coverImage: `/${folder}/${imageFiles[0]}`,
          count: imageFiles.length,
        });
      }

      if (album === folder) {
        imageFiles.forEach((file) => {
          items.push({
            id: `${folder}-${file}`,
            type: "image",
            url: `/${folder}/${file}`,
            alt: file.replace(/\.[^/.]+$/, ""),
            album: folder,
            order: orderCounter++,
          });
        });
      }
    }
  });

  return (
    <div className="flex flex-col min-h-screen">
      <PageHero
        title="Galeri Desa"
        subtitle="Kumpulan momen dan keindahan Desa Pudonggala dalam lensa."
        imageUrl="/pantai/pudonggalakelapa.jpeg"
        className="h-screen min-h-screen"
      />

      <section className="py-24 bg-muted/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <GalleryGrid 
            items={items} 
            folders={foldersData}
            currentAlbum={album || null} 
          />
        </div>
      </section>
    </div>
  );
}
