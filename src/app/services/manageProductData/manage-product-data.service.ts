import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageProductDataService {

  constructor(private http: HttpClient) {
  }

  urlGetProductsOfCategorie: string = "";
  urlGetProductsOfList: string = ""

  getProductsOfCategoerie(categorie: any): Observable<any> {
    return this.http.post(this.urlGetProductsOfCategorie, categorie);
  }

  getProductsOfList(listName:any):Observable<any>{
    return this.http.post(this.urlGetProductsOfList, listName);
  }
}
