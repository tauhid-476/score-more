"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function TextAnimation({ texts }: { texts: string[] }) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % texts.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [texts]);

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={texts[currentTextIndex]}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-base font-medium"
        >
          {texts[currentTextIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
