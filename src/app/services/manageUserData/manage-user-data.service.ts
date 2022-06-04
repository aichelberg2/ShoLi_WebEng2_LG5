import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {FormControl} from "@angular/forms";


@Injectable({
  providedIn: 'root'
})
export class ManageUserDataService {

  private host: string = `${window.location.protocol}//${window.location.hostname}`;

  urlCheckUserDataInput_Register: any = `${this.host}/php/user_functions/registration.php`;
  urlGetUser: any = `${this.host}/php/user_functions/getUsers.php`;
  urlGetThisUser: any = `${this.host}/php/user_functions/getUser.php`;
  urlUpdateThisUser: any = `${this.host}/php/user_functions/updateUser.php`;

  myControl = new FormControl();
  firstname: any;
  lastname: any;
  mail: any;

  isUsernameValid: boolean = true;
  isPasswordValid: boolean = true;
  isPasswordValidValid: boolean = true;
  isFirstnameValid: boolean = true;
  isLastnameValid: boolean = true;
  isEmailValid: boolean = true;

  constructor(private http: HttpClient) {
  }

  updateThisUser(data: any) {
    return this.http.post(this.urlUpdateThisUser, data);
  }

  getThisUser(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.urlGetThisUser, data);
  }

  getAllUsers(): Observable<any> {
    return this.http.get(this.urlGetUser);
  }

  checkUserDataInput_Register(dataInput: any): Observable<any> {
    console.log(dataInput);
    return this.http.post(this.urlCheckUserDataInput_Register, dataInput);
  }
}
