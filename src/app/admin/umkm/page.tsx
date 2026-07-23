import { prisma } from "@/lib/prisma";
import { UMKMManager } from "@/components/admin/UMKMManager";

export const revalidate = 0;

export default async function AdminUMKMPage() {
  const [umkms, destinations] = await Promise.all([
    prisma.uMKM.findMany({
      orderBy: { createdAt: "desc" },
      include: { destination: true },
    }),
    prisma.destination.findMany({
      orderBy: { name: "asc" },
    }),
  ]);

  return <UMKMManager umkms={umkms} destinations={destinations} />;
}
