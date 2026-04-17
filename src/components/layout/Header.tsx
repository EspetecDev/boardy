"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Dices, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { localePath } from "@/i18n/config";
import { useTranslations } from "@/i18n/TranslationProvider";
import LocaleSwitcher from "./LocaleSwitcher";

interface HeaderProps {
  lang: string;
}

export default function Header({ lang }: HeaderProps) {
  const dict = useTranslations();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: localePath(lang, "/games"), label: dict.nav.browseGames },
    { href: localePath(lang, "/categories/board-game"), label: dict.nav.boardGames },
    { href: localePath(lang, "/categories/card-game"), label: dict.nav.cardGames },
    { href: localePath(lang, "/categories/roleplaying"), label: dict.nav.rpgs },
  ];

  return (
    <header className="sticky top-0 z-50 border-b" style={{ background: "rgba(10,11,14,0.85)", backdropFilter: "blur(16px)", borderColor: "var(--color-bg-border)" }}>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href={localePath(lang, "/")} className="flex items-center gap-2 font-display text-xl font-bold">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--color-accent-primary)" }}>
            <Dices className="h-5 w-5 text-white" />
          </div>
          <span className="gradient-text">Boardy</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href ? "text-white" : "hover:text-white"
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

        <div className="flex items-center gap-3">
          <LocaleSwitcher currentLang={lang} />
          <Link
            href={localePath(lang, "/games")}
            className="hidden rounded-lg px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:block"
            style={{ background: "var(--color-accent-primary)" }}
          >
            {dict.nav.exploreAll}
          </Link>
          <button
            className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:hidden"
            style={{ color: "var(--color-text-secondary)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={dict.nav.toggleMenu}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

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
