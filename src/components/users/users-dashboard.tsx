"use client";

import { useMemo, useState } from "react";
import { FilterX, Plus, SearchX, Users } from "lucide-react";
import { AppHeader } from "@/components/layout/app-header";
import { AddUserDialog } from "@/components/users/add-user-dialog";
import { DeleteUserDialog } from "@/components/users/delete-user-dialog";
import { UserCard } from "@/components/users/user-card";
import { UserFilters } from "@/components/users/user-filters";
import { UserSearch } from "@/components/users/user-search";
import { UserSort } from "@/components/users/user-sort";
import { UsersTable } from "@/components/users/users-table";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { ErrorState } from "@/components/ui/error-state";
import { LoadingState } from "@/components/ui/loading-state";
import { useUsers } from "@/features/users/hooks/use-users";
import {
  applyUserListPipeline,
  getCompanyOptions,
  paginateUsers,
} from "@/features/users/lib/user-filters";
import {
  DEFAULT_SORT,
  type SortOption,
  type User,
} from "@/features/users/types/user";

const PAGE_SIZE = 10;

export function UsersDashboard() {
  const { users, isInitialLoading, isError, error, refetch, createUser, deleteUser } =
    useUsers();

  const [search, setSearch] = useState("");
  const [company, setCompany] = useState("");
  const [sort, setSort] = useState<SortOption>(DEFAULT_SORT);
  const [page, setPage] = useState(1);
  const [addOpen, setAddOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const companies = useMemo(() => getCompanyOptions(users), [users]);

  const processedUsers = useMemo(
    () => applyUserListPipeline(users, search, company, sort),
    [users, search, company, sort],
  );

  const { items: pageItems, totalPages, page: safePage } = useMemo(
    () => paginateUsers(processedUsers, page, PAGE_SIZE),
    [processedUsers, page],
  );

  const updateSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const updateCompany = (value: string) => {
    setCompany(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCompany("");
    setPage(1);
  };

  const hasActiveFilters = Boolean(search.trim() || company);
  const showEmptyCollection =
    !isInitialLoading && !isError && users.length === 0;
  const showNoResults =
    !isInitialLoading &&
    !isError &&
    users.length > 0 &&
    processedUsers.length === 0;

  return (
    <>
      <AppHeader
        title="Users"
        subtitle="Browse, search, and manage your organization directory. Locally created users stay on this device."
        userCount={isInitialLoading ? undefined : users.length}
        action={
          <Button onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4" />
            Add User
          </Button>
        }
      />

      <div className="space-y-5 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:flex-row lg:items-end lg:justify-between">
          <UserSearch value={search} onChange={updateSearch} />
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-end lg:w-auto">
            <UserSort value={sort} onChange={setSort} />
            <UserFilters
              companies={companies}
              company={company}
              onCompanyChange={updateCompany}
              hasActiveFilters={hasActiveFilters}
              onClearFilters={clearFilters}
            />
          </div>
        </div>

        {isInitialLoading ? (
          <LoadingState label="Loading users…" />
        ) : isError ? (
          <ErrorState
            title="Unable to load users"
            message={
              error instanceof Error
                ? error.message
                : "The users API is unavailable right now."
            }
            onRetry={() => {
              void refetch();
            }}
          />
        ) : showEmptyCollection ? (
          <EmptyState
            icon={Users}
            title="No users yet"
            description="There are no users in the directory. Add a local user to get started."
            action={
              <Button onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4" />
                Add User
              </Button>
            }
          />
        ) : showNoResults ? (
          <EmptyState
            icon={search.trim() ? SearchX : FilterX}
            title={search.trim() ? "No matching users" : "No users for this filter"}
            description={
              search.trim()
                ? "Try a different name or email, or clear your search."
                : "No users belong to the selected company. Clear filters to see everyone."
            }
            action={
              <Button variant="outline" onClick={clearFilters}>
                Clear filters
              </Button>
            }
          />
        ) : (
          <>
            <div className="hidden md:block">
              <UsersTable users={pageItems} onDelete={setUserToDelete} />
            </div>
            <div className="grid gap-3 md:hidden">
              {pageItems.map((user) => (
                <UserCard
                  key={String(user.id)}
                  user={user}
                  onDelete={setUserToDelete}
                />
              ))}
            </div>

            {processedUsers.length > PAGE_SIZE ? (
              <div className="flex flex-col items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm sm:flex-row dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300">
                <p>
                  Showing{" "}
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {(safePage - 1) * PAGE_SIZE + 1}
                    –
                    {Math.min(safePage * PAGE_SIZE, processedUsers.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-medium text-slate-900 dark:text-slate-100">
                    {processedUsers.length}
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage <= 1}
                    onClick={() => setPage(safePage - 1)}
                  >
                    Previous
                  </Button>
                  <span className="min-w-24 text-center">
                    Page {safePage} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={safePage >= totalPages}
                    onClick={() => setPage(safePage + 1)}
                  >
                    Next
                  </Button>
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>

      <AddUserDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onCreate={createUser}
      />

      <DeleteUserDialog
        user={userToDelete}
        open={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        onConfirm={() => {
          if (userToDelete) {
            deleteUser(userToDelete);
            setUserToDelete(null);
          }
        }}
      />
    </>
  );
}
