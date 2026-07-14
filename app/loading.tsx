export default function Loading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24">
      <div className="flex flex-col items-center gap-4">
        <span className="h-10 w-10 animate-spin rounded-full border-2 border-line border-t-accent" />
        <span className="text-sm text-muted">Loading…</span>
      </div>
    </div>
  );
}
