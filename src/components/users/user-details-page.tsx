"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { UserDetails } from "@/components/users/user-details";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { useUser } from "@/features/users/hooks/use-user";

interface UserDetailsPageProps {
  id: string;
}

export function UserDetailsPage({ id }: UserDetailsPageProps) {
  const { user, isLoading, isError, error, refetch, isLocal } = useUser(id);

  return (
    <>
      <AppHeader
        title="User details"
        subtitle="Profile, contact, address, and company information."
        action={
          <Link
            href="/users"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        }
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-4 md:hidden">
          <Link
            href="/users"
            className="inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Users
          </Link>
        </div>

        {isLoading ? (
          <LoadingState label="Loading user details…" />
        ) : isError || !user ? (
          <ErrorState
            title="User not found"
            message={
              error instanceof Error
                ? error.message
                : "This user does not exist or is no longer available."
            }
            onRetry={
              isLocal
                ? undefined
                : () => {
                    void refetch();
                  }
            }
          />
        ) : (
          <UserDetails user={user} />
        )}
      </div>
    </>
  );
}
