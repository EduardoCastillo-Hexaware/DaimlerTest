import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../service/api.service';
import { UserI } from '../../models/user';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RoleI } from '../../models/role';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {

  users: UserI[] = [];
  roles: RoleI[] = [];
  visibleInputModule: boolean = false;
  rolesValues: String[] = [];
  clonedUsers: { [s: string]: UserI } = {};

  createUserForm = new FormGroup({
    userName : new FormControl('',Validators.required),
    password : new FormControl('',Validators.required),
    role : new FormControl('',Validators.required)
  });

  constructor(private userService: ApiService, public oRouter: Router, private messageService: MessageService) { }

  ngOnInit(): void {

    this.userService.getAllUsers().subscribe(data => {
      this.users = data.response;
    }, error => {
      if ((error.message).includes('401 Unauthorized')) {
        localStorage.removeItem('token');
      }
    });

    this.userService.getAllRoles().subscribe(data => {
      this.roles = data.response;
      this.loadRolesValues(this.roles);
    }, error => {
      if ((error.message).includes('401 Unauthorized')) {
        localStorage.removeItem('token');
      }
    });

    if (!localStorage.getItem('token')) {
      this.oRouter.navigate(['login'])
    }
  }

  onRowEditInit(user: UserI) {
    this.clonedUsers[user.id as string] = { ...user };
  }
  onRowEditSave(user: UserI) {
    if (user.role !== null) {
      delete this.clonedUsers[user.id as string];
      user.roleId = this.getRoleId(user.role?.rolev);
      this.userService.updateUser(user).subscribe(data => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User is updated' });
      }, error => {
        if ((error.message).includes('401 Unauthorized')) {
          localStorage.removeItem('token');
        }
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
  }
  onRowEditCancel(user: UserI, index: number) {
    this.users[index] = this.clonedUsers[user.id as string];
    delete this.clonedUsers[user.id as string];
  }

  loadRolesValues(roles: RoleI[]) {
    this.rolesValues = [];
    roles.forEach(role => {
      this.rolesValues.push(role.rolev);
    });
  }

  onRowDelete(user: UserI){
    this.userService.deleteUser(user).subscribe(data => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: data.message });
      this.ngOnInit();
    }, error => {
      if ((error.message).includes('401 Unauthorized')) {
        localStorage.removeItem('token');
      }else{
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error });
      }
    });
  }

  getRoleId(role: string | undefined): number {
    let roleId = 0;

    this.roles.forEach(r => {
      if (r.rolev === role) {
        roleId = r.id;
      }
    });

    return roleId;
  }
  showDialog(){
    this.visibleInputModule = true;
  }

  onUserCreate(form:any){
    this.visibleInputModule = false;
    const user: UserI = {};
    user.userName = form.userName;
    user.password = form.password;
    user.roleId = this.getRoleId(form.role);

    this.userService.createUser(user).subscribe(data => {
      this.messageService.add({ severity:'success', summary: 'Success', detail: data.message });
      this.ngOnInit();
    }, error => {
      if ((error.message).includes('401 Unauthorized')) {
        localStorage.removeItem('token');
      }else{
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: error.error });
      }
    });
  }

}
