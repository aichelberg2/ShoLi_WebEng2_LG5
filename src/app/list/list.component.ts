import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ManageProductDataService} from "../services/manageProductData/manage-product-data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listname: string | undefined;
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
  haha= [
    {
      productName: "Banane",
      productPrice: 2.49,
      isTicked: 0
    },
    {
      productName: "Gurke",
      productPrice: 0.99,
      isTicked: 1
    }
  ]

  constructor(private route: ActivatedRoute, private manageProductData: ManageProductDataService) {
  }

  ngOnInit(): void {

    const element=document.getElementById('productList');

    this.route.queryParams
      .subscribe(params => {
          this.listname = params['name'];
        }
      );

    // let data = {
    //   'listName': this.listname
    // }
    // this.manageProductData.getProductsOfList(data).subscribe(value => {
    //
    // })
    // for (let i = 0; i < this.haha.length; i++) {
    //
    // }
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
      'productCategorie': this.choosedProductCategorie
    }
    this.manageProductData.getProductsOfCategoerie(data).subscribe(value => {

    })
  }

  deleteProductFromList() {

  }
}
