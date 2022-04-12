import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ManageUserDataService {

  urlCheckUserDataInput_Login: any = "https://sholi.server-welt.com/php/user_functions/first.php";
  //urlGetUser: any = "https://sholi.server-welt.com/php/user_functions/first.php";
  urlGetUser: any = "https://sholi.server-welt.com/php/user_functions/login.php";

  constructor(private http: HttpClient) {
  }

  getUser(): Observable<any>{
    return this.http.get(this.urlGetUser);
  }

  checkUserDataInput_Login(dataInput: any): Observable<any> {
    return this.http.post(this.urlCheckUserDataInput_Login, dataInput);
  }
}
