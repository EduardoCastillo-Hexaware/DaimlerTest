import { Injectable } from "@angular/core";
import { ResponseI} from "../models/response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {UserI } from "../models/user";
import { RoleI } from "../models/role";
import { Constans } from "../constants/contants";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = 'http://localhost:'+ Constans.PORT +'/api/';
  constructor( private http: HttpClient) {}

  login(form:UserI):Observable<ResponseI> {
    let dir = this.url + "Authenticate/Login";
    return this.http.post<ResponseI>(dir, form);
  }

  getAllUsers():Observable<ResponseI> {
    let dir = this.url + "User/getUsers";
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.get<any>(dir, {headers});
  }

  getAllRoles():Observable<ResponseI> {
    let dir = this.url + "Role/getRoles";
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.get<any>(dir, {headers});
  }

  updateUser(user:UserI):Observable<ResponseI> {
    let dir = this.url + "User/edit";
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.put<any>(dir, user, {headers});
  }

  deleteUser(user:UserI):Observable<ResponseI> {
    let dir = this.url + "User/delete/" + user.id;
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.delete<any>(dir, {headers});
  }

  createUser(user:UserI):Observable<ResponseI> {
    let dir = this.url + "User/create";
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.post<any>(dir, user, {headers});
  }

  createRole(role:RoleI):Observable<ResponseI> {
    let dir = this.url + "Role/create";
    let headers = new HttpHeaders()
    headers = headers.append('content-type', 'application/json');
    headers = headers.append('Authorization', 'Bearer '+ this.getToken());
    return this.http.post<any>(dir, role, {headers});

  }

  getToken() {
    return localStorage.getItem('token');
  }
}
