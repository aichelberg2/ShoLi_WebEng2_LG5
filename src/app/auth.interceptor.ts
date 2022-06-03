import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service'
import { Router } from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let loggedInUser = this.authService.loggedInUser;
    let loggedInUserStorage = localStorage.getItem("loggedInUser");
    if (loggedInUserStorage != null) {
      console.log(loggedInUserStorage);
    }
    else {
      this.router.navigate(['login']);
    }
    // userTokenStorage = localStorage.getItem();
    // if ()
    //   let token = JSON.parse(localStorage.getItem(user.token));
    // if (token) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${token}`
    //     }
    //   });
    // }

    return next.handle(request);
  }
}