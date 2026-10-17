import { describe, expect, it } from "vitest";
import { addUserSchema } from "@/features/users/lib/add-user-schema";

describe("addUserSchema", () => {
  it("accepts a valid payload and trims whitespace", () => {
    const parsed = addUserSchema.parse({
      name: "  Jane Doe  ",
      username: "  jane  ",
      email: "  jane@example.com  ",
      phone: " 555-0100 ",
      website: " jane.dev ",
      companyName: " Lian ",
      street: " 1 Main St ",
      city: " Tehran ",
      zipcode: " 12345 ",
    });

    expect(parsed.name).toBe("Jane Doe");
    expect(parsed.username).toBe("jane");
    expect(parsed.email).toBe("jane@example.com");
  });

  it("rejects missing required fields and invalid email", () => {
    const result = addUserSchema.safeParse({
      name: "   ",
      username: "",
      email: "not-an-email",
      phone: "",
      website: "",
      companyName: "",
      street: "",
      city: "",
      zipcode: "",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((issue) => issue.path[0]);
      expect(paths).toContain("name");
      expect(paths).toContain("username");
      expect(paths).toContain("email");
    }
  });
});
