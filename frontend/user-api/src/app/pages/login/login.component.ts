import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../service/api.service';
import { Router } from '@angular/router';
import { UserI } from '../../models/user';
import { ResponseI } from '../../models/response';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  errorState:boolean = false;
  errorMsg:any = '';

  loginForm = new FormGroup({
    userName : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required)
  });

  constructor(private apiService: ApiService, public oRouter:Router) { }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.checkLocalStorage();
  }

  checkLocalStorage(): void {
    if(localStorage.getItem('token')){
      this.oRouter.navigate(['users'])
    }
  }

  onLogin(form:UserI) {
    this.apiService.login(form).subscribe((data: any) =>{
      let dataResponse : ResponseI = data;
      if(dataResponse.message == 'ok'){
        localStorage.setItem('token',dataResponse.response);
        this.oRouter.navigate(['users'])
      }else{
        this.errorState = true;
        this.errorMsg = dataResponse.message;
      }
    });
  }
}
