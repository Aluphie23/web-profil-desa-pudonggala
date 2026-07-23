import { prisma } from "@/lib/prisma";
import { ProfileForm } from "@/components/admin/ProfileForm";

export const revalidate = 0;

export default async function AdminProfilPage() {
  const profile = await prisma.villageProfile.findFirst();

  if (!profile) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary-dark">Profil Desa</h1>
        <p className="text-muted-foreground mt-1">Update informasi umum, sejarah, visi misi, dan demografi desa.</p>
      </div>
      
      <ProfileForm profile={profile} />
    </div>
  );
}
