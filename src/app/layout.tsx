import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "sonner";
import { SplashScreen } from "@/components/animations/SplashScreen";
import { prisma } from "@/lib/prisma";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const dmSerif = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-dm-serif",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Desa Pudonggala | Pesona Alam Sulawesi Tenggara",
  description: "Website Resmi Profil dan Pariwisata Desa Pudonggala, Sulawesi Tenggara.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profile = await prisma.villageProfile.findFirst();

  return (
    <html lang="id" className={cn(jakarta.variable, dmSerif.variable)}>
      <body className="font-sans antialiased text-foreground bg-background flex flex-col min-h-screen relative">
        <SplashScreen />
        <Header logoUrl={profile?.logoUrl} />
        <main className="flex-1">
          {children}
        </main>
        <Footer logoUrl={profile?.logoUrl} />
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
