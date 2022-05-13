import {Injectable} from '@angular/core';
import {delay, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

   //isloggedIn: boolean = false;


  constructor() {
  }

  setIsLoggedIn() {
    sessionStorage.setItem('loggedIn', 'true');
    //this.isloggedIn = JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
  }

  // setIsLoggedIn(logStatus: boolean) {
  //   this.isloggedIn = ;
  //   //sessionStorage.setItem('loggedIn','true');
  // }

  getIsLoggedIn() {
    return JSON.parse(sessionStorage.getItem('loggedIn') || 'false');
    //return of(this.isloggedIn).pipe(delay(500));
    //return JSON.parse(localStorage.getItem('loggedIn')||this.isloggedIn.toString());
    // return JSON.parse(localStorage.getItem('loggedIn')||'false')
  }
}
