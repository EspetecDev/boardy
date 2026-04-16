import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export default function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50",
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        variant === "primary" && "bg-accent-primary text-white hover:opacity-90 active:scale-95",
        variant === "secondary" && "bg-bg-elevated text-text-primary border border-bg-border hover:border-accent-primary/50",
        variant === "ghost" && "text-text-secondary hover:text-text-primary hover:bg-bg-elevated",
        variant === "outline" && "border border-bg-border text-text-secondary hover:border-accent-primary/50 hover:text-text-primary",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
