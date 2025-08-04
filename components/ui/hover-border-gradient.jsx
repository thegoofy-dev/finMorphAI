"use client";

import React, { useState, useEffect } from "react";

import { motion } from "motion/react";
import { cn, hexToRgba } from "@/lib/utils";

export function HoverBorderGradient({
  movingColor,
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  const rotateDirection = (currentDirection) => {
    const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
    const currentIndex = directions.indexOf(currentDirection);
    const nextIndex = clockwise
      ? (currentIndex - 1 + directions.length) % directions.length
      : (currentIndex + 1) % directions.length;
    return directions[nextIndex];
  };

  const movingMap = {
    TOP: `radial-gradient(20.7% 50% at 50% 0%, ${movingColor} 0%, ${hexToRgba(movingColor, 0)} 100%)`,
    LEFT: `radial-gradient(16.6% 43.1% at 0% 50%, ${movingColor} 0%, ${hexToRgba(movingColor, 0)} 100%)`,
    BOTTOM: `radial-gradient(20.7% 50% at 50% 100%, ${movingColor} 0%, ${hexToRgba(movingColor, 0)} 100%)`,
    RIGHT: `radial-gradient(16.2% 41.2% at 100% 50%, ${movingColor} 0%, ${hexToRgba(movingColor, 0)} 100%)`,
  };

  const highlight = `radial-gradient(75% 181% at 50% 50%, ${movingColor} 0%, ${hexToRgba(movingColor, 0)} 100%)`;

  useEffect(() => {
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered]);
  return (
    <Tag
      onMouseEnter={(e) => {
        setHovered(true);
      }}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "hover:bg-hover-800/10 relative flex h-min w-fit flex-col flex-nowrap content-center items-center justify-center gap-10 overflow-visible rounded-full border-3 bg-purple-700/20 decoration-clone p-px transition duration-500 dark:bg-purple-200/20",
        containerClassName,
      )}
      {...props}
    >
      <div
        className={cn(
          "z-10 w-auto rounded-[inherit] bg-black px-4 py-2 text-black",
          className,
        )}
      >
        {children}
      </div>
      <motion.div
        className={cn(
          "absolute inset-0 z-0 flex-none overflow-hidden rounded-[inherit]",
        )}
        style={{
          filter: "blur(3px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="absolute inset-[2px] z-1 flex-none rounded-[100px] bg-black" />
    </Tag>
  );
}
