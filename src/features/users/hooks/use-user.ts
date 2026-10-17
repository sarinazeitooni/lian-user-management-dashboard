"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchUserById } from "@/features/users/api/users-api";
import { useLocalUsersState } from "@/features/users/hooks/use-local-users";
import { getLocalUserById } from "@/features/users/lib/user-storage";
import { isLocalUserId } from "@/features/users/types/user";
import { userQueryKeys } from "@/lib/query-client";

export function useUser(id: string) {
  const { deletedApiUserIds, hydrated } = useLocalUsersState();
  const local = isLocalUserId(id);
  const locallyDeleted = deletedApiUserIds.has(id);

  const localUser = hydrated && local ? getLocalUserById(id) : undefined;

  const query = useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => fetchUserById(id),
    enabled: Boolean(id) && !local && !locallyDeleted,
  });

  if (local) {
    return {
      user: localUser,
      isLoading: !hydrated,
      isError: hydrated && !localUser,
      error: hydrated && !localUser ? new Error("User not found") : null,
      refetch: () => Promise.resolve(),
      isLocal: true,
    };
  }

  if (locallyDeleted) {
    return {
      user: undefined,
      isLoading: false,
      isError: true,
      error: new Error("User not found"),
      refetch: () => Promise.resolve(),
      isLocal: false,
    };
  }

  return {
    user: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
    isLocal: false,
  };
}
