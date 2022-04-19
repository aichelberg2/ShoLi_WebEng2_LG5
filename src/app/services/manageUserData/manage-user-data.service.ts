import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ManageUserDataService {

  urlCheckUserDataInput_Login: any = "https://sholi.server-welt.com/php/user_functions/login.php";
  urlCheckUserDataInput_Register: any = "https://sholi.server-welt.com/php/user_functions/registration.php";
  urlGetUser: any = "https://sholi.server-welt.com/php/user_functions/getUsers.php";
  urlGetThisUSer: any = "https://sholi.server-welt.com/php/user_functions/getSessionData.php";

  constructor(private http: HttpClient) {
  }

  getThisUser(){
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
