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
    let bearerToken = localStorage.getItem("loggedInUser");
    if (bearerToken != null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${bearerToken}`
        }
      });
    }

    return next.handle(request);
  }
}