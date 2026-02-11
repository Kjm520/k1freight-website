"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

export default function GalleryPreview({ images = [] }) {
  const x = useMotionValue(0);
  const trackRef = useRef(null);
  const wrapWRef = useRef(0);

  const [openSrc, setOpenSrc] = useState(null);

  const safeImages = Array.isArray(images) ? images : [];

  const items = useMemo(() => [...safeImages, ...safeImages, ...safeImages], [safeImages]);

  // Measure one set width (total/2 because we duplicated once)
  useLayoutEffect(() => {
    if (!trackRef.current) return;

    const measure = () => {
      const el = trackRef.current;

      const styles = getComputedStyle(el);
      const gapPx = parseFloat(styles.columnGap || styles.gap || "0") || 0;

      // +gapPx fixes the (3n-1) gaps issue
      wrapWRef.current = (el.scrollWidth + gapPx) / 3;
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items.length]);

  // Steady scroll loop
  useEffect(() => {
    if (openSrc) return;

    let raf = null;
    let lastT = null;

    const baseV = -85; // px/s (negative = left)

    const tick = (t) => {
      if (lastT == null) lastT = t;
      const dt = (t - lastT) / 1000;
      lastT = t;

      const nextX = x.get() + baseV * dt;
      x.set(nextX);

      const W = wrapWRef.current;
      if (W) {
        let v = x.get();
        while (v <= -W) v += W;
        while (v > 0) v -= W;
        if (v !== x.get()) x.set(v);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      if (raf) cancelAnimationFrame(raf);
    };
  }, [openSrc, x]);

  return (
    <>
      <section className="overflow-hidden py-10">
        <motion.div ref={trackRef} className="flex w-max gap-6 select-none" style={{ x }}>
          {items.map((src, i) => (
            <button
              key={`${src}-${i}`}
              type="button"
              className="relative h-48 w-72 shrink-0 overflow-hidden rounded-xl"
              onClick={() => setOpenSrc(src)}
              aria-label="Open image"
            >
              <Image src={src} alt="" fill sizes="288px" className="object-cover" draggable={false} />
            </button>
          ))}
        </motion.div>
      </section>

      {openSrc && <Lightbox src={openSrc} onClose={() => setOpenSrc(null)} />}
    </>
  );
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="relative h-[80vh] w-[min(1100px,92vw)] overflow-hidden rounded-2xl bg-black" onMouseDown={(e) => e.stopPropagation()}>
        <Image src={src} alt="" fill sizes="(max-width: 768px) 92vw, 1100px" className="object-contain" priority />
        <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-lg bg-black/60 px-3 py-2 text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
