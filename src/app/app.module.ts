import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from './states/todo.reducer';
import { DatePipe } from '@angular/common';
import { CdatePipe } from './cdate.pipe';
import { actionReducer } from './states/actions.reducer';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    TodoCardComponent,
    LoginComponent,
    SignupComponent,
    CdatePipe,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterOutlet,
    FormsModule,
    DatePipe,
    StoreModule.forRoot({
      todos: todoReducer,
      actions: actionReducer,
    }),
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
