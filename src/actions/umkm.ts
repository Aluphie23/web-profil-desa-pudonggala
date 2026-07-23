"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createUMKM(data: any) {
  try {
    await prisma.uMKM.create({
      data: {
        name: data.name,
        ownerName: data.ownerName,
        category: data.category,
        description: data.description,
        priceRange: data.priceRange,
        whatsapp: data.whatsapp,
        location: data.location,
        imageUrl: data.imageUrl,
        destinationId: data.destinationId || null,
      },
    });
    revalidatePath("/umkm");
    revalidatePath("/wisata");
    revalidatePath("/");
    revalidatePath("/admin/umkm");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateUMKM(id: string, data: any) {
  try {
    await prisma.uMKM.update({
      where: { id },
      data: {
        name: data.name,
        ownerName: data.ownerName,
        category: data.category,
        description: data.description,
        priceRange: data.priceRange,
        whatsapp: data.whatsapp,
        location: data.location,
        imageUrl: data.imageUrl,
        destinationId: data.destinationId || null,
      },
    });
    revalidatePath("/umkm");
    revalidatePath("/wisata");
    revalidatePath("/");
    revalidatePath("/admin/umkm");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteUMKM(id: string) {
  try {
    await prisma.uMKM.delete({ where: { id } });
    revalidatePath("/umkm");
    revalidatePath("/wisata");
    revalidatePath("/");
    revalidatePath("/admin/umkm");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
