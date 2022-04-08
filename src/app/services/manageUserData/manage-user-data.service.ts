import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ManageUserDataService {

  url: any = "https://sholi.server-welt.com/php/user_functions/first.php";

  constructor(private http: HttpClient) {
  }

  // performGetEx():Observable<any>{
  //   return this.http.get(this.url);
  // }

  performPostEx(x: any): Observable<any> {
    return this.http.post(this.url, x);
  }
}
