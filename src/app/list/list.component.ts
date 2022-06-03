import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ManageProductDataService } from "../services/manageProductData/manage-product-data.service";
import { FormControl, NgForm } from "@angular/forms";
import { Observable, retry, share, Subject, switchMap, takeUntil, timer } from "rxjs";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";

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
  selectedProducts: any = [];
  selectedProductCategory: any = "";
  receivedProductsOfListOberservable: Observable<any> | undefined;
  private stopPolling = new Subject();
  createNextNewProduct: boolean = false;
  temporaryProductToDelete: any;
  isEditPriceField: boolean = false;

  constructor(private snackBar: MatSnackBar, private _location: Location, private route: ActivatedRoute, private manageProductData: ManageProductDataService, private router: Router, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.listname = params['name'];
        this.listid = params['id'];
      }
      );

    let data = {
      'listID': this.listid,
      'jwt': this.authService.loggedInUserValue.token
    }

    this.receivedProductsOfListOberservable = timer(1, 3000).pipe(
      switchMap(() => this.manageProductData.getProductsOfList(data)),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    this.receivedProductsOfListOberservable.subscribe(value => {
      if (value.accessGranted == 1) {
        let products = value.products;
        this.receivedProductIDOfList.length = 0
        this.receivedProductsOfList.length = 0
        for (let i = 0; i < products.length; i++) {
          if (!this.receivedProductIDOfList.includes(products[i].pr_id)) {
            this.receivedProductIDOfList.push(products[i].pr_id)
            this.receivedProductsOfList.push(products[i])
          }
        }
      }
      else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
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

  receivedProductsIDOfCategory: any = [];

  transmitProductCategorie() {
    if (this.choosedProductCategorie)
      this.isProductKategorieChoosed = true;
    let data = {
      'productCategory': this.choosedProductCategorie
    }
    this.manageProductData.getProductsOfCategoerie(data).subscribe(value => {
      value.forEach((element: any) => {
        if (!this.receivedProductIDOfList.includes(element.pr_id)) {
          this.receivedProductsOfCategory.push(element)
          this.receivedProductsIDOfCategory.push(element.pr_id)
        }
      })
    })
  }

  deleteProductFromList() {
    let data = {
      'listID': this.listid,
      'productID': this.temporaryProductToDelete
    }

    this.manageProductData.removeProduct(data).subscribe(value => {
      if (value == 1) {
        for (let i = 0; i < this.receivedProductsOfList.length; i++) {
          if (this.receivedProductsOfList[i].pr_id == this.temporaryProductToDelete) {
            const index = this.receivedProductsOfList.indexOf(this.receivedProductsOfList[i], 0);
            if (index > -1) {
              this.receivedProductsOfList.splice(index, 1);
            }
          }
        }
        const index1 = this.receivedProductIDOfList.indexOf(this.temporaryProductToDelete, 0);
        if (index1 > -1) {
          this.receivedProductIDOfList.splice(index1, 1);
        }
      }
    })
  }

  async addProductsToList() {
    let prIDs: any[] = [];
    console.log(this.selectedProducts)
    for (let i = 0; i < this.selectedProducts.length; i++) {
      prIDs.push(this.selectedProducts[i].pr_id)
    }
    let data = {
      'listID': this.listid,
      'productIDs': prIDs
    }
    console.log(data)
    this.manageProductData.addProductToList(data).subscribe(value => {
      if (value == 1) {
        for (let i = 0; i < this.selectedProducts.length; i++) {
          console.log(this.selectedProducts[i])
          this.receivedProductIDOfList.push(this.selectedProducts[i].pr_id);
          this.receivedProductsOfList.push(this.selectedProducts[i]);
        }
        this.snackBar.open('Added!', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Failed!', 'Close', {
          duration: 3000
        });
      }

    })
    this.choosedProductCategorie = undefined;
    this.isProductKategorieChoosed = false;
    this.selectedProducts.length = 0;
    this.receivedProductsOfCategory.length = 0;
    this.receivedProductsIDOfCategory.length = 0;
  }

  ngOnDestroy() {
    this.stopPolling.next("rs");
  }

  createProduct(newProductName: any, newProductPrice: any, shouldBeAddedToList: any) {
    let data = {
      'productName': newProductName,
      'productCategory': this.selectedProductCategory,
      'productPrice': newProductPrice
    }
    console.log(data)
    // await new Promise<void>(resolve => {
    this.manageProductData.createProduct(data).subscribe(value => {
      if (value != 0) {
        this.snackBar.open('Created!', 'Close', {
          duration: 3000
        });
        let temp: any[] = [];
        if (shouldBeAddedToList) {
          temp.push(value);
          let prod = {
            'listID': this.listid,
            'productIDs': temp
          }
          this.manageProductData.addProductToList(prod).subscribe(value => {
            if (value == 1) {
              this.snackBar.open('Product created and added!', 'Close', {
                duration: 3000
              });
            } else {
              this.snackBar.open('Adding failed', 'Close', {
                duration: 3000
              });
            }
          });
          // let product = {
          //   'pr_id': value,
          //   'name': newProductName,
          //   'price': newProductPrice,
          //   'ticked': 0
          // }
          // console.log(product)
          // this.selectedProducts.push(product);
          // console.log(this.selectedProducts);
          // this.addProductsToList();
        }
      } else {
        this.snackBar.open('Create failed!', 'Close', {
          duration: 3000
        });
      }
    })
    //   resolve();
    // })

    this.createNextNewProduct = true;
  }

  clearForm(listInfoForm: NgForm) {
    listInfoForm.resetForm();
  }

  toggleTicked(pr_id: any, number: number) {
    let data = {
      'listID': this.listid,
      'productID': pr_id,
      'isTicked': number
    }
    this.manageProductData.updateIsTicked(data).subscribe(value => {

    });
  }

  resetModal(productForm: NgForm) {
    productForm.resetForm();
  }

  editPriceField() {
    this.isEditPriceField = true;

  }

  transmitProductPrice() {
    this.isEditPriceField = false;
  }

  goBack() {
    this._location.back();
  }
}
