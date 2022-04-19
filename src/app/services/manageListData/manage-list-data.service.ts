import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageListDataService {

  urlCheckUserDataInput_Login: any = "";

  constructor(private http:HttpClient) {
  }

  createList(data: any): Observable<any> {
    console.log(data);
    return this.http.post(this.urlCheckUserDataInput_Login,data);
  }
}
