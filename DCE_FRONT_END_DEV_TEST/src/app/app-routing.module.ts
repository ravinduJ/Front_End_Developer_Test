import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListUsersComponentComponent } from './list-users-component/list-users-component.component';
import { LoginComponentComponent } from './login-component/login-component.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponentComponent
  },
 
  {
    path: "view-users",
    component: ListUsersComponentComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
