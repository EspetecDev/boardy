"use client";

import { usePathname, useRouter } from "next/navigation";
import { locales } from "@/i18n/config";
import { useTranslations } from "@/i18n/TranslationProvider";

interface LocaleSwitcherProps {
  currentLang: string;
}

export default function LocaleSwitcher({ currentLang }: LocaleSwitcherProps) {
  const dict = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(newLang: string) {
    const segments = pathname.split("/");
    segments[1] = newLang;
    router.push(segments.join("/"));
  }

  return (
    <div className="flex items-center gap-1">
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => switchLocale(locale)}
          className="rounded px-2 py-1 text-xs font-medium uppercase transition-colors"
          style={{
            color:
              locale === currentLang
                ? "var(--color-accent-primary)"
                : "var(--color-text-muted)",
            background:
              locale === currentLang ? "rgba(108,99,255,0.12)" : "transparent",
          }}
        >
          {dict.locale[locale]}
        </button>
      ))}
    </div>
  );
}
