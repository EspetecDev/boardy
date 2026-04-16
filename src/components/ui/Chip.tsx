"use client";

import { cn } from "@/lib/utils";

interface ChipProps {
  children: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function Chip({ children, active, onClick, className }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        active
          ? "border-accent-primary bg-accent-primary/15 text-accent-primary"
          : "border-bg-border bg-bg-surface text-text-secondary hover:border-accent-primary/40 hover:text-text-primary",
        className
      )}
    >
      {children}
    </button>
  );
}
