import Link from "next/link";
import { Dices, Heart } from "lucide-react";
import { localePath } from "@/i18n/config";
import type { Dictionary } from "@/i18n/TranslationProvider";

interface FooterProps {
  lang: string;
}

export default function Footer({ lang }: FooterProps) {
  const footerLinks = {
    Games: [
      { href: localePath(lang, "/categories/board-game"), label: "Board Games" },
      { href: localePath(lang, "/categories/card-game"), label: "Card Games" },
      { href: localePath(lang, "/categories/roleplaying"), label: "RPGs" },
      { href: localePath(lang, "/categories/party-game"), label: "Party Games" },
    ],
    Guides: [
      { href: localePath(lang, "/games/chess"), label: "Chess" },
      { href: localePath(lang, "/games/catan"), label: "Catan" },
      { href: localePath(lang, "/games/uno"), label: "Uno" },
      { href: localePath(lang, "/games/texas-holdem"), label: "Texas Hold'em" },
    ],
  };

  return (
    <footer className="border-t" style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href={localePath(lang, "/")} className="flex items-center gap-2 font-display text-lg font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "var(--color-accent-primary)" }}>
                <Dices className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">Boardy</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Beautiful, practical guides for every tabletop game — from first setup to winning strategy.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--color-text-muted)" }}>
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm transition-colors hover:text-white"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 sm:flex-row" style={{ borderColor: "var(--color-bg-border)" }}>
          <p className="flex items-center gap-1 text-xs" style={{ color: "var(--color-text-muted)" }}>
            Made with <Heart className="h-3 w-3" style={{ color: "var(--color-accent-warm)" }} /> for tabletop lovers
          </p>
          <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
            © {new Date().getFullYear()} Boardy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
