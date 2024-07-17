import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';
import { TodoComponent } from './todo/todo.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Todoist' },
  { path: 'login', component: LoginComponent, title: 'Todoist | Login' },
  { path: 'signup', component: SignupComponent, title: 'Todoist | Signup' },
  {
    path: 'todo',
    component: TodoComponent,
    canActivate: [authGuard],
    title: 'Todoist | Dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
