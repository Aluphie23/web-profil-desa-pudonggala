/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function uploadGalleryItem(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const item = await prisma.galleryItem.create({
    data: {
      type: data.type,
      url: data.url,
      album: data.album,
      order: data.order || 0,
      alt: data.alt,
    },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  return item;
}

export async function deleteGalleryItem(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.galleryItem.delete({
    where: { id },
  });

  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  return { success: true };
}
