"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Image as ImageIcon,
  MessageSquare,
  LogOut,
  Settings,
  Store,
} from "lucide-react";
import { logout } from "@/actions/auth";

const navItems = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Profil Desa", href: "/admin/profil", icon: FileText },
  { name: "Destinasi", href: "/admin/destinasi", icon: MapPin },
  { name: "Galeri", href: "/admin/galeri", icon: ImageIcon },
  { name: "UMKM", href: "/admin/umkm", icon: Store },
  { name: "Pesan Masuk", href: "/admin/pesan", icon: MessageSquare },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-[#0B1D26] to-primary-dark text-white hidden lg:flex flex-col shadow-2xl">
      <div className="flex h-16 shrink-0 items-center px-6 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className="font-serif font-bold text-lg tracking-wide group-hover:text-primary-light transition-colors">Admin Desa</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-8 px-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 group",
                isActive
                  ? "bg-gradient-primary text-white shadow-glow translate-x-1"
                  : "text-white/70 hover:bg-white/10 hover:text-white hover:translate-x-1"
              )}
            >
              <item.icon className={cn("w-5 h-5 transition-transform duration-300", isActive ? "scale-110" : "group-hover:scale-110")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 bg-white/5 backdrop-blur-sm">
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/70 hover:bg-destructive hover:text-white transition-all duration-300 group hover:translate-x-1"
        >
          <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
          Keluar
        </button>
      </div>
    </aside>
  );
}

