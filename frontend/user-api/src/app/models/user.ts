import { RoleI } from "./role";

export interface UserI{
  id?: any;
  userName?: any;
  password?: any;
  roleId?: number;
  role?: RoleI;
}
