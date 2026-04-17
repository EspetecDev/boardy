import { Search, BookOpen, Dices } from "lucide-react";
import type { Dictionary } from "@/i18n/TranslationProvider";

interface HowItWorksProps {
  dict: Dictionary["home"]["howItWorks"];
}

export default function HowItWorks({ dict }: HowItWorksProps) {
  const steps = [
    { icon: Search, color: "#6c63ff", title: dict.step1Title, description: dict.step1Desc },
    { icon: BookOpen, color: "#4cc9f0", title: dict.step2Title, description: dict.step2Desc },
    { icon: Dices, color: "#06d6a0", title: dict.step3Title, description: dict.step3Desc },
  ];

  return (
    <section className="px-4 py-16 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-text-primary sm:text-4xl">
            {dict.title}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={i} className="relative flex flex-col items-center text-center sm:items-start sm:text-left">
                {i < steps.length - 1 && (
                  <div
                    className="absolute left-1/2 top-6 hidden h-px w-full -translate-y-1/2 sm:block"
                    style={{ background: "var(--color-bg-border)", left: "calc(50% + 3rem)" }}
                  />
                )}
                <div
                  className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
                  style={{ background: `${step.color}18` }}
                >
                  <Icon className="h-7 w-7" style={{ color: step.color }} />
                </div>
                <div
                  className="mb-1 font-mono text-xs font-bold uppercase tracking-widest"
                  style={{ color: step.color }}
                >
                  {dict.stepLabel} {i + 1}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-text-primary">{step.title}</h3>
                <p className="text-sm leading-relaxed text-text-secondary">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
