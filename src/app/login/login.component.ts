import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userData: any = {};
  user: any;

  constructor(private _authService: AuthService, private _router: Router) {}

  loginUser() {
    this._authService.loginUser(this.userData).subscribe(
      (e: any) => {
        if (e.token) {
          localStorage.setItem('token', e.token);
          this._router.navigate(['/todo']);
        }
      },
      (err: any) => {
        console.log(err);
      }
    );
  }
}
