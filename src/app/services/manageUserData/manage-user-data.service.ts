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
  urlGetThisUser: any = "https://sholi.server-welt.com/php/user_functions/getUser.php";
  urlUpdateThisUser: any = "https://sholi.server-welt.com/php/user_functions/updateUser.php";

  // urlCheckUserDataInput_Login: any = "http://localhost/php/user_functions/login.php";
  // urlCheckUserDataInput_Register: any = "http://localhost/php/user_functions/registration.php";
  // urlGetUser: any = "http://localhost/php/user_functions/getUsers.php";
  // urlGetThisUSer: any = "http://localhost/php/user_functions/getSessionData.php";


  constructor(private http: HttpClient) {
  }

  updateThisUser(data: any) {
    return this.http.post(this.urlUpdateThisUser, data);
  }

  setUsername_loggedIn(name: any) {
    this.username_loggedIn = name;
  }

  getUsername_loggedIn() {
    return this.username_loggedIn
  }

  getThisUser(name: any): Observable<any> {
    return this.http.post(this.urlGetThisUser, name);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.urlGetUser);
  }

  checkUserDataInput_Login(dataInput: any): Observable<any> {
    console.log(dataInput)
    return this.http.post(this.urlCheckUserDataInput_Login, dataInput);
  }

  checkUserDataInput_Register(dataInput: any): Observable<any> {
    return this.http.post(this.urlCheckUserDataInput_Register, dataInput);
  }
}
