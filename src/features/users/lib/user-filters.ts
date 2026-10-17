import type { SortOption, User } from "@/features/users/types/user";

export function getCompanyOptions(users: User[]): string[] {
  const companies = new Set<string>();

  for (const user of users) {
    const name = user.company?.name?.trim();
    if (name) companies.add(name);
  }

  return Array.from(companies).sort((a, b) => a.localeCompare(b));
}

export function filterUsers(
  users: User[],
  search: string,
  company: string,
): User[] {
  const query = search.trim().toLowerCase();
  const companyFilter = company.trim();

  return users.filter((user) => {
    const matchesSearch =
      !query ||
      user.name.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query);

    const matchesCompany =
      !companyFilter || user.company?.name === companyFilter;

    return matchesSearch && matchesCompany;
  });
}

export function sortUsers(users: User[], sort: SortOption): User[] {
  const sorted = [...users];
  const multiplier = sort.direction === "asc" ? 1 : -1;

  sorted.sort((a, b) => {
    const left = (sort.field === "name" ? a.name : a.email).toLowerCase();
    const right = (sort.field === "name" ? b.name : b.email).toLowerCase();
    return left.localeCompare(right) * multiplier;
  });

  return sorted;
}

export function applyUserListPipeline(
  users: User[],
  search: string,
  company: string,
  sort: SortOption,
): User[] {
  return sortUsers(filterUsers(users, search, company), sort);
}

export function paginateUsers<T>(
  items: T[],
  page: number,
  pageSize: number,
): { items: T[]; totalPages: number; page: number } {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(Math.max(page, 1), totalPages);
  const start = (safePage - 1) * pageSize;

  return {
    items: items.slice(start, start + pageSize),
    totalPages,
    page: safePage,
  };
}
