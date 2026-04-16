import Link from "next/link";
import { Dices, Heart } from "lucide-react";

const footerLinks = {
  Games: [
    { href: "/categories/board-game", label: "Board Games" },
    { href: "/categories/card-game", label: "Card Games" },
    { href: "/categories/roleplaying", label: "RPGs" },
    { href: "/categories/party-game", label: "Party Games" },
  ],
  Guides: [
    { href: "/games/chess", label: "Chess" },
    { href: "/games/catan", label: "Catan" },
    { href: "/games/uno", label: "Uno" },
    { href: "/games/texas-holdem", label: "Texas Hold'em" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-display text-lg font-bold">
              <div className="flex h-7 w-7 items-center justify-center rounded-md" style={{ background: "var(--color-accent-primary)" }}>
                <Dices className="h-4 w-4 text-white" />
              </div>
              <span className="gradient-text">Boardy</span>
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed" style={{ color: "var(--color-text-muted)" }}>
              Beautiful, practical guides for every tabletop game — from first setup to winning strategy.
            </p>
          </div>

          {/* Links */}
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
