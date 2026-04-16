import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 text-7xl">🎲</div>
      <h1 className="mb-3 font-display text-4xl font-black text-text-primary">Page not found</h1>
      <p className="mb-8 max-w-sm text-text-secondary">
        The game guide you&apos;re looking for doesn&apos;t exist — yet. Try browsing our collection.
      </p>
      <Link
        href="/games"
        className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
        style={{ background: "var(--color-accent-primary)" }}
      >
        Browse all games
      </Link>
    </div>
  );
}
