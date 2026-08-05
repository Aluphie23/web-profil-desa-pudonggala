"use client";

import { useState } from "react";

import Link from "next/link";
import { ImageWithFallback } from "@/components/shared/ImageWithFallback";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

interface GalleryItem {
  id: string;
  type: string;
  url: string;
  thumbnail?: string | null;
  alt?: string | null;
  album: string;
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.08,
      ease: "easeOut" as const,
    },
  }),
};

export function GalleryGrid({
  items,
  albums,
  currentAlbum,
}: {
  items: GalleryItem[];
  albums: string[];
  currentAlbum: string;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedItem = selectedIndex !== null ? items[selectedIndex] : null;

  const handlePrevious = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! > 0 ? prev! - 1 : items.length - 1));
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev! < items.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <>


      {items.length === 0 ? (
        <motion.div
          className="text-center py-20 text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-xl">Tidak ada foto/video untuk album ini.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              custom={idx}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-30px" }}
              className="break-inside-avoid relative rounded-2xl overflow-hidden cursor-pointer group bg-white border border-gray-100 shadow-glass hover:shadow-glass-lg hover:border-primary/20 transition-all duration-500"
              onClick={() => setSelectedIndex(idx)}
              whileHover={{ y: -4 }}
            >
              {item.type === "video" ? (
                <>
                  <ImageWithFallback
                    src={item.thumbnail || "https://placehold.co/800x600?text=Video"}
                    alt={item.alt || "Video Thumbnail"}
                    width={800}
                    height={600}
                    className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                    <div className="w-16 h-16 bg-primary/90 rounded-full flex items-center justify-center text-white backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 ml-1" />
                    </div>
                  </div>
                </>
              ) : (
                <ImageWithFallback
                  src={item.url}
                  alt={item.alt || "Gallery Image"}
                  width={800}
                  height={600}
                  className={`w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500 ${item.url.includes('laut') ? 'object-[center_75%]' : ''}`}
                />
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setSelectedIndex(null)}
          >
            {selectedItem && (
              <motion.div
                className="relative w-full max-w-5xl h-full max-h-[85vh] flex flex-col items-center justify-center group"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  className="absolute -top-12 right-0 md:-right-12 md:-top-4 z-50 p-2 md:p-3 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10 hover:scale-110"
                  onClick={() => setSelectedIndex(null)}
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>

                {/* Left Button (Desktop) */}
                <button
                  className="absolute left-4 md:-left-16 z-50 p-3 md:p-4 bg-black/40 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 hidden sm:block"
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                >
                  <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                {/* Mobile Left/Right Tap Areas */}
                <div className="absolute left-0 top-0 bottom-0 w-1/3 z-40 sm:hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); handlePrevious(); }} />
                <div className="absolute right-0 top-0 bottom-0 w-1/3 z-40 sm:hidden cursor-pointer" onClick={(e) => { e.stopPropagation(); handleNext(); }} />

                <div className="relative w-full h-full flex items-center justify-center rounded-xl overflow-hidden shadow-2xl">
                  {selectedItem.type === "video" ? (
                    <iframe
                      src={selectedItem.url.replace("watch?v=", "embed/")}
                      className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl border border-white/10"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="relative w-full h-full">
                      <ImageWithFallback
                        src={selectedItem.url}
                        alt={selectedItem.alt || "Lightbox image"}
                        fill
                        className="object-contain"
                        containerClassName="w-full h-full bg-transparent"
                      />
                    </div>
                  )}
                </div>

                {/* Right Button (Desktop) */}
                <button
                  className="absolute right-4 md:-right-16 z-50 p-3 md:p-4 bg-black/40 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all border border-white/10 opacity-0 group-hover:opacity-100 focus:opacity-100 hover:scale-110 hidden sm:block"
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                >
                  <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-full">
                  <div className="bg-white/10 px-4 py-1.5 rounded-full text-white/90 text-sm font-medium backdrop-blur-md border border-white/10">
                    {selectedIndex! + 1} / {items.length}
                  </div>
                  {selectedItem.alt && (
                    <p className="text-white/70 text-sm max-w-lg text-center truncate px-4">
                      {selectedItem.alt}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
