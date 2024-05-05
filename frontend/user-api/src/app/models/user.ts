import { RoleI } from "./role";

export interface LoginI{
  user?: any;
  password?: any;
}

export interface UserI{
  id?: any;
  userName?: any;
  password?: any;
  role?: RoleI;
}
