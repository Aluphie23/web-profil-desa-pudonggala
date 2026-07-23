"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  className?: string;
}

export function PageHero({
  title,
  subtitle,
  imageUrl,
  className,
}: PageHeroProps) {
  return (
    <div
      className={cn(
        "relative h-[45vh] min-h-[360px] w-full flex items-center justify-center overflow-hidden",
        className
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center z-0 scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1D26]/80 via-primary-dark/60 to-primary/50 z-10" />
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-10" />
      <div className="relative z-20 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/80 text-sm font-medium mb-6"
        >
          Desa Pudonggala
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-4 tracking-tight"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
