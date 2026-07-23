"use client";

import { useState } from "react";
import { UMKM, Destination } from "@prisma/client";
import { createUMKM, updateUMKM, deleteUMKM } from "@/actions/umkm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";
import { Edit2, Trash2, Plus, X, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface UMKMManagerProps {
  umkms: (UMKM & { destination: Destination | null })[];
  destinations: Destination[];
}

export function UMKMManager({ umkms, destinations }: UMKMManagerProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: "",
    ownerName: "",
    category: "Kuliner",
    description: "",
    priceRange: "",
    whatsapp: "",
    location: "",
    imageUrl: "",
    destinationId: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      ownerName: "",
      category: "Kuliner",
      description: "",
      priceRange: "",
      whatsapp: "",
      location: "",
      imageUrl: "",
      destinationId: "",
    });
    setEditingId(null);
    setIsEditing(false);
  };

  const handleEdit = (umkm: UMKM) => {
    setFormData({
      name: umkm.name,
      ownerName: umkm.ownerName,
      category: umkm.category,
      description: umkm.description,
      priceRange: umkm.priceRange || "",
      whatsapp: umkm.whatsapp || "",
      location: umkm.location,
      imageUrl: umkm.imageUrl || "",
      destinationId: umkm.destinationId || "",
    });
    setEditingId(umkm.id);
    setIsEditing(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await updateUMKM(editingId, formData);
        if (res.success) toast.success("Data berhasil diupdate!");
        else toast.error("Gagal update data");
      } else {
        const res = await createUMKM(formData);
        if (res.success) toast.success("UMKM berhasil ditambahkan!");
        else toast.error("Gagal menambah UMKM");
      }
      resetForm();
    } catch (error) {
      toast.error("Terjadi kesalahan");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Yakin ingin menghapus UMKM ini?")) {
      const res = await deleteUMKM(id);
      if (res.success) toast.success("UMKM berhasil dihapus!");
      else toast.error("Gagal menghapus");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Kelola UMKM</h2>
        {!isEditing && (
          <Button onClick={() => setIsEditing(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Tambah UMKM
          </Button>
        )}
      </div>

      {isEditing && (
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">{editingId ? "Edit UMKM" : "Tambah UMKM"}</h3>
              <Button variant="ghost" size="icon" onClick={resetForm}>
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Nama Usaha *</Label>
                  <Input required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>Nama Pemilik *</Label>
                  <Input required value={formData.ownerName} onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })} />
                </div>
                
                <div className="space-y-2">
                  <Label>Kategori *</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Kuliner">Kuliner</option>
                    <option value="Kerajinan">Kerajinan</option>
                    <option value="Jasa">Jasa</option>
                    <option value="Fashion">Fashion</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <Label>Destinasi Terkait (Opsional)</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    value={formData.destinationId}
                    onChange={(e) => setFormData({ ...formData, destinationId: e.target.value })}
                  >
                    <option value="">-- Tidak ada --</option>
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <Label>Lokasi / Alamat *</Label>
                  <Input required value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                </div>
                
                <div className="space-y-2">
                  <Label>Kisaran Harga</Label>
                  <Input placeholder="Contoh: Rp 10.000 - Rp 50.000" value={formData.priceRange} onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })} />
                </div>
                
                <div className="space-y-2">
                  <Label>Nomor WhatsApp (Tanpa angka 0, cth: 81234567890)</Label>
                  <Input type="number" placeholder="81234567890" value={formData.whatsapp} onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })} />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Deskripsi *</Label>
                <Textarea required rows={4} value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
              </div>

              <div className="space-y-2">
                <Label>Foto UMKM / Produk</Label>
                {formData.imageUrl ? (
                  <div className="relative w-40 h-40 rounded-xl overflow-hidden border">
                    <Image src={formData.imageUrl} alt="Preview" fill className="object-cover" />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    onClientUploadComplete={(res) => {
                      if (res?.[0]) setFormData({ ...formData, imageUrl: res[0].url });
                    }}
                    onUploadError={(error: Error) => { toast.error(`ERROR! ${error.message}`); }}
                  />
                )}
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button type="button" variant="outline" onClick={resetForm}>Batal</Button>
                <Button type="submit">Simpan</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {!isEditing && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {umkms.map((umkm) => (
            <Card key={umkm.id} className="overflow-hidden">
              {umkm.imageUrl ? (
                <div className="relative h-48 w-full bg-muted">
                  <Image src={umkm.imageUrl} alt={umkm.name} fill className="object-cover" />
                  <span className="absolute top-2 left-2 px-2 py-1 bg-black/60 text-white text-xs rounded-full">
                    {umkm.category}
                  </span>
                </div>
              ) : (
                <div className="h-48 w-full bg-muted flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-muted-foreground/30" />
                </div>
              )}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg mb-1">{umkm.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">Pemilik: {umkm.ownerName}</p>
                <p className="text-sm line-clamp-2 mb-4">{umkm.description}</p>
                
                <div className="flex justify-between items-center border-t pt-4">
                  <span className="text-xs text-muted-foreground">
                    {umkm.destination ? `Dekat ${umkm.destination.name}` : umkm.location}
                  </span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => handleEdit(umkm)}>
                      <Edit2 className="w-4 h-4" />
                    </Button>
                    <Button variant="destructive" size="icon" onClick={() => handleDelete(umkm.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {umkms.length === 0 && (
            <div className="col-span-full py-12 text-center text-muted-foreground">
              Belum ada data UMKM.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
