import { prisma } from "@/lib/prisma";
import { MapPin, Image as ImageIcon, MessageSquare, Bell, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { StaggerContainer, StaggerItem } from "@/components/animations/StaggerContainer";
import { MotionSection } from "@/components/animations/MotionSection";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  const session = await auth();

  const [
    destCount,
    galleryCount,
    totalMessages,
    unreadMessages,
    recentMessages,
  ] = await Promise.all([
    prisma.destination.count(),
    prisma.galleryItem.count(),
    prisma.message.count(),
    prisma.message.count({ where: { isRead: false } }),
    prisma.message.findMany({
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <div className="space-y-10">
      <MotionSection direction="up">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
          Selamat Datang, <span className="text-transparent bg-clip-text bg-gradient-primary">{session?.user?.name || "Admin"}</span>!
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Berikut adalah ringkasan data website Desa Pudonggala hari ini.
        </p>
      </MotionSection>

      <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StaggerItem>
          <div className="card-premium p-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Total Destinasi</h3>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
            </div>
            <div className="text-3xl font-bold font-serif">{destCount}</div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="card-premium p-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Total Galeri</h3>
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-accent" />
              </div>
            </div>
            <div className="text-3xl font-bold font-serif">{galleryCount}</div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="card-premium p-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Pesan Masuk</h3>
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-blue-500" />
              </div>
            </div>
            <div className="text-3xl font-bold font-serif">{totalMessages}</div>
          </div>
        </StaggerItem>
        <StaggerItem>
          <div className="card-premium p-6">
            <div className="flex flex-row items-center justify-between pb-4">
              <h3 className="text-sm font-medium text-muted-foreground">Belum Dibaca</h3>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <Bell className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <div className="text-3xl font-bold font-serif text-destructive">{unreadMessages}</div>
          </div>
        </StaggerItem>
      </StaggerContainer>

      <StaggerContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8" initialDelay={0.3}>
        <StaggerItem>
          <div className="card-premium overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-row justify-between items-center bg-gray-50/50">
              <h3 className="text-lg font-serif font-bold text-foreground">Pesan Terbaru</h3>
              <Link href="/admin/pesan" className="text-sm text-primary hover:text-primary-dark font-medium flex items-center gap-1 transition-colors">
                Lihat Semua <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6">
              {recentMessages.length === 0 ? (
                <p className="text-muted-foreground text-sm py-4 text-center">Belum ada pesan masuk.</p>
              ) : (
                <div className="space-y-5">
                  {recentMessages.map((msg) => (
                    <div key={msg.id} className="flex flex-col gap-1 border-b pb-5 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-sm text-foreground">{msg.name}</span>
                        {!msg.isRead && (
                          <span className="px-2 py-0.5 rounded-full bg-destructive/10 text-destructive text-xs font-semibold">Baru</span>
                        )}
                      </div>
                      <span className="text-xs text-muted-foreground">{msg.email}</span>
                      <p className="text-sm mt-2 line-clamp-2 text-foreground/80 leading-relaxed">{msg.message}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </StaggerItem>

        <StaggerItem>
          <div className="card-premium overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
              <h3 className="text-lg font-serif font-bold text-foreground">Aksi Cepat</h3>
            </div>
            <div className="p-6 space-y-4">
              <Button className="w-full justify-start gap-3 bg-gradient-primary text-white hover:shadow-glow transition-all rounded-xl h-12" asChild>
                <Link href="/admin/destinasi">
                  <MapPin className="w-5 h-5" />
                  Kelola Destinasi Wisata
                </Link>
              </Button>
              <Button className="w-full justify-start gap-3 border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all rounded-xl h-12" variant="outline" asChild>
                <Link href="/admin/galeri">
                  <ImageIcon className="w-5 h-5" />
                  Upload Foto/Video Galeri
                </Link>
              </Button>
              <Button className="w-full justify-start gap-3 border-gray-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary transition-all rounded-xl h-12" variant="outline" asChild>
                <Link href="/admin/profil">
                  <FileText className="w-5 h-5" />
                  Update Data Profil Desa
                </Link>
              </Button>
            </div>
          </div>
        </StaggerItem>
      </StaggerContainer>
    </div>
  );
}
