"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { User } from "@/features/users/types/user";
import {
  addLocalUser,
  getDeletedApiUserIds,
  getLocalUsers,
  markApiUserDeleted,
  removeLocalUser,
} from "@/features/users/lib/user-storage";

function subscribe(onStoreChange: () => void): () => void {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener("lian-local-users-changed", onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener("lian-local-users-changed", onStoreChange);
  };
}

function notifyLocalUsersChanged(): void {
  window.dispatchEvent(new Event("lian-local-users-changed"));
}

function getLocalUsersSnapshot(): string {
  return JSON.stringify({
    users: getLocalUsers(),
    deletedIds: getDeletedApiUserIds(),
  });
}

const SERVER_SNAPSHOT = JSON.stringify({ users: [], deletedIds: [] });

export function useLocalUsersState() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getLocalUsersSnapshot,
    () => SERVER_SNAPSHOT,
  );

  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const { users: localUsers, deletedIds } = JSON.parse(snapshot) as {
    users: User[];
    deletedIds: string[];
  };

  const createUser = useCallback((user: User) => {
    addLocalUser(user);
    notifyLocalUsersChanged();
  }, []);

  const deleteUser = useCallback((user: User) => {
    if (typeof user.id === "string" && user.id.startsWith("local-")) {
      removeLocalUser(user.id);
    } else {
      markApiUserDeleted(user.id);
    }
    notifyLocalUsersChanged();
  }, []);

  return {
    localUsers,
    deletedApiUserIds: new Set(deletedIds),
    hydrated,
    createUser,
    deleteUser,
  };
}
