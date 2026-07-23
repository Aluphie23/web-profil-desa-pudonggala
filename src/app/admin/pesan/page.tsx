import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { MessageCard } from "@/components/admin/MessageCard";

export const revalidate = 0;

export default async function AdminPesanPage() {
  const messages = await prisma.message.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold text-primary-dark">Pesan Masuk</h1>
        <p className="text-muted-foreground mt-1">Kelola pesan dari pengunjung website.</p>
      </div>

      <div className="space-y-4">
        {messages.length === 0 ? (
          <Card>
            <CardContent className="py-20 text-center text-muted-foreground">
              Belum ada pesan masuk.
            </CardContent>
          </Card>
        ) : (
          messages.map((msg) => (
            <MessageCard key={msg.id} msg={msg} />
          ))
        )}
      </div>
    </div>
  );
}
