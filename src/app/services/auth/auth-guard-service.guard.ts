import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    //return this.auth.getIsLoggedIn().pipe(map((isLoggedIn) => isLoggedIn || this.router.createUrlTree(['login'])));
    return this.auth.loginUser() || this.router.createUrlTree(['login']);
    // if(!this.auth.getIsLoggedIn()){
    //   return  this.router.createUrlTree(['login'])
    // }
    // else {
    //   this.router.createUrlTree(['home'])
    //   return this.auth.getIsLoggedIn()
    // }
  }
}
