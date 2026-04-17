import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { hasLocale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { TranslationProvider } from "@/i18n/TranslationProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata: Metadata = {
  title: "Boardy – Tabletop Game Guides",
  description:
    "Beautiful, practical guides for board games, card games, and RPGs. Learn any game with visual diagrams and step-by-step rules.",
  keywords: ["board games", "tabletop games", "game rules", "how to play", "game guides"],
  openGraph: {
    title: "Boardy – Tabletop Game Guides",
    description: "Beautiful, practical guides for board games, card games, and RPGs.",
    type: "website",
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <TranslationProvider dict={dict}>
      <Header lang={lang} />
      <main className="flex-1">{children}</main>
      <Footer lang={lang} />
    </TranslationProvider>
  );
}
