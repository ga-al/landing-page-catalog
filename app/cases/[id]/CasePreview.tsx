"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CasePreviewProps = {
  src: string;
  alt: string;
};

export function CasePreview({ src, alt }: CasePreviewProps) {
  const imageRef = useRef<HTMLImageElement>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const ready = loadedSrc === src;

  useEffect(() => {
    const image = imageRef.current;
    if (image?.complete && image.naturalWidth > 0) {
      setLoadedSrc(src);
    }
  }, [src]);

  return (
    <div className="relative min-h-72">
      {!ready && (
        <div
          className="absolute inset-0 animate-pulse bg-primary-300 motion-reduce:animate-none"
          aria-hidden="true"
        />
      )}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        fill
        priority
        sizes="(min-width: 768px) 50vw, 100vw"
        className={`object-cover ${ready ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setLoadedSrc(src)}
      />
    </div>
  );
}
