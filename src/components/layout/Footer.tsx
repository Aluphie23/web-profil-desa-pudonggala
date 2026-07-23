"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="bg-gradient-to-b from-[#0B1D26] to-[#07131A] text-white pt-20 pb-8 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <span className="font-serif font-bold text-2xl text-white">Desa Pudonggala</span>
            </div>
            <p className="text-white/50 leading-relaxed max-w-sm">
              Pesona alam Sulawesi Tenggara dengan pantai yang indah dan budaya yang kaya. 
              Menjadi desa wisata unggulan yang mandiri dan sejahtera.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-sm uppercase tracking-widest mb-6">Tautan Cepat</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Beranda</Link></li>
              <li><Link href="/profil" className="text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Profil Desa</Link></li>
              <li><Link href="/wisata" className="text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Destinasi Wisata</Link></li>
              <li><Link href="/umkm" className="text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Produk UMKM</Link></li>
              <li><Link href="/galeri" className="text-white/50 hover:text-white hover:translate-x-1 inline-block transition-all duration-300">Galeri</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white/90 text-sm uppercase tracking-widest mb-6">Ikuti Kami</h4>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-glow transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-glow transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary hover:shadow-glow transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path><path d="m10 15 5-3-5-3z"></path></svg>
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/30">
          <p>&copy; {new Date().getFullYear()} Pemerintah Desa Pudonggala. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/admin/login" className="hover:text-white/70 transition-colors">Login Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
