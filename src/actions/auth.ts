"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

export async function login(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });
    return "success";
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut({ redirectTo: "/admin/login" });
  revalidatePath("/");
}
