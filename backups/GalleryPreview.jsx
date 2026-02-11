"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, animate } from "framer-motion";

export default function GalleryPreview({ images = [] }) {
  const trackRef = useRef(null);
  const wrapWRef = useRef(0);
  const x = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);
  const [openSrc, setOpenSrc] = useState(null);
  const rafRef = useRef(null);
  const lastTRef = useRef(null);
  const vRef = useRef(0); // px/s
  const releaseVRef = useRef(null); // px/s from drag release

  const cooldownTimerRef = useRef(null);
  const [cooldown, setCooldown] = useState(false);

  const safeImages = Array.isArray(images) ? images : [];

  const items = useMemo(() => [...safeImages, ...safeImages, ...safeImages], [safeImages]);

  // after items is defined
  useLayoutEffect(() => {
    if (!trackRef.current) return;
    // You render 3 sets; one set width is total/3
    wrapWRef.current = trackRef.current.scrollWidth / 3;
  }, [items.length]);

  useEffect(() => {
    if (isDragging || openSrc) return;

    const baseV = -35; // default speed (px/s). More negative = faster left.
    const blend = 3.5; // how fast it returns to base speed (higher = quicker)
    const maxV = 2500; // clamp throw speed (px/s)

    if (releaseVRef.current != null) {
      vRef.current = releaseVRef.current;
      releaseVRef.current = null;
    } else {
      vRef.current = vRef.current || baseV;
    }

    const tick = (t) => {
      if (lastTRef.current == null) lastTRef.current = t;
      const dt = (t - lastTRef.current) / 1000;
      lastTRef.current = t;

      // ease velocity toward baseV
      vRef.current += (baseV - vRef.current) * (1 - Math.exp(-blend * dt));

      // integrate position
      const nextX = x.get() + vRef.current * dt;
      x.set(nextX);

      // seam wrap (keeps continuity)
      const W = wrapWRef.current;
      if (W) {
        let v = x.get();
        while (v <= -W) v += W;
        while (v > 0) v -= W;
        if (v !== x.get()) x.set(v);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTRef.current = null;
    };
  }, [isDragging, openSrc, x]);

  // Keep x within a reasonable range so it doesn't drift forever.
  // (This is a simple wrap; good enough for a gallery preview.)
  useEffect(() => {
    const unsub = x.on("change", (v) => {
      const W = wrapWRef.current;
      if (!W) return;

      if (v <= -W) x.set(v + W);
      else if (v > 0) x.set(v - W);
    });

    return () => unsub();
  }, [x]);

  return (
    <>
      <section className="overflow-hidden py-10">
        <motion.div
          ref={trackRef}
          className="flex w-max gap-6 cursor-grab active:cursor-grabbing select-none"
          style={{ x }}
          drag="x"
          dragMomentum={false}
          dragElastic={0.08}
          onDragStart={() => setIsDragging(true)}
          onDragEnd={(e, info) => {
            releaseVRef.current = info.velocity.x;
            setIsDragging(false);
          }}
        >
          {items.map((src, i) => (
            <Tile key={`${src}-${i}`} src={src} onOpen={() => setOpenSrc(src)} isDragging={isDragging} />
          ))}
        </motion.div>
      </section>

      {openSrc && <Lightbox src={openSrc} onClose={() => setOpenSrc(null)} />}
    </>
  );
}

function Tile({ src, onOpen, isDragging }) {
  // Prevent accidental “click” right after a drag
  const clickOkRef = useRef(true);

  useEffect(() => {
    if (isDragging) clickOkRef.current = false;
    if (!isDragging) {
      const t = setTimeout(() => (clickOkRef.current = true), 80);
      return () => clearTimeout(t);
    }
  }, [isDragging]);

  return (
    <button
      type="button"
      className="relative h-48 w-72 shrink-0 overflow-hidden rounded-xl"
      onClick={() => {
        if (clickOkRef.current) onOpen();
      }}
      aria-label="Open image"
    >
      <Image src={src} alt="" fill sizes="288px" className="object-cover" draggable={false} priority={false} />
    </button>
  );
}

function Lightbox({ src, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6" onMouseDown={onClose} role="dialog" aria-modal="true">
      <div className="relative h-[80vh] w-[min(1100px,92vw)] overflow-hidden rounded-2xl" onMouseDown={(e) => e.stopPropagation()}>
        <Image src={src} alt="" fill sizes="(max-width: 768px) 92vw, 1100px" className="object-contain bg-black" priority />
        <button type="button" onClick={onClose} className="absolute right-3 top-3 rounded-lg bg-black/60 px-3 py-2 text-sm">
          Close
        </button>
      </div>
    </div>
  );
}
