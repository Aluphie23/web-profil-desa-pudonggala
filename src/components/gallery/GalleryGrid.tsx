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
          <Dialog
            open={selectedIndex !== null}
            onOpenChange={(open) => !open && setSelectedIndex(null)}
          >
            <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-transparent border-0 overflow-hidden shadow-none">
              {selectedItem && (
                <motion.div
                  className="relative w-full h-[90vh] flex items-center justify-center group"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors"
                    onClick={() => setSelectedIndex(null)}
                  >
                    <X className="w-6 h-6" />
                  </button>

                  <button
                    className="absolute left-4 z-50 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  >
                    <ChevronLeft className="w-8 h-8" />
                  </button>

                  <div className="relative w-full h-full p-4 md:p-12">
                    {selectedItem.type === "video" ? (
                      <div className="w-full h-full flex items-center justify-center">
                        <iframe
                          src={selectedItem.url.replace("watch?v=", "embed/")}
                          className="w-full max-w-4xl aspect-video rounded-xl shadow-2xl"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="relative w-full h-full">
                        <ImageWithFallback
                          src={selectedItem.url}
                          alt={selectedItem.alt || "Lightbox image"}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>

                  <button
                    className="absolute right-4 z-50 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full backdrop-blur-sm transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                    onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  >
                    <ChevronRight className="w-8 h-8" />
                  </button>
                  
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 px-4 py-2 rounded-full text-white/90 text-sm backdrop-blur-sm">
                    {selectedIndex! + 1} / {items.length}
                  </div>
                </motion.div>
              )}
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
}
