import { UserRole } from "@context/user/domain/User";

export interface Quote {
  id?: Number;
  quote: string;
  writer: string;
  role: UserRole;
  user: Number;
}
