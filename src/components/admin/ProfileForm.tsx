"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Save } from "lucide-react";
import { updateVillageProfile } from "@/actions/profile";
import { toast } from "sonner";
import { VillageProfile } from "@prisma/client";

interface ProfileFormProps {
  profile: VillageProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [isPending, startTransition] = useTransition();

  const [formData, setFormData] = useState({
    name: profile.name,
    tagline: profile.tagline,
    history: profile.history,
    vision: profile.vision,
    mission: (() => {
      try {
        return JSON.parse(profile.mission).join("\n");
      } catch {
        return profile.mission;
      }
    })(),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    startTransition(async () => {
      try {
        const payload = {
          ...profile,
          ...formData,
          mission: formData.mission.split("\n").filter((m: string) => m.trim() !== ""),
        };

        await updateVillageProfile(payload);
        toast.success("Profil desa berhasil diperbarui!");
      } catch (error) {
        toast.error("Gagal memperbarui profil desa.");
        console.error(error);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="card-premium overflow-hidden">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-serif font-bold text-foreground">Informasi Dasar</h3>
          <p className="text-sm text-muted-foreground mt-1">Data utama tentang desa</p>
        </div>
        <div className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Nama Desa</label>
              <Input
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={isPending}
                className="bg-gray-50/50 border-gray-200 focus-visible:ring-primary h-11"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-foreground/80">Tagline</label>
              <Input
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                disabled={isPending}
                className="bg-gray-50/50 border-gray-200 focus-visible:ring-primary h-11"
              />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Sejarah</label>
            <Textarea
              name="history"
              value={formData.history}
              onChange={handleChange}
              className="min-h-[150px] bg-gray-50/50 border-gray-200 focus-visible:ring-primary resize-none"
              disabled={isPending}
            />
          </div>
        </div>
      </div>

      <div className="card-premium overflow-hidden">
        <div className="bg-gray-50/50 px-6 py-4 border-b border-gray-100">
          <h3 className="text-lg font-serif font-bold text-foreground">Visi & Misi</h3>
        </div>
        <div className="p-6 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Visi</label>
            <Input
              name="vision"
              value={formData.vision}
              onChange={handleChange}
              disabled={isPending}
              className="bg-gray-50/50 border-gray-200 focus-visible:ring-primary h-11"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-foreground/80">Misi (Pisahkan dengan baris baru)</label>
            <Textarea
              name="mission"
              value={formData.mission}
              onChange={handleChange}
              className="min-h-[150px] bg-gray-50/50 border-gray-200 focus-visible:ring-primary resize-none"
              disabled={isPending}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isPending} className="gap-2 px-8 bg-gradient-primary text-white hover:shadow-glow rounded-xl h-11">
          <Save className="w-4 h-4" />
          {isPending ? "Menyimpan..." : "Simpan Perubahan"}
        </Button>
      </div>
    </div>
  );
}
