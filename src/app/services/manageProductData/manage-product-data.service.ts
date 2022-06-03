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
  urlAddProductsToList: any = `${this.host}/php/list_functions/addProductToList.php`;
  urlCreateProduct: any = `${this.host}/php/product_functions/createProduct.php`;
  urlRemoveProduct: any = `${this.host}/php/list_functions/removeProduct.php`;
  urlUpdateIsTicked: any = `${this.host}/php/list_functions/updateIsTickedOfProduct.php`;
  urlUpdatePrice: any = `${this.host}/php/list_functions/updatePriceOfProduct.php`;

  getProductsOfCategoerie(categorie: any): Observable<any> {
    return this.http.post(this.urlGetProductsOfCategorie, categorie);
  }

  getProductsOfList(listID:any):Observable<any>{
    return this.http.post(this.urlGetProductsOfList, listID);
  }

  addProductToList(data:any):Observable<any>{
    console.log(data)
    return this.http.post(this.urlAddProductsToList, data);
  }

  createProduct(data:any):Observable<any>{
    return this.http.post(this.urlCreateProduct, data);
  }

  removeProduct(data:any):Observable<any>{
    return this.http.post(this.urlRemoveProduct, data);
  }

  updateIsTicked(data:any):Observable<any>{
    console.log(data)
    return this.http.post(this.urlUpdateIsTicked, data);
  }

  updatePriceOfProduct(data:any):Observable<any>{
    return this.http.post(this.urlUpdatePrice, data);
  }
}
