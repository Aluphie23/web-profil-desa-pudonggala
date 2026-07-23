"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

const containerVariants = {
  hidden: {},
  visible: (custom: { staggerDelay: number; initialDelay: number }) => ({
    transition: {
      staggerChildren: custom.staggerDelay,
      delayChildren: custom.initialDelay,
    },
  }),
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.15,
  initialDelay = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={cn(className)}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px" }}
      custom={{ staggerDelay, initialDelay }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={cn(className)} variants={staggerItemVariants}>
      {children}
    </motion.div>
  );
}
