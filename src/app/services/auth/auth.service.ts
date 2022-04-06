import {Injectable} from '@angular/core';
import {delay, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isloggedIn: boolean = false;

  constructor() {
  }

  setIsLoggedIn(logStatus: boolean) {
    this.isloggedIn = logStatus;
  }

  getIsLoggedIn() {
    return of(this.isloggedIn).pipe(delay(500));
    //return of(true).pipe(delay(500));
  }
}
