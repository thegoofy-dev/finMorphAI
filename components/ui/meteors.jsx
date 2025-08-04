"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { useEffect, useState } from "react";

export const Meteors = ({ number = 20, className }) => {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const generated = Array.from({ length: number }, (_, idx) => {
      const positionPercent = (idx / number) * 100;
      return {
        left: `${positionPercent}%`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.floor(Math.random() * (10 - 5) + 5)}s`,
      };
    });
    setMeteorStyles(generated);
  }, [number]);

  if (meteorStyles.length === 0) return null; // Prevent SSR mismatch

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {meteorStyles.map((style, idx) => (
        <span
          key={"meteor" + idx}
          className={cn(
            "animate-meteor-effect absolute h-0.5 w-0.5 rotate-[45deg] rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]",
            "before:absolute before:top-1/2 before:h-[1px] before:w-[50px] before:-translate-y-1/2 before:transform before:bg-gradient-to-r before:from-[#9d49eb] before:to-transparent before:content-['']",
            className,
          )}
          style={{
            top: "-80px",
            left: style.left,
            right: "-80px",
            animationDelay: style.animationDelay,
            animationDuration: style.animationDuration,
          }}
        />
      ))}
    </motion.div>
  );
};
