export const enum UserRole {
  client = "client",
  admin = "admin",
}

export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: UserRole;
  state?: boolean;
  apiKey?: string;
  allQuotes?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
