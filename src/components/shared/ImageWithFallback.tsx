"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { Image as ImageIcon } from "lucide-react";

interface ImageWithFallbackProps extends Omit<ImageProps, "src" | "alt"> {
  src?: string | null;
  alt?: string | null;
  fallbackText?: string;
  containerClassName?: string;
}

export function ImageWithFallback({
  src,
  alt,
  fallbackText = "Image not found",
  containerClassName,
  className,
  ...props
}: ImageWithFallbackProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const showFallback = !src || error;

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted flex items-center justify-center",
        containerClassName
      )}
    >
      {showFallback ? (
        <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
          <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
          <span className="text-xs text-center">{fallbackText}</span>
        </div>
      ) : (
        <>
          <Image
            src={src}
            alt={alt || "Image"}
            className={cn(
              "object-cover transition-opacity duration-300",
              loading ? "opacity-0" : "opacity-100",
              className
            )}
            onLoad={() => setLoading(false)}
            onError={() => setError(true)}
            {...props}
          />
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}
    </div>
  );
}
