import type { LucideIcon } from "lucide-react";
import { Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: LucideIcon;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon: Icon = Users,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex min-h-48 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/80 px-6 py-10 text-center dark:border-slate-700 dark:bg-slate-900/40",
        className,
      )}
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
        <Icon className="h-5 w-5" />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
          {title}
        </h3>
        <p className="max-w-md text-sm text-slate-600 dark:text-slate-300">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
}
