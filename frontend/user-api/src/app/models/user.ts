import { RoleI } from "./role";

export interface UserI{
  userName: string;
  password: string;
  role?: RoleI;
}
