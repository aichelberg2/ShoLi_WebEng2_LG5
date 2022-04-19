import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ManageUserDataService {

  private username_loggedIn: string | undefined;

  urlCheckUserDataInput_Login: any = "https://sholi.server-welt.com/php/user_functions/login.php";
  urlCheckUserDataInput_Register: any = "https://sholi.server-welt.com/php/user_functions/registration.php";
  urlGetUser: any = "https://sholi.server-welt.com/php/user_functions/getUsers.php";
  urlGetThisUSer: any = "https://sholi.server-welt.com/php/user_functions/getSessionData.php";

  // urlCheckUserDataInput_Login: any = "http://localhost/php/user_functions/login.php";
  // urlCheckUserDataInput_Register: any = "http://localhost/php/user_functions/registration.php";
  // urlGetUser: any = "http://localhost/php/user_functions/getUsers.php";
  // urlGetThisUSer: any = "http://localhost/php/user_functions/getSessionData.php";


  constructor(private http: HttpClient) {
  }

  setUsername_loggedIn(name: any) {
    this.username_loggedIn = name;
  }

  getUsername_loggedIn() {
    return this.username_loggedIn
  }

  getThisUser(): Observable<any> {
    return this.http.get(this.urlGetThisUSer);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.urlGetUser);
  }

  checkUserDataInput_Login(dataInput: any): Observable<any> {
    return this.http.post(this.urlCheckUserDataInput_Login, dataInput);
  }

  checkUserDataInput_Register(dataInput: any): Observable<any> {
    return this.http.post(this.urlCheckUserDataInput_Register, dataInput);
  }
}
