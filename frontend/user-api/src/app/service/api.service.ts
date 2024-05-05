import { Injectable } from "@angular/core";
import { ResponseI} from "../models/response";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { LoginI, UserI } from "../models/user";

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
}
