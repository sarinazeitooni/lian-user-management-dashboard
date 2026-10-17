export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

/** Shape returned by JSONPlaceholder and used throughout the app. */
export interface User {
  id: number | string;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type SortField = "name" | "email";
export type SortDirection = "asc" | "desc";

export interface SortOption {
  field: SortField;
  direction: SortDirection;
}

export interface UserListFilters {
  search: string;
  company: string;
  sort: SortOption;
}

export const DEFAULT_SORT: SortOption = {
  field: "name",
  direction: "asc",
};

export function isLocalUserId(id: number | string): boolean {
  return typeof id === "string" && id.startsWith("local-");
}

export function createLocalUserId(): string {
  return `local-${crypto.randomUUID()}`;
}
