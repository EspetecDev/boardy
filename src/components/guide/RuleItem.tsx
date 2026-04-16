import type { Rule } from "@/types/game";
import { AlertCircle } from "lucide-react";

interface RuleItemProps {
  rule: Rule;
  accentColor: string;
  accentColorRgb: string;
}

export default function RuleItem({ rule, accentColor, accentColorRgb }: RuleItemProps) {
  return (
    <div
      className="rounded-xl border p-4 transition-colors"
      style={{
        borderColor: rule.important ? `rgba(${accentColorRgb}, 0.3)` : "var(--color-bg-border)",
        background: rule.important ? `rgba(${accentColorRgb}, 0.04)` : "var(--color-bg-surface)",
      }}
    >
      <div className="mb-1 flex items-center gap-2">
        {rule.important && (
          <AlertCircle className="h-4 w-4 shrink-0" style={{ color: accentColor }} />
        )}
        <h4 className="font-semibold text-text-primary">{rule.title}</h4>
      </div>
      <p className="text-sm leading-relaxed text-text-secondary">{rule.description}</p>
      {rule.example && (
        <p
          className="mt-2 rounded-lg p-2.5 font-mono text-xs"
          style={{
            background: "var(--color-bg-elevated)",
            color: "var(--color-text-muted)",
          }}
        >
          Example: {rule.example}
        </p>
      )}
    </div>
  );
}
