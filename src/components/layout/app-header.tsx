"use client";

import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme/theme-provider";

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  userCount?: number;
  action?: React.ReactNode;
}

export function AppHeader({
  title,
  subtitle,
  userCount,
  action,
}: AppHeaderProps) {
  const { theme, toggleTheme, hydrated } = useTheme();

  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90">
      <div className="flex flex-col gap-4 px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0 space-y-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50">
                {title}
              </h1>
              {typeof userCount === "number" ? (
                <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
                  {userCount} {userCount === 1 ? "user" : "users"}
                </span>
              ) : null}
            </div>
            {subtitle ? (
              <p className="max-w-2xl text-sm text-slate-500 dark:text-slate-400">
                {subtitle}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label={
                hydrated
                  ? `Switch to ${theme === "dark" ? "light" : "dark"} mode`
                  : "Toggle theme"
              }
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
            {action}
          </div>
        </div>
      </div>
    </header>
  );
}
