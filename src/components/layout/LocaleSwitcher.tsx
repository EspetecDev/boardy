"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Check } from "lucide-react";
import { locales } from "@/i18n/config";
import { useTranslations } from "@/i18n/TranslationProvider";

const flags: Record<string, string> = {
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  de: "🇩🇪",
  pt: "🇵🇹",
  ca: "🏴󠁥󠁳󠁣󠁴󠁿",
  ru: "🇷🇺",
};

interface LocaleSwitcherProps {
  currentLang: string;
}

export default function LocaleSwitcher({ currentLang }: LocaleSwitcherProps) {
  const dict = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onPointerDown(e: PointerEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, []);

  function switchLocale(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
    setOpen(false);
  }

  const currentFlag = flags[currentLang] ?? "🌐";
  const currentName = dict.locale[currentLang as keyof typeof dict.locale] ?? currentLang.toUpperCase();

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors"
        style={{
          color: "var(--color-text-secondary)",
          background: open ? "var(--color-bg-elevated)" : "transparent",
        }}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className="text-base leading-none">{currentFlag}</span>
        <span className="hidden sm:inline">{currentName}</span>
        <ChevronDown
          className="h-3.5 w-3.5 transition-transform duration-150"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute right-0 top-full z-50 mt-1.5 w-44 overflow-hidden rounded-xl border py-1 shadow-xl"
          style={{
            background: "var(--color-bg-elevated)",
            borderColor: "var(--color-bg-border)",
            boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
          }}
        >
          {locales.map((locale) => {
            const isActive = locale === currentLang;
            const localeName = dict.locale[locale as keyof typeof dict.locale] ?? locale.toUpperCase();
            return (
              <button
                key={locale}
                role="option"
                aria-selected={isActive}
                onClick={() => switchLocale(locale)}
                className="flex w-full items-center gap-2.5 px-3 py-2 text-sm transition-colors"
                style={{
                  color: isActive ? "var(--color-accent-primary)" : "var(--color-text-secondary)",
                  background: isActive ? "rgba(108,99,255,0.08)" : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                }}
              >
                <span className="text-base leading-none">{flags[locale] ?? "🌐"}</span>
                <span className="flex-1 text-left">{localeName}</span>
                {isActive && <Check className="h-3.5 w-3.5 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
