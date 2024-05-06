import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { UserComponent } from './pages/user/user.component';
import { RoleComponent } from './pages/role/role.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './shared/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserComponent
  },{
    path: 'login',
    component: LoginComponent
  },{
    path:'**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents= [LoginComponent, UserComponent, RoleComponent, HeaderComponent]
