import type { Dictionary } from "@/i18n/TranslationProvider";

interface StatsBarProps {
  dict: Dictionary["home"]["stats"];
}

export default function StatsBar({ dict }: StatsBarProps) {
  const stats = [
    { value: "6", label: dict.gameGuides },
    { value: "4", label: dict.gameTypes },
    { value: "2–10", label: dict.playerCounts },
    { value: "All", label: dict.skillLevels },
  ];

  return (
    <div
      className="border-y py-6"
      style={{ borderColor: "var(--color-bg-border)", background: "var(--color-bg-surface)" }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-6 text-center sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                className="font-display text-3xl font-black sm:text-4xl"
                style={{ color: "var(--color-accent-primary)" }}
              >
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-text-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
