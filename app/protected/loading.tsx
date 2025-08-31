export default function Loading() {
  return (
    <div className="min-h-svh grid place-items-center p-6">
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-foreground" />
        <p className="text-sm text-muted-foreground">Entrando a tu espacio…</p>
      </div>
    </div>
  );
}
