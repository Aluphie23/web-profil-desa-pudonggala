"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { createDestination, updateDestination, deleteDestination } from "@/actions/destinations";
import { toast } from "sonner";
import { Destination } from "@prisma/client";

interface DestinationManagerProps {
  destinations: Destination[];
}

export function DestinationManager({ destinations }: DestinationManagerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    slug: "",
    name: "",
    category: "Pantai",
    shortDesc: "",
    description: "",
    facilities: "",
    location: "",
    openingHours: "",
    ticketPrice: "",
    bestTimeToVisit: "",
    featured: false,
    imageUrl: "",
  });

  const openCreate = () => {
    setEditingDest(null);
    setFormData({
      slug: "",
      name: "",
      category: "Pantai",
      shortDesc: "",
      description: "",
      facilities: "",
      location: "",
      openingHours: "",
      ticketPrice: "",
      bestTimeToVisit: "",
      featured: false,
      imageUrl: "",
    });
    setIsOpen(true);
  };

  const openEdit = (dest: Destination) => {
    setEditingDest(dest);
    let fac = "";
    try { fac = JSON.parse(dest.facilities).join(", "); } catch { fac = dest.facilities; }
    
    setFormData({
      slug: dest.slug,
      name: dest.name,
      category: dest.category,
      shortDesc: dest.shortDesc,
      description: dest.description,
      facilities: fac,
      location: dest.location,
      openingHours: dest.openingHours || "",
      ticketPrice: dest.ticketPrice || "",
      bestTimeToVisit: dest.bestTimeToVisit || "",
      featured: dest.featured,
      imageUrl: "", // We don't load the existing image url into the form here for simplicity
    });
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const payload = {
          ...formData,
          facilities: formData.facilities.split(",").map(f => f.trim()).filter(Boolean),
        };
        
        if (editingDest) {
          await updateDestination(editingDest.id, payload);
          toast.success("Destinasi berhasil diperbarui!");
        } else {
          await createDestination(payload);
          toast.success("Destinasi berhasil ditambahkan!");
        }
        setIsOpen(false);
      } catch {
        toast.error("Gagal menyimpan destinasi.");
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus destinasi ini?")) return;
    
    startTransition(async () => {
      try {
        await deleteDestination(id);
        toast.success("Destinasi berhasil dihapus.");
      } catch {
        toast.error("Gagal menghapus destinasi.");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-serif font-bold text-primary-dark">Kelola Destinasi</h1>
          <p className="text-muted-foreground mt-1">Atur daftar destinasi wisata yang tampil di website.</p>
        </div>
        <Button className="gap-2" onClick={openCreate}>
          <Plus className="w-4 h-4" />
          Tambah Destinasi
        </Button>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingDest ? "Edit Destinasi" : "Tambah Destinasi"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nama</label>
                <Input name="name" value={formData.name} onChange={handleChange} required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Slug</label>
                <Input name="slug" value={formData.slug} onChange={handleChange} required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Kategori</label>
                <select name="category" value={formData.category} onChange={handleChange} className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:opacity-50" disabled={isPending}>
                  <option value="Pantai">Pantai</option>
                  <option value="Alam">Alam</option>
                  <option value="Budaya">Budaya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Lokasi</label>
                <Input name="location" value={formData.location} onChange={handleChange} required disabled={isPending} />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Deskripsi Singkat</label>
              <Input name="shortDesc" value={formData.shortDesc} onChange={handleChange} required disabled={isPending} />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Deskripsi Lengkap</label>
              <Textarea name="description" value={formData.description} onChange={handleChange} required rows={4} disabled={isPending} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Fasilitas (pisahkan dengan koma)</label>
                <Input name="facilities" value={formData.facilities} onChange={handleChange} required disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Jam Buka</label>
                <Input name="openingHours" value={formData.openingHours} onChange={handleChange} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Harga Tiket</label>
                <Input name="ticketPrice" value={formData.ticketPrice} onChange={handleChange} disabled={isPending} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Waktu Terbaik</label>
                <Input name="bestTimeToVisit" value={formData.bestTimeToVisit} onChange={handleChange} disabled={isPending} />
              </div>
            </div>

            {!editingDest && (
              <div className="space-y-2">
                <label className="text-sm font-medium">URL Gambar (Opsional untuk sekarang)</label>
                <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} disabled={isPending} />
              </div>
            )}
            
            <div className="flex items-center gap-2 pt-2">
              <input type="checkbox" id="featured" name="featured" checked={formData.featured} onChange={handleChange} disabled={isPending} />
              <label htmlFor="featured" className="text-sm font-medium">Jadikan Destinasi Unggulan</label>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)} disabled={isPending}>Batal</Button>
              <Button type="submit" disabled={isPending}>
                {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Simpan
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground">Daftar Destinasi</h2>
          <p className="text-muted-foreground mt-1">Kelola destinasi wisata yang ditampilkan di website.</p>
        </div>
        <Button onClick={openCreate} className="bg-gradient-primary text-white hover:shadow-glow rounded-xl">
          <Plus className="w-4 h-4 mr-2" />
          Tambah Destinasi
        </Button>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-gray-50/50">
              <TableRow>
                <TableHead className="w-[200px]">Nama</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {destinations.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                    Belum ada data destinasi.
                  </TableCell>
                </TableRow>
              ) : (
                destinations.map((dest) => (
                  <TableRow key={dest.id} className="hover:bg-primary/5 transition-colors">
                    <TableCell className="font-medium text-foreground">{dest.name}</TableCell>
                    <TableCell>
                      <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {dest.category}
                      </span>
                    </TableCell>
                    <TableCell>
                      {dest.featured ? (
                        <span className="px-2.5 py-1 bg-accent/10 text-accent-dark rounded-full text-xs font-medium">
                          Unggulan
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                          Biasa
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(dest)} className="hover:text-primary hover:bg-primary/10">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => handleDelete(dest.id)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
