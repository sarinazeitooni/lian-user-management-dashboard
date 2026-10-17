import type { User } from "@/features/users/types/user";

const BASE_URL = "https://jsonplaceholder.typicode.com";

export class ApiError extends Error {
  readonly status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

async function request<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BASE_URL}${path}`, {
      headers: { Accept: "application/json" },
    });
  } catch {
    throw new ApiError("Unable to reach the users API. Check your connection and try again.", 0);
  }

  if (!response.ok) {
    throw new ApiError(
      `Request failed with status ${response.status}. Please try again.`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export function fetchUsers(): Promise<User[]> {
  return request<User[]>("/users");
}

export function fetchUserById(id: string | number): Promise<User> {
  return request<User>(`/users/${id}`);
}
