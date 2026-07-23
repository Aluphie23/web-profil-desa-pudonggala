import { prisma } from "@/lib/prisma";
import { DestinationManager } from "@/components/admin/DestinationManager";

export const revalidate = 0;

export default async function AdminDestinasiPage() {
  const destinations = await prisma.destination.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <DestinationManager destinations={destinations} />;
}
