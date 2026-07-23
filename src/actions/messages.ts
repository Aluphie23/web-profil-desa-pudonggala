/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";

export async function submitMessage(data: any) {
  const message = await prisma.message.create({
    data: {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
    },
  });

  // Here you can integrate Resend to send email notifications
  // await sendEmailNotification(message);

  return message;
}

export async function markAsRead(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.message.update({
    where: { id },
    data: { isRead: true },
  });

  revalidatePath("/admin/pesan");
  return { success: true };
}

export async function markAsUnread(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.message.update({
    where: { id },
    data: { isRead: false },
  });

  revalidatePath("/admin/pesan");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  await prisma.message.delete({
    where: { id },
  });

  revalidatePath("/admin/pesan");
  return { success: true };
}
