"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/features/users/api/users-api";
import { useLocalUsersState } from "@/features/users/hooks/use-local-users";
import { userQueryKeys } from "@/lib/query-client";
import type { User } from "@/features/users/types/user";

export function useUsers() {
  const query = useQuery({
    queryKey: userQueryKeys.list(),
    queryFn: fetchUsers,
  });

  const { localUsers, deletedApiUserIds, hydrated, createUser, deleteUser } =
    useLocalUsersState();

  const apiUsers = (query.data ?? []).filter(
    (user) => !deletedApiUserIds.has(String(user.id)),
  );

  const users: User[] = hydrated ? [...apiUsers, ...localUsers] : apiUsers;

  return {
    ...query,
    users,
    localUsers,
    hydrated,
    createUser,
    deleteUser,
    isInitialLoading: query.isLoading && !query.data,
  };
}
