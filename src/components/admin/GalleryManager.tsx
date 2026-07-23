"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { Trash2 } from "lucide-react";
import { uploadGalleryItem, deleteGalleryItem } from "@/actions/gallery";
import { toast } from "sonner";
import { GalleryItem } from "@prisma/client";
import { UploadButton } from "@/lib/uploadthing";

interface GalleryManagerProps {
  items: GalleryItem[];
}

export function GalleryManager({ items }: GalleryManagerProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus foto/video ini?")) return;
    startTransition(async () => {
      try {
        await deleteGalleryItem(id);
        toast.success("Berhasil dihapus!");
      } catch {
        toast.error("Gagal menghapus item.");
      }
    });
  };

  const handleUploadComplete = (res: { url: string; name: string }[]) => {
    startTransition(async () => {
      try {
        if (res && res.length > 0) {
          for (const file of res) {
            await uploadGalleryItem({
              type: "image",
              url: file.url,
              album: "Umum",
              alt: file.name,
            });
          }
          toast.success("Berhasil upload!");
        }
      } catch {
        toast.error("Gagal menyimpan data upload.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-foreground">Kelola Galeri</h1>
          <p className="text-muted-foreground mt-1 text-lg">Upload dan atur foto atau video galeri desa.</p>
        </div>
        <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-100">
          <UploadButton
            endpoint="imageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error: Error) => {
              toast.error(`ERROR! ${error.message}`);
            }}
          />
        </div>
      </div>

      {items.length === 0 ? (
        <div className="card-premium">
          <div className="py-20 text-center text-muted-foreground">
            Belum ada foto atau video di galeri.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div key={item.id} className="relative group rounded-2xl overflow-hidden shadow-glass border border-gray-100 hover:shadow-glass-lg hover:-translate-y-2 transition-all duration-500 bg-white p-2">
              <div className="aspect-square relative rounded-xl overflow-hidden">
                <ImageWithFallback src={item.thumbnail || item.url} alt={item.alt || "Gallery Item"} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    className="gap-2 shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 delay-100"
                    onClick={() => handleDelete(item.id)}
                    disabled={isPending}
                  >
                    <Trash2 className="w-4 h-4" />
                    Hapus
                  </Button>
                </div>
                <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 text-primary-dark font-medium text-xs rounded-full backdrop-blur-sm shadow-sm">
                  {item.album}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
