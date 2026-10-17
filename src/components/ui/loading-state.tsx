import { LoaderCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingStateProps {
  label?: string;
  className?: string;
}

export function LoadingState({
  label = "Loading…",
  className,
}: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-slate-600 dark:border-slate-700 dark:bg-slate-900/50 dark:text-slate-300",
        className,
      )}
    >
      <LoaderCircle className="h-6 w-6 animate-spin text-indigo-600 motion-reduce:animate-none dark:text-indigo-400" />
      <p className="text-sm font-medium">{label}</p>
    </div>
  );
}
