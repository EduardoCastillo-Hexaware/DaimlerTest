import { Injectable } from "@angular/core";
import { ResponseI} from "../models/response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import {UserI } from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = "http://localhost:5289/api/"
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
  getToken() {
    return localStorage.getItem('token');
  }
}
