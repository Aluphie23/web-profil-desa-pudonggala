import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/GalleryManager";

export const revalidate = 0;

export default async function AdminGaleriPage() {
  const items = await prisma.galleryItem.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <GalleryManager items={items} />;
}
