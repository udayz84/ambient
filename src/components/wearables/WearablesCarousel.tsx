"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const CAROUSEL_IMAGES = [
  "/wearables-marquee/w1.png",
  "/wearables-marquee/w2.png",
  "/wearables-marquee/w3.png",
  "/wearables-marquee/w4.png",
  "/wearables-marquee/w5.png",
  "/wearables-marquee/w6.png",
  "/wearables-marquee/w7.png",
];

export function WearablesCarousel({ images }: { images?: string[] }) {
  const slides =
    Array.isArray(images) && images.length > 0 ? images : CAROUSEL_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 3000); // stay for around 2s

    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden z-[5]">
      <AnimatePresence>
        <motion.div
          key={currentIndex}
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="absolute top-[200px] flex items-center justify-center w-full max-w-[600px] h-[450px]"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={slides[currentIndex]}
            alt=""
            className="w-full h-full object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
