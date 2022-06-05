import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

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

  //Post-call um Produkte einer bestimmten Kategorie zu bekommen
  getProductsOfCategoerie(categorie: any): Observable<any> {
    return this.http.post(this.urlGetProductsOfCategorie, categorie);
  }
  //Post-call um Produkte einer bestimmten Liste zu bekommen
  getProductsOfList(data: any): Observable<any> {
    return this.http.post(this.urlGetProductsOfList, data);
  }
  //Post-call um Produkt einer Liste hinzuzufügen
  addProductToList(data: any): Observable<any> {
    return this.http.post(this.urlAddProductsToList, data);
  }
  //Post-call um Produkte zu erstellen
  createProduct(data: any): Observable<any> {
    return this.http.post(this.urlCreateProduct, data);
  }
  //Post-call um Produkt aus einer Liste zu entfernen
  removeProduct(data: any): Observable<any> {
    return this.http.post(this.urlRemoveProduct, data);
  }
  //Post-call um Produkt in einer Liste als "eingekauft" oder "nicht eingekauft" zu markieren
  updateIsTicked(data: any): Observable<any> {
    return this.http.post(this.urlUpdateIsTicked, data);
  }
  //Post-call um Preis eines Produkts in einer Liste zu ändern
  updatePriceOfProduct(data:any):Observable<any>{
    return this.http.post(this.urlUpdatePrice, data);
  }
}
