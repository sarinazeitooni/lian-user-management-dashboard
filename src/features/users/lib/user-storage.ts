import type { User } from "@/features/users/types/user";

const LOCAL_USERS_KEY = "lian-local-users";
const DELETED_API_USER_IDS_KEY = "lian-deleted-api-user-ids";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function readJson<T>(key: string, fallback: T): T {
  if (!canUseStorage()) return fallback;

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown): void {
  if (!canUseStorage()) return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalUsers(): User[] {
  return readJson<User[]>(LOCAL_USERS_KEY, []);
}

export function saveLocalUsers(users: User[]): void {
  writeJson(LOCAL_USERS_KEY, users);
}

export function addLocalUser(user: User): User[] {
  const next = [...getLocalUsers(), user];
  saveLocalUsers(next);
  return next;
}

export function removeLocalUser(id: string | number): User[] {
  const next = getLocalUsers().filter((user) => String(user.id) !== String(id));
  saveLocalUsers(next);
  return next;
}

export function getLocalUserById(id: string | number): User | undefined {
  return getLocalUsers().find((user) => String(user.id) === String(id));
}

export function getDeletedApiUserIds(): string[] {
  return readJson<string[]>(DELETED_API_USER_IDS_KEY, []);
}

export function markApiUserDeleted(id: string | number): string[] {
  const next = Array.from(new Set([...getDeletedApiUserIds(), String(id)]));
  writeJson(DELETED_API_USER_IDS_KEY, next);
  return next;
}
