"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/TranslationProvider";

const FLOATING_PIECES = ["♟", "🎲", "🃏", "🐉", "⬡", "♔", "🧩", "⚔"];

interface HeroSectionProps {
  lang: string;
  dict: Dictionary["home"]["hero"];
}

export default function HeroSection({ lang, dict }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-4 pb-20 pt-16 sm:px-6 sm:pb-28 sm:pt-24">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(108,99,255,0.18) 0%, transparent 60%)",
        }}
      />

      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
        {FLOATING_PIECES.map((piece, i) => (
          <motion.span
            key={i}
            className="absolute select-none text-2xl opacity-[0.08]"
            style={{
              left: `${8 + (i * 12) % 88}%`,
              top: `${10 + (i * 17) % 70}%`,
              fontSize: `${1.2 + (i % 3) * 0.4}rem`,
            }}
            animate={{ y: [0, -14, 0], rotate: [0, 3, 0] }}
            transition={{
              duration: 5 + (i % 3),
              delay: i * 0.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {piece}
          </motion.span>
        ))}
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm"
          style={{ borderColor: "rgba(108,99,255,0.4)", background: "rgba(108,99,255,0.08)", color: "var(--color-accent-primary)" }}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{dict.badge}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 font-display font-black tracking-tight text-text-primary"
          style={{ fontSize: "clamp(2.5rem, 7vw, 5rem)", lineHeight: 1.1 }}
        >
          {dict.headline1}
          <br />
          <span className="gradient-text">{dict.headline2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-text-secondary"
        >
          {dict.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={localePath(lang, "/games")}
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg active:scale-95"
            style={{ background: "var(--color-accent-primary)", boxShadow: "0 4px 24px rgba(108,99,255,0.3)" }}
          >
            {dict.cta} <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={localePath(lang, "/games/chess")}
            className="inline-flex items-center gap-2 rounded-xl border px-6 py-3 text-base font-semibold text-text-primary transition-all hover:border-accent-primary/40 active:scale-95"
            style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}
          >
            {dict.ctaChess}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
