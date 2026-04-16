import type { Locale } from "./config";

const dictionaries = {
  en: () => import("../../messages/en.json").then((m) => m.default),
  es: () => import("../../messages/es.json").then((m) => m.default),
  fr: () => import("../../messages/fr.json").then((m) => m.default),
  de: () => import("../../messages/de.json").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}
