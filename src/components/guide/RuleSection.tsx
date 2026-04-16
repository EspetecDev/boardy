import type { GuideSection, Game } from "@/types/game";
import GuideStep from "./GuideStep";
import RuleItem from "./RuleItem";
import dynamic from "next/dynamic";

const ChessBoard = dynamic(() => import("@/components/diagrams/ChessBoard"), { ssr: true });
const CatanBoard = dynamic(() => import("@/components/diagrams/CatanBoard"), { ssr: true });
const CardLayout = dynamic(() => import("@/components/diagrams/CardLayout"), { ssr: true });
const DiceDisplay = dynamic(() => import("@/components/diagrams/DiceDisplay"), { ssr: true });

interface RuleSectionProps {
  section: GuideSection;
  game: Game;
}

const diagramComponents: Record<string, React.ComponentType<Record<string, unknown>>> = {
  ChessBoard: ChessBoard as React.ComponentType<Record<string, unknown>>,
  CatanBoard: CatanBoard as React.ComponentType<Record<string, unknown>>,
  CardLayout: CardLayout as React.ComponentType<Record<string, unknown>>,
  DiceDisplay: DiceDisplay as React.ComponentType<Record<string, unknown>>,
};

export default function RuleSection({ section, game }: RuleSectionProps) {
  const DiagramComponent = section.diagram?.component
    ? diagramComponents[section.diagram.component]
    : null;

  return (
    <section id={section.id} className="mb-14 scroll-mt-24">
      <h2 className="mb-2 font-display text-2xl font-bold text-text-primary sm:text-3xl">
        {section.title}
      </h2>
      <div
        className="mb-6 h-0.5 w-12 rounded-full"
        style={{ background: game.accentColor }}
      />

      {section.content && (
        <p className="mb-6 leading-relaxed text-text-secondary">{section.content}</p>
      )}

      {/* Diagram */}
      {DiagramComponent && section.diagram && (
        <div
          className="mb-8 overflow-hidden rounded-2xl border"
          style={{ borderColor: `rgba(${game.accentColorRgb}, 0.2)`, background: "var(--color-bg-surface)" }}
        >
          <div className="p-6">
            <DiagramComponent {...(section.diagram.props ?? {})} />
          </div>
          {section.diagram.caption && (
            <div
              className="border-t px-6 py-3 text-center text-xs text-text-muted"
              style={{ borderColor: "var(--color-bg-border)" }}
            >
              {section.diagram.caption}
            </div>
          )}
        </div>
      )}

      {/* Steps */}
      {section.steps && section.steps.length > 0 && (
        <div className="mt-4">
          {section.steps.map((step) => (
            <GuideStep
              key={step.number}
              step={step}
              accentColor={game.accentColor}
              accentColorRgb={game.accentColorRgb}
            />
          ))}
        </div>
      )}

      {/* Rules */}
      {section.rules && section.rules.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2">
          {section.rules.map((rule) => (
            <RuleItem
              key={rule.id}
              rule={rule}
              accentColor={game.accentColor}
              accentColorRgb={game.accentColorRgb}
            />
          ))}
        </div>
      )}
    </section>
  );
}
