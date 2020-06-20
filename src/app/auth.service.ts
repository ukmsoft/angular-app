import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { LoginForm } from './models/login-form';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient, private router: Router) { }

  signin(loginForm: LoginForm): Observable<any> {
    const loginUrl = 'assets/users.json';
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    };
    const body = JSON.stringify(loginForm);
    return this.httpClient.post(loginUrl, body, options).pipe(
      catchError(this.handleError)
    );
  }

  handleError(error: HttpErrorResponse) {
    console.log('Error', error);
    return throwError(error);
  }

  logout() {
    sessionStorage.removeItem('userSession');
    this.router.navigateByUrl('/login');
  }
}
