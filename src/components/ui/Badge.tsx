import { cn } from "@/lib/utils";
import type { Difficulty } from "@/types/game";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "difficulty" | "category" | "outline";
  difficulty?: Difficulty;
  className?: string;
}

const difficultyStyles: Record<Difficulty, string> = {
  beginner: "bg-diff-beginner/15 text-diff-beginner border-diff-beginner/30",
  intermediate: "bg-diff-intermediate/15 text-diff-intermediate border-diff-intermediate/30",
  advanced: "bg-diff-advanced/15 text-diff-advanced border-diff-advanced/30",
  expert: "bg-diff-expert/15 text-diff-expert border-diff-expert/30",
};

export default function Badge({ children, variant = "default", difficulty, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold",
        variant === "difficulty" && difficulty ? difficultyStyles[difficulty] : "",
        variant === "default" && "border-bg-border bg-bg-elevated text-text-secondary",
        variant === "category" && "border-accent-primary/30 bg-accent-primary/10 text-accent-primary",
        variant === "outline" && "border-bg-border bg-transparent text-text-muted",
        className
      )}
    >
      {children}
    </span>
  );
}
