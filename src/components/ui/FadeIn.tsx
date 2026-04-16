"use client";

import { motion } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
}

export default function FadeIn({ children, delay = 0, direction = "up", className }: FadeInProps) {
  const initial: Record<string, number> = { opacity: 0 };
  if (direction === "up") initial.y = 24;
  if (direction === "down") initial.y = -24;
  if (direction === "left") initial.x = 24;
  if (direction === "right") initial.x = -24;

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
