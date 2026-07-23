"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxHeroProps {
  imageUrl: string;
  children: React.ReactNode;
  className?: string;
  overlayClass?: string;
}

export function ParallaxHero({
  imageUrl,
  children,
  className = "h-screen",
  overlayClass = "bg-black/50",
}: ParallaxHeroProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);

  return (
    <section
      ref={ref}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      {/* Parallax background */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${imageUrl}')`,
          y,
          scale,
        }}
      />

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayClass}`} />

      {/* Content */}
      <motion.div className="relative z-10" style={{ opacity }}>
        {children}
      </motion.div>
    </section>
  );
}
