"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Menu, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function MobileNavigationPanel({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const active = pathname === "/users" || pathname.startsWith("/users/");

  return (
    <>
      <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
            Lian Admin
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          aria-label={open ? "Close navigation" : "Open navigation"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-slate-950/40"
            aria-label="Close navigation overlay"
            onClick={() => setOpen(false)}
          />
          <nav
            aria-label="Mobile"
            className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-slate-200 bg-white p-4 shadow-xl dark:border-slate-800 dark:bg-slate-950"
          >
            <div className="mb-4 flex items-center gap-2.5 px-1">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  Lian Admin
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  User management
                </p>
              </div>
            </div>
            <Link
              href="/users"
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium",
                active
                  ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-950/70 dark:text-indigo-300"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900",
              )}
              aria-current={active ? "page" : undefined}
            >
              <Users className="h-4 w-4" />
              Users
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}

export function MobileNavigation() {
  const pathname = usePathname();
  // Remount on route change so the drawer always closes after navigation.
  return <MobileNavigationPanel key={pathname} pathname={pathname} />;
}
