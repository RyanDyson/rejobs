"use client";

import { motion } from "motion/react";

export function AnimatedOrbs() {
  const largeOrbs = [
    {
      size: "w-96 h-96",
      position: "top-1/4 left-1/4",
      opacity: "opacity-10",
      animate: {
        scale: [1, 1.2, 1],
        x: [0, 50, 0],
        y: [0, -30, 0],
      },
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
    {
      size: "w-64 h-64",
      position: "top-3/4 right-1/4",
      opacity: "opacity-5",
      animate: {
        scale: [1.2, 1, 1.2],
        x: [0, -40, 0],
        y: [0, 20, 0],
      },
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut" as const,
        delay: 2,
      },
    },
  ];

  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Large and medium floating orbs */}
      {largeOrbs.map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute ${orb.position} ${orb.size} rounded-full ${orb.opacity}`}
          style={{
            background: "radial-gradient(circle, #009758 0%, transparent 70%)",
          }}
          animate={orb.animate}
          transition={orb.transition}
        />
      ))}

      {/* Small floating orbs */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-[#009758] opacity-20"
          style={{
            top: `${20 + i * 15}%`,
            left: `${10 + i * 20}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
}
