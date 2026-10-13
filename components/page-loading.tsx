import { Spinner } from "@/components/ui/spinner";

/** Suspense fallback for page content. */
export function PageLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Spinner />
      {label}
    </div>
  );
}
