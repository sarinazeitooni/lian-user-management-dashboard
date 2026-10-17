"use client";

import Link from "next/link";
import { Eye, Trash2 } from "lucide-react";
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { isLocalUserId, type User } from "@/features/users/types/user";

interface UsersTableProps {
  users: User[];
  onDelete: (user: User) => void;
}

export function UsersTable({ users, onDelete }: UsersTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <table className="min-w-full divide-y divide-slate-200 text-left text-sm dark:divide-slate-800">
        <thead className="bg-slate-50/80 dark:bg-slate-950/60">
          <tr>
            <th scope="col" className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
              Name
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
              Email
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
              Company
            </th>
            <th scope="col" className="px-4 py-3 font-medium text-slate-500 dark:text-slate-400">
              Username
            </th>
            <th scope="col" className="px-4 py-3 text-right font-medium text-slate-500 dark:text-slate-400">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
          {users.map((user) => {
            const canDelete = isLocalUserId(user.id);

            return (
              <tr
                key={String(user.id)}
                className="transition-colors hover:bg-slate-50/80 dark:hover:bg-slate-800/40"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={user.name} size="sm" />
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-900 dark:text-slate-50">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:hidden">
                        @{user.username}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  <a
                    href={`mailto:${user.email}`}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    {user.email}
                  </a>
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  {user.company?.name || "—"}
                </td>
                <td className="px-4 py-3 text-slate-600 dark:text-slate-300">
                  @{user.username}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/users/${user.id}`}
                      className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 dark:text-slate-200 dark:hover:bg-slate-800"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only">View</span>
                    </Link>
                    {canDelete ? (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:hover:bg-rose-950/40"
                        onClick={() => onDelete(user)}
                        aria-label={`Delete ${user.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only sm:not-sr-only">Delete</span>
                      </Button>
                    ) : null}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
