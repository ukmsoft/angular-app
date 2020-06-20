import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginForm } from '../models/login-form';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(8)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }

  onLogin() {
    const loginForm = new LoginForm(this.loginForm.value.username, this.loginForm.value.password);
    console.log('loginForm', this.loginForm);
    this.authService.signin(loginForm)
      .subscribe(
        userData => {
          sessionStorage.setItem('userSession', JSON.stringify(userData));
          this.loginForm.reset();
          this.router.navigateByUrl('/home');
        },
        error => {
          //Hard-coded login
          sessionStorage.setItem('userSession', JSON.stringify({
            userId: 1,
            username: 'uttam'
          }));
          this.router.navigateByUrl('/home');
          console.error('Error:' + error);
        }
      );
  }
}
