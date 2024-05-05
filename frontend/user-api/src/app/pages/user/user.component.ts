import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UserI } from '../../models/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoleI } from '../../models/role';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: UserI[] = [];
  roles: RoleI[] = [];
  rolesValues: String[] = [];
  clonedUsers: { [s: string]: UserI } = {};
  constructor(private userService: ApiService, public oRouter:Router, private messageService: MessageService){}

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(data => {
      this.users = data.response;
    }, error => {
      if((error.message).includes('401 Unauthorized')){
        localStorage.removeItem('token');
      }
    });

    this.userService.getAllRoles().subscribe(data => {
      this.roles = data.response;
      this.loadRolesValues(this.roles);
    }, error => {
      if((error.message).includes('401 Unauthorized')){
        localStorage.removeItem('token');
      }
    });
    if(!localStorage.getItem('token')){
      this.oRouter.navigate(['login'])
    }
  }

  onRowEditInit(user: UserI){
    this.clonedUsers[user.id as string] = { ...user };
  }
  onRowEditSave(user: UserI){
    if (user.role !== null) {
      delete this.clonedUsers[user.id as string];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
  } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
  }
  }
  onRowEditCancel(user: UserI, index: number){
    this.users[index] = this.clonedUsers[user.id as string];
    delete this.clonedUsers[user.id as string];
  }

  loadRolesValues(roles:RoleI[]){
    roles.forEach(role => {
      this.rolesValues.push(role.rolev);
    });
  }
}
