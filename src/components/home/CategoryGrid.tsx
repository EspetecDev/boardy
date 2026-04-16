"use client";

import Link from "next/link";
import { LayoutGrid, Layers, Sword, Dices, Grid3X3, PartyPopper, Shield, Puzzle } from "lucide-react";
import type { Category } from "@/data/categories";

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, Layers, Sword, Dices, Grid3x3: Grid3X3, PartyPopper, Shield, Puzzle,
};

interface CategoryGridProps {
  categories: Category[];
}

export default function CategoryGrid({ categories }: CategoryGridProps) {
  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 text-center">
          <h2 className="mb-3 font-display text-3xl font-bold text-text-primary sm:text-4xl">
            Browse by Type
          </h2>
          <p className="text-text-secondary">Find the perfect game for your group</p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {categories.map((cat) => {
            const Icon = iconMap[cat.icon] ?? LayoutGrid;
            return (
              <Link
                key={cat.id}
                href={`/categories/${cat.id}`}
                className="group flex flex-col items-center rounded-2xl border p-5 text-center transition-all duration-300 hover:-translate-y-1"
                style={{
                  borderColor: "var(--color-bg-border)",
                  background: "var(--color-bg-surface)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = `${cat.color}40`;
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 24px ${cat.color}18`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-bg-border)";
                  (e.currentTarget as HTMLAnchorElement).style.boxShadow = "";
                }}
              >
                <div
                  className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110"
                  style={{ background: `${cat.color}18` }}
                >
                  <Icon className="h-6 w-6" style={{ color: cat.color }} />
                </div>
                <h3 className="mb-1 text-sm font-semibold text-text-primary">{cat.name}</h3>
                <p className="text-xs leading-relaxed text-text-muted">{cat.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
