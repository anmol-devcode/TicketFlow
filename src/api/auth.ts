// email password -> API hit -> response

import type { LoginRequestBody, SignupRequestBody } from "../types/api.types";
import type { UserRecord } from "../types/user.types";
import { apiFetch } from "./client";

//login function

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

//signup function

export async function SignupRequest({
  name,
  email,
  password,
}: SignupRequestBody): Promise<UserRecord> {
  const existing = await apiFetch<UserRecord[]>(
    `/users?emails=${encodeURIComponent(email)}`
  );

  if (existing.length > 0) {
    throw new Error("An account withh this email already exits");
  }

  return apiFetch<UserRecord>("/users", {
    method: "POST",
    body: JSON.stringify({ name, email, password, role: "customer" }),
  });
}
