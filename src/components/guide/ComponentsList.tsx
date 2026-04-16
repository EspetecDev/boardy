import type { GameComponent } from "@/types/game";
import {
  LayoutGrid, Layers, Dices, Hash, Hexagon, Waves, Minus, Home,
  Building2, Circle, AlertTriangle, AlertCircle, User, Users,
  CheckCircle, Map, FileText, BookOpen, Shield, Sword, Crown,
  Move, Package, EyeOff
} from "lucide-react";

interface ComponentsListProps {
  components: GameComponent[];
  accentColor: string;
  accentColorRgb: string;
}

const iconMap: Record<string, React.ElementType> = {
  LayoutGrid, Layers, Dices, Hash, Hexagon, Waves, Minus, Home,
  Building2, Circle, AlertTriangle, AlertCircle, User, Users,
  CheckCircle, Map, FileText, BookOpen, Shield, Sword, Crown,
  Move, Package, EyeOff
};

export default function ComponentsList({ components, accentColor, accentColorRgb }: ComponentsListProps) {
  return (
    <div>
      <h2 className="mb-6 font-display text-2xl font-bold text-text-primary">What&apos;s in the Box</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {components.map((component) => {
          const Icon = component.icon ? (iconMap[component.icon] ?? Layers) : Layers;
          return (
            <div
              key={component.name}
              className="flex flex-col items-center rounded-xl border p-4 text-center"
              style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl"
                style={{ background: `rgba(${accentColorRgb}, 0.1)` }}
              >
                <Icon className="h-5 w-5" style={{ color: accentColor }} />
              </div>
              <span
                className="mb-1 font-mono text-xl font-bold"
                style={{ color: accentColor }}
              >
                {component.quantity > 0 ? `×${component.quantity}` : "opt."}
              </span>
              <span className="text-sm font-medium text-text-primary">{component.name}</span>
              {component.description && (
                <span className="mt-1 text-xs text-text-muted">{component.description}</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
