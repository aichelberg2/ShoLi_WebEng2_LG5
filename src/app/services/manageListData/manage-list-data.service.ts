import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import { HttpClient } from "@angular/common/http";
import {FormControl} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ManageListDataService {

  private host: string = `${window.location.protocol}//${window.location.hostname}`;

  urlGetLists: any = `${this.host}/php/list_functions/getLists.php`;
  urlCreateList: any = `${this.host}/php/list_functions/createList.php`;
  urlGetIsCreator: any = `${this.host}/php/list_functions/isCreator.php`;
  urlDeleteList: any = `${this.host}/php/list_functions/deleteList.php`;

  listname: string | undefined;
  listid: any | undefined;
  productCategories: string[] = [
    "Fruits & Vegetables",
    "Freshness and cooling",
    "Deep freeze",
    "Food",
    "Sweet & Salty",
    "Coffee, Tea & Cocoa",
    "Beverages",
    "Wine, spirits & luxury food",
    "Drugstore & Cosmetics",
    "Baby & Child",
    "Kitchen & Household",
    "Home & Leisure",
    "Pet Supplies",
    "Technical"
  ];
  choosedProductCategorie: string | undefined;
  isProductKategorieChoosed: boolean = false;
  receivedProductsOfList: any[] = [];
  receivedProductIDOfList: any[] = [];
  receivedProductsOfCategory: any[] = [];
  myControl = new FormControl();
  selectedProducts: any = [];
  selectedProductCategory: any = "";
  receivedProductsOfListOberservable: Observable<any> | undefined;
  stopPolling = new Subject();
  createNextNewProduct: boolean = false;
  receivedProductsIDOfCategory: any = [];
  temporaryProductToDelete: any;
  temporaryPriceToEdit: any;
  temporaryProductID: any;

  constructor(private http: HttpClient) {
  }
  //Post-call um eine Liste zu erstellen
  createList(data: any): Observable<any> {
    return this.http.post(this.urlCreateList, data);
  }
  //Post-call um alle Listen zu holen
  getLists(data: any): Observable<any> {
    return this.http.post(this.urlGetLists, data);
  }
  //Post-call um Ersteller einer Liste zu bekommen
  getIsCreator(data: any): Observable<any> {
    return this.http.post(this.urlGetIsCreator, data);
  }
  //Post-call um Liste zu löschen
  deleteList(data: any): Observable<any> {
    return this.http.post(this.urlDeleteList, data);
  }
}
