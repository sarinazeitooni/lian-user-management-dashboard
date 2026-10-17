import { beforeEach, describe, expect, it } from "vitest";
import {
  addLocalUser,
  getLocalUserById,
  getLocalUsers,
  removeLocalUser,
  saveLocalUsers,
} from "@/features/users/lib/user-storage";
import type { User } from "@/features/users/types/user";

function makeLocalUser(id: string): User {
  return {
    id,
    name: "Local User",
    username: "localuser",
    email: "local@example.com",
    phone: "",
    website: "",
    address: {
      street: "Street",
      suite: "",
      city: "City",
      zipcode: "00000",
      geo: { lat: "0", lng: "0" },
    },
    company: {
      name: "Local Co",
      catchPhrase: "",
      bs: "",
    },
  };
}

describe("user-storage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists locally created users", () => {
    const user = makeLocalUser("local-1");
    addLocalUser(user);

    expect(getLocalUsers()).toEqual([user]);
    expect(getLocalUserById("local-1")).toEqual(user);
  });

  it("deletes a locally created user", () => {
    saveLocalUsers([makeLocalUser("local-1"), makeLocalUser("local-2")]);
    removeLocalUser("local-1");

    expect(getLocalUsers().map((user) => user.id)).toEqual(["local-2"]);
    expect(getLocalUserById("local-1")).toBeUndefined();
  });
});
