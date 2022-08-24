export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  role?: string;
  state?: boolean;
  dailyQuotes?: string;
  allQuotes?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
