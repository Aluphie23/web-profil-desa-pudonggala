"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/profil", label: "Profil" },
  { href: "/wisata", label: "Wisata" },
  { href: "/umkm", label: "UMKM" },
  { href: "/galeri", label: "Galeri" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isAdminPage = pathname?.startsWith("/admin");

  // It's absolute now, so it never stays in view when scrolled.
  // It's always transparent on public pages, and solid on admin pages.
  const headerBg = !isAdminPage
    ? "bg-transparent border-transparent shadow-none"
    : "bg-white/80 backdrop-blur-2xl border border-gray-200/50 shadow-glass rounded-2xl";

  const textColor = !isAdminPage
    ? "text-white"
    : "text-foreground";

  const logoColor = "text-white";

  if (isAdminPage) {
    return null;
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
      className={cn(
        "absolute top-4 z-50 left-4 right-4 max-w-7xl xl:mx-auto transition-all duration-500",
        headerBg
      )}
    >
      <div className="px-4 sm:px-6 lg:px-8 flex h-18 items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 bg-gradient-primary rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-glow transition-all duration-300">
            <span className="text-white font-bold text-sm">P</span>
          </div>
          <span className={cn("font-serif font-bold text-xl transition-colors duration-300", logoColor)}>
            Desa Pudonggala
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                  isActive
                    ? !isAdminPage
                      ? "bg-white/20 text-white"
                      : "bg-primary/10 text-primary"
                    : cn(
                        textColor,
                        "hover:bg-primary/10 hover:text-primary"
                      )
                )}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            className={cn(
              "rounded-full px-6 hidden sm:flex transition-all duration-300",
              !isAdminPage
                ? "bg-white/20 text-white border border-white/30 hover:bg-white hover:text-primary-dark backdrop-blur-sm"
                : "bg-primary hover:bg-primary-dark text-white"
            )}
          >
            <Link href="/kontak">Hubungi Kami</Link>
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn("md:hidden", textColor)}
                />
              }
            >
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] pt-12">
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200",
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
                <div className="mt-4 pt-4 border-t">
                  <Button
                    asChild
                    className="w-full rounded-full bg-primary hover:bg-primary-dark text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/kontak">Hubungi Kami</Link>
                  </Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}
