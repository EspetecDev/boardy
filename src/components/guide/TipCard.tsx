import type { Tip } from "@/types/game";
import { Lightbulb, Trophy, Smile, Handshake } from "lucide-react";
import type { Dictionary } from "@/i18n/TranslationProvider";

interface TipCardProps {
  tip: Tip;
  tipCategories: Dictionary["tipCategories"];
}

const tipStyles = {
  strategy: { bg: "rgba(108, 99, 255, 0.08)", border: "rgba(108, 99, 255, 0.25)", color: "#6c63ff", Icon: Trophy },
  beginner: { bg: "rgba(6, 214, 160, 0.08)", border: "rgba(6, 214, 160, 0.25)", color: "#06d6a0", Icon: Smile },
  advanced: { bg: "rgba(167, 139, 250, 0.08)", border: "rgba(167, 139, 250, 0.25)", color: "#a78bfa", Icon: Lightbulb },
  etiquette: { bg: "rgba(255, 209, 102, 0.08)", border: "rgba(255, 209, 102, 0.25)", color: "#ffd166", Icon: Handshake },
};

export default function TipCard({ tip, tipCategories }: TipCardProps) {
  const style = tipStyles[tip.category];
  const { Icon } = style;
  const categoryLabel = tipCategories[tip.category];

  return (
    <div
      className="rounded-xl border p-4"
      style={{ background: style.bg, borderColor: style.border }}
    >
      <div className="mb-2 flex items-center gap-2">
        <Icon className="h-4 w-4 shrink-0" style={{ color: style.color }} />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: style.color }}>
          {categoryLabel}
        </span>
      </div>
      <h4 className="mb-1 font-semibold text-text-primary">{tip.title}</h4>
      <p className="text-sm leading-relaxed text-text-secondary">{tip.content}</p>
    </div>
  );
}
