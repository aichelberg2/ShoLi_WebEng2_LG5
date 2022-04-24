import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageListDataService {

  urlCreateList: any = "";
  urlGetLists: any = "";

  constructor(private http: HttpClient) {
  }

  createList(data: any): Observable<any> {
    return this.http.post(this.urlCreateList, data);
  }

  getLists(name: any): Observable<any> {
    return this.http.post(this.urlGetLists, name);
  }
}
