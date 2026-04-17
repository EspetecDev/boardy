export const locales = ["en", "es", "fr", "de", "pt", "ca", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export function hasLocale(locale: string): locale is Locale {
  return (locales as readonly string[]).includes(locale);
}

export function localePath(lang: string, path: string): string {
  return `/${lang}${path}`;
}
