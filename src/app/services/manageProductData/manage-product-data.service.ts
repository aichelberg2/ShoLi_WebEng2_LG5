import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageProductDataService {

  private host: string = `${window.location.protocol}//${window.location.hostname}`;

  constructor(private http: HttpClient) {
  }

  urlGetProductsOfCategorie: any = `${this.host}/php/product_functions/GetProductsOfCategory.php`;
  urlGetProductsOfList: any = `${this.host}/php/list_functions/getProductsOfList.php`;

  getProductsOfCategoerie(categorie: any): Observable<any> {
    return this.http.post(this.urlGetProductsOfCategorie, categorie);
  }

  getProductsOfList(listID:any):Observable<any>{
    return this.http.post(this.urlGetProductsOfList, listID);
  }
}
