"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Mail, Check, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { markAsRead, deleteMessage } from "@/actions/messages";
import { toast } from "sonner";
import { Message } from "@prisma/client";

interface MessageCardProps {
  msg: Message;
}

export function MessageCard({ msg }: MessageCardProps) {
  const [isPending, startTransition] = useTransition();

  const handleMarkAsRead = () => {
    startTransition(async () => {
      try {
        await markAsRead(msg.id);
        toast.success("Pesan ditandai sudah dibaca.");
      } catch {
        toast.error("Gagal menandai pesan.");
      }
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteMessage(msg.id);
        toast.success("Pesan berhasil dihapus.");
      } catch {
        toast.error("Gagal menghapus pesan.");
      }
    });
  };

  return (
    <div className={cn("card-premium transition-all duration-300", !msg.isRead ? "bg-primary/5 border-primary/20 shadow-glow" : "bg-white")}>
      <div className="p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-4">
              <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm", !msg.isRead ? "bg-gradient-primary text-white" : "bg-gray-100 text-gray-500")}>
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-foreground">{msg.name}</h3>
                <p className="text-sm text-primary-dark font-medium">{msg.email}</p>
              </div>
              <span className="text-xs text-muted-foreground ml-auto md:hidden bg-gray-100 px-2 py-1 rounded-full">
                {msg.createdAt.toLocaleDateString("id-ID")}
              </span>
            </div>
            {msg.subject && <h4 className="font-semibold text-foreground text-md mt-2">{msg.subject}</h4>}
            <p className="text-muted-foreground leading-relaxed">{msg.message}</p>
          </div>
          <div className="flex md:flex-col justify-end items-end gap-3 shrink-0 border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-6">
            <span className="text-xs text-muted-foreground hidden md:block mb-2 font-medium bg-gray-50 px-3 py-1.5 rounded-full">
              {msg.createdAt.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              })}
            </span>
            <div className="flex gap-2">
              {!msg.isRead && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2 border-green-200 bg-green-50 text-green-700 hover:bg-green-100 hover:text-green-800 hover:border-green-300 rounded-full"
                  onClick={handleMarkAsRead}
                  disabled={isPending}
                >
                  <Check className="w-4 h-4" />
                  {isPending ? "Proses..." : "Tandai Dibaca"}
                </Button>
              )}
              <Button 
                variant="outline" 
                size="icon" 
                className="text-destructive hover:bg-destructive hover:text-white border-red-100 rounded-full"
                onClick={handleDelete}
                disabled={isPending}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
