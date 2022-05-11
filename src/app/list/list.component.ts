import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ManageProductDataService} from "../services/manageProductData/manage-product-data.service";
import {FormControl} from "@angular/forms";
import {Observable, retry, share, Subject, switchMap, takeUntil, timer} from "rxjs";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

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
  selectedProducts: any;
  receivedProductsOfListOberservable: Observable<any> | undefined;
  private stopPolling = new Subject();

  constructor(private route: ActivatedRoute, private manageProductData: ManageProductDataService) {
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
          this.listname = params['name'];
          this.listid = params['id'];
        }
      );

    let listID = {
      'listID': this.listid
    }

    this.receivedProductsOfListOberservable = timer(1, 3000).pipe(
      switchMap(() => this.manageProductData.getProductsOfList(listID)),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    this.receivedProductsOfListOberservable.subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (!this.receivedProductIDOfList.includes(value[i].pr_id)) {
          this.receivedProductIDOfList.push(value[i].pr_id)
          this.receivedProductsOfList.push(value[i])
        }
      }
    })
  }

  choosedCategorie(option: string) {
    this.choosedProductCategorie = option;
    const gridList = document.getElementsByClassName('mat-grid-tile options rounded') as HTMLCollectionOf<HTMLElement>;
    const element = document.getElementById(option);
    for (let i = 0; i < gridList.length; i++) {
      gridList[i].style.backgroundColor = '#6c757d';
    }
    if (element != null)
      element.style.backgroundColor = '#007bff';
  }


  transmitProductCategorie() {
    this.isProductKategorieChoosed = true;
    let data = {
      'productCategory': this.choosedProductCategorie
    }
    this.manageProductData.getProductsOfCategoerie(data).subscribe(value => {
      value.forEach((element: any) => {
        if (!this.receivedProductIDOfList.includes(element.pr_id)) {
          this.receivedProductsOfCategory.push(element)
        }
      })
    })
  }

  deleteProductFromList() {

  }

  selectOption(value: any) {
    console.log(value);
  }

  addProductsToList() {
    for (let i = 0; i < this.selectedProducts.length; i++) {
      this.receivedProductIDOfList.push(this.selectedProducts[i].pr_id);
      this.receivedProductsOfList.push(this.selectedProducts[i]);
    }
    console.log(this.selectedProducts)
    console.log(this.receivedProductsOfList)
    console.log(this.receivedProductsOfList)
  }

  ngOnDestroy() {
    this.stopPolling.next("rs");
  }
}
