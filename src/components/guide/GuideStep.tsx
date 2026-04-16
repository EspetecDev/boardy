import type { GuideStep as GuideStepType } from "@/types/game";
import { Lightbulb } from "lucide-react";

interface GuideStepProps {
  step: GuideStepType;
  accentColor: string;
  accentColorRgb: string;
}

export default function GuideStep({ step, accentColor, accentColorRgb }: GuideStepProps) {
  return (
    <div className="flex gap-4">
      {/* Step number */}
      <div className="flex flex-col items-center">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm font-bold text-white"
          style={{ background: accentColor }}
        >
          {step.number}
        </div>
        <div
          className="mt-2 w-px flex-1"
          style={{ background: "var(--color-bg-border)", minHeight: "1rem" }}
        />
      </div>

      {/* Content */}
      <div className="pb-8">
        <h4 className="mb-1.5 font-semibold text-text-primary">{step.title}</h4>
        <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
        {step.tip && (
          <div
            className="mt-3 flex items-start gap-2 rounded-lg p-3 text-sm"
            style={{
              background: `rgba(${accentColorRgb}, 0.08)`,
              borderLeft: `3px solid ${accentColor}`,
            }}
          >
            <Lightbulb className="mt-0.5 h-4 w-4 shrink-0" style={{ color: accentColor }} />
            <span className="text-text-secondary">{step.tip}</span>
          </div>
        )}
      </div>
    </div>
  );
}
