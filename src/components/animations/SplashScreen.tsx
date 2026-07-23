"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function SplashScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Check if splash screen has been shown in this session
    const hasSeenSplash = sessionStorage.getItem("hasSeenSplash");
    
    if (hasSeenSplash) {
      setShow(false);
      return;
    }

    // Hide splash screen after animation completes
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("hasSeenSplash", "true");
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-gradient-to-b from-[#0B1D26] to-[#07131A]"
        >
          {/* Logo Container */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6"
          >
            <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-50 animate-pulse" />
            <div className="relative w-20 h-20 md:w-24 md:h-24 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-glass-lg border border-white/20">
              <span className="text-white font-bold text-4xl md:text-5xl font-serif">P</span>
            </div>
          </motion.div>

          {/* Text Container */}
          <div className="overflow-hidden flex flex-col items-center">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-2xl md:text-4xl font-serif font-bold text-white tracking-widest mb-2"
            >
              DESA PUDONGGALA
            </motion.h1>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeInOut" }}
              className="h-0.5 w-3/4 bg-gradient-to-r from-transparent via-primary to-transparent"
            />
          </div>
          
          {/* Loading indicator */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                animate={{
                  y: ["0%", "-50%", "0%"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
