// email password -> API hit -> response

import type { LoginRequestBody } from "../types/api.types";
import type { UserRecord } from "../types/user.types";
import { apiFetch } from "./client";

export async function loginRequest({
  email,
  password,
}: LoginRequestBody): Promise<UserRecord> {
  const matches = await apiFetch<UserRecord[]>(
    `/users?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`,
  );

  if (matches.length === 0) {
    throw new Error("Invalid email or password");
  }

  return matches[0];
}
