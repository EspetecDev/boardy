"use client";

import { createContext, useContext } from "react";
import type en from "../../messages/en.json";

export type Dictionary = typeof en;

const TranslationContext = createContext<Dictionary | null>(null);

export function TranslationProvider({
  dict,
  children,
}: {
  dict: Dictionary;
  children: React.ReactNode;
}) {
  return (
    <TranslationContext.Provider value={dict}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslations(): Dictionary {
  const ctx = useContext(TranslationContext);
  if (!ctx) throw new Error("useTranslations must be used within TranslationProvider");
  return ctx;
}
