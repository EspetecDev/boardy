"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dices, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/games", label: "Browse Games" },
  { href: "/categories/board-game", label: "Board Games" },
  { href: "/categories/card-game", label: "Card Games" },
  { href: "/categories/roleplaying", label: "RPGs" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(10,11,14,0.85)", backdropFilter: "blur(16px)", borderColor: "var(--color-bg-border)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-display text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-accent-primary)" }}>
            <Dices className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text">Boardy</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-white"
                  : "hover:text-white"
              )}
              style={{
                color: pathname === link.href ? "var(--color-text-primary)" : "var(--color-text-secondary)",
                background: pathname === link.href ? "var(--color-bg-elevated)" : undefined,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <Link
            href="/games"
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
            style={{ background: "var(--color-accent-primary)" }}
          >
            Explore All
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="border-t px-4 py-4 md:hidden" style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
