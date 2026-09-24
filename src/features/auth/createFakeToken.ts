import type { User } from "../../types/user.types";

// user . token -> stringfy
// NOT a real JWT -- a demo-shaped stand-in so later days (role checks,
// interceptors) have something realistic to work with. A real backend
// must issue and verify real signed tokens.

export function createFakeToken(user: User): string {
  const userObject = {
    id: user.id,
    role: user.role,
  };

  const payload = btoa(JSON.stringify(userObject));
  return `user.${payload}.token`;
}

