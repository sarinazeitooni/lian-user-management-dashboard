"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { isLocalUserId, type User } from "@/features/users/types/user";

interface UserCardProps {
  user: User;
  onDelete?: (user: User) => void;
}

export function UserCard({ user, onDelete }: UserCardProps) {
  const canDelete = isLocalUserId(user.id);

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-start gap-3">
        <Avatar name={user.name} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-medium text-slate-900 dark:text-slate-50">
            {user.name}
          </h3>
          <p className="truncate text-sm text-slate-500 dark:text-slate-400">
            @{user.username}
          </p>
        </div>
      </div>

      <dl className="mt-4 space-y-2 text-sm">
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Email
          </dt>
          <dd className="truncate text-slate-700 dark:text-slate-200">
            {user.email}
          </dd>
        </div>
        <div>
          <dt className="text-xs font-medium uppercase tracking-wide text-slate-400">
            Company
          </dt>
          <dd className="truncate text-slate-700 dark:text-slate-200">
            {user.company?.name || "—"}
          </dd>
        </div>
      </dl>

      <div className="mt-4 flex items-center gap-2">
        <Link
          href={`/users/${user.id}`}
          className="inline-flex h-8 flex-1 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        >
          <Eye className="h-4 w-4" />
          View
        </Link>
        {canDelete && onDelete ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40"
            onClick={() => onDelete(user)}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        ) : null}
      </div>
    </article>
  );
}
