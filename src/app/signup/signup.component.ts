import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  userData: any = {};
  constructor(private _authService: AuthService, private _router: Router) {}

  signupUser() {
    if (!this.userData.email || !this.userData.password) {
      return;
    }
    this._authService.signupUser(this.userData).subscribe(
      (e) => {
        if (e.token) {
          localStorage.setItem('token', e.token);
          this._router.navigate(['/todo']);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
