import { describe, expect, it } from "vitest";
import {
  applyUserListPipeline,
  filterUsers,
  getCompanyOptions,
  sortUsers,
} from "@/features/users/lib/user-filters";
import type { User } from "@/features/users/types/user";

function makeUser(overrides: Partial<User> & Pick<User, "id" | "name" | "email">): User {
  return {
    username: overrides.username ?? overrides.name.toLowerCase().replace(/\s+/g, ""),
    phone: "",
    website: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: "Acme",
      catchPhrase: "",
      bs: "",
    },
    ...overrides,
  };
}

const users: User[] = [
  makeUser({
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    company: { name: "Acme", catchPhrase: "", bs: "" },
  }),
  makeUser({
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    company: { name: "Globex", catchPhrase: "", bs: "" },
  }),
  makeUser({
    id: 3,
    name: "Carla Diaz",
    email: "carla@acme.test",
    company: { name: "Acme", catchPhrase: "", bs: "" },
  }),
];

describe("filterUsers", () => {
  it("searches by name case-insensitively", () => {
    const result = filterUsers(users, "aLiCe", "");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Alice Johnson");
  });

  it("searches by email case-insensitively", () => {
    const result = filterUsers(users, "BOB@EXAMPLE.COM", "");
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it("filters by company", () => {
    const result = filterUsers(users, "", "Acme");
    expect(result.map((user) => user.id)).toEqual([1, 3]);
  });
});

describe("sortUsers", () => {
  it("sorts by name ascending and descending", () => {
    const asc = sortUsers(users, { field: "name", direction: "asc" });
    expect(asc.map((user) => user.name)).toEqual([
      "Alice Johnson",
      "Bob Smith",
      "Carla Diaz",
    ]);

    const desc = sortUsers(users, { field: "name", direction: "desc" });
    expect(desc.map((user) => user.name)).toEqual([
      "Carla Diaz",
      "Bob Smith",
      "Alice Johnson",
    ]);
  });

  it("sorts by email", () => {
    const asc = sortUsers(users, { field: "email", direction: "asc" });
    expect(asc.map((user) => user.email)).toEqual([
      "alice@example.com",
      "bob@example.com",
      "carla@acme.test",
    ]);
  });
});

describe("applyUserListPipeline", () => {
  it("combines search, company filter, and sort", () => {
    const result = applyUserListPipeline(
      users,
      "a",
      "Acme",
      { field: "email", direction: "desc" },
    );

    expect(result.map((user) => user.id)).toEqual([3, 1]);
  });

  it("builds company options from loaded users", () => {
    expect(getCompanyOptions(users)).toEqual(["Acme", "Globex"]);
  });
});
