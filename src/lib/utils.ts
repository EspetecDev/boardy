import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPlayTime(min: number, max: number): string {
  if (min === max) return `${min} min`;
  if (max >= 120) return `${min}–${max / 60}h`;
  return `${min}–${max} min`;
}

export function formatPlayerCount(minP: number, maxP: number, ideal?: number): string {
  if (minP === maxP) return `${minP} players`;
  if (ideal) return `${minP}–${maxP} (best ${ideal})`;
  return `${minP}–${maxP} players`;
}
