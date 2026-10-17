import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Something went wrong",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-rose-200 bg-rose-50/70 px-6 py-10 text-center dark:border-rose-900/60 dark:bg-rose-950/30",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h3>
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
          {message}
        </p>
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
