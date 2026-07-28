/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function updateVillageProfile(data: any) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const existingProfile = await prisma.villageProfile.findFirst();

  if (!existingProfile) {
    throw new Error("Village profile not found.");
  }

  const updatedProfile = await prisma.villageProfile.update({
    where: { id: existingProfile.id },
    data: {
      name: data.name,
      tagline: data.tagline,
      history: data.history,
      vision: data.vision,
      mission: JSON.stringify(data.mission || []),
      population: data.population,
      households: data.households,
      malePop: data.malePop,
      femalePop: data.femalePop,
      area: data.area,
      address: data.address,
      phone: data.phone,
      email: data.email,
      officeHours: data.officeHours,
      logoUrl: data.logoUrl,
      logoKabUrl: data.logoKabUrl,
      heroImageUrl: data.heroImageUrl,
      officeImageUrl: data.officeImageUrl,
      district: data.district,
      regency: data.regency,
      province: data.province,
    },
  });

  revalidatePath("/admin/profil");
  revalidatePath("/profil");
  revalidatePath("/");
  return updatedProfile;
}
