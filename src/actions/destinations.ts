/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function createDestination(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const destination = await prisma.destination.create({
    data: {
      slug: data.slug,
      name: data.name,
      category: data.category,
      shortDesc: data.shortDesc,
      description: data.description,
      facilities: JSON.stringify(data.facilities || []),
      location: data.location,
      openingHours: data.openingHours,
      ticketPrice: data.ticketPrice,
      bestTimeToVisit: data.bestTimeToVisit,
      featured: data.featured,
    },
  });

  if (data.imageUrl) {
    await prisma.destinationImage.create({
      data: {
        url: data.imageUrl,
        destinationId: destination.id,
        order: 1,
      },
    });
  }

  revalidatePath("/admin/destinasi");
  revalidatePath("/wisata");
  return destination;
}

export async function updateDestination(id: string, data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const destination = await prisma.destination.update({
    where: { id },
    data: {
      slug: data.slug,
      name: data.name,
      category: data.category,
      shortDesc: data.shortDesc,
      description: data.description,
      facilities: JSON.stringify(data.facilities || []),
      location: data.location,
      openingHours: data.openingHours,
      ticketPrice: data.ticketPrice,
      bestTimeToVisit: data.bestTimeToVisit,
      featured: data.featured,
    },
  });

  revalidatePath("/admin/destinasi");
  revalidatePath("/wisata");
  revalidatePath(`/wisata/${destination.slug}`);
  return destination;
}

export async function deleteDestination(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.destination.delete({
    where: { id },
  });

  revalidatePath("/admin/destinasi");
  revalidatePath("/wisata");
  return { success: true };
}
