import { Suspense } from "react";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { MobileNavigation } from "@/components/layout/mobile-navigation";

function MobileNavigationFallback() {
  return (
    <div className="flex h-14 items-center border-b border-slate-200 bg-white px-4 lg:hidden dark:border-slate-800 dark:bg-slate-950">
      <span className="text-sm font-semibold text-slate-900 dark:text-slate-50">
        Lian Admin
      </span>
    </div>
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full bg-slate-50 dark:bg-slate-950">
      <Suspense fallback={<aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white lg:block dark:border-slate-800 dark:bg-slate-950" />}>
        <AppSidebar />
      </Suspense>
      <div className="flex min-w-0 flex-1 flex-col">
        <Suspense fallback={<MobileNavigationFallback />}>
          <MobileNavigation />
        </Suspense>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
