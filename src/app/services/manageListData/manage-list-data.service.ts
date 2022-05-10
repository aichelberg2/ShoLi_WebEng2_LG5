import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ManageListDataService {

  private host: string = `${window.location.protocol}//${window.location.hostname}`;

  urlGetLists: any = `${this.host}/php/list_functions/getLists.php`;
  urlCreateList: any = `${this.host}/php/list_functions/createList.php`;
  urlGetIsCreator: any = `${this.host}/php/list_functions/isCreator.php`;
  urlDeleteList: any = `${this.host}/php/list_functions/deleteList.php`;

  constructor(private http: HttpClient) {
  }

  createList(data: any): Observable<any> {
    return this.http.post(this.urlCreateList, data);
  }

  getLists(name: any): Observable<any> {
    return this.http.post(this.urlGetLists, name);
  }

  getIsCreator(data: any): Observable<any> {
    return this.http.post(this.urlGetIsCreator, data);
  }

  deleteList(data: any): Observable<any> {
    console.log(data)
    return this.http.post(this.urlDeleteList, data);
  }
}
