"use client";

import { useEffect, useState } from "react";
import type { GuideSection } from "@/types/game";

interface GuideNavProps {
  sections: GuideSection[];
  accentColor: string;
  inThisGuide: string;
}

export default function GuideNav({ sections, accentColor, inThisGuide }: GuideNavProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0% -70% 0%" }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="space-y-1">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
        {inThisGuide}
      </p>
      {sections.map((section) => {
        const isActive = activeId === section.id;
        return (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-200"
            style={{
              color: isActive ? accentColor : "var(--color-text-secondary)",
              background: isActive ? `rgba(${accentColor.startsWith("#") ? hexToRgb(accentColor) : accentColor}, 0.08)` : "transparent",
            }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full transition-all"
              style={{
                background: isActive ? accentColor : "var(--color-bg-border)",
                transform: isActive ? "scale(1.5)" : "scale(1)",
              }}
            />
            {section.title}
          </a>
        );
      })}
    </nav>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return "108, 99, 255";
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
}
