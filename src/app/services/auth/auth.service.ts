import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private host: string = `${window.location.protocol}//${window.location.hostname}`;
  urlCheckUserDataInput_Login: any = `${this.host}/php/user_functions/login.php`;
  private loggedUserSubject: BehaviorSubject<any>;
  public loggedInUser: Observable<any>;

  constructor(private http: HttpClient, private router: Router) {
    let loggedInUserStorage = localStorage.getItem('loggedInUser');
    if (loggedInUserStorage != null) {
      this.loggedUserSubject = new BehaviorSubject(JSON.parse(loggedInUserStorage));
      this.loggedInUser = this.loggedUserSubject.asObservable();
    }
    else {
      this.loggedUserSubject = new BehaviorSubject(null);
      this.loggedInUser = new Observable();
    }
  }

  loginUser(username: string, password: string) {
    return this.http.post<any>(this.urlCheckUserDataInput_Login, { username, password })
      .pipe(map(response => {
        if (response != 0) {
          // console.log(response);
          localStorage.setItem('loggedInUser', JSON.stringify(response));
          this.loggedUserSubject.next(response);
          this.router.navigate(['home']);
          return response;
        }
        else {
          // user feedback wrong credentials

        }
      }));
  }

  logoutUser() {
    localStorage.removeItem('loggedInUser');
    this.loggedUserSubject.next(null);
  }
  public get loggedInUserValue() {
    return this.loggedUserSubject.value;
  }
}
