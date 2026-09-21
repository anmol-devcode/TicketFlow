export type UserRole = "customer" | "agent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface UserRecord extends User {
  password: string;
}
