import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { ManageProductDataService } from "../services/manageProductData/manage-product-data.service";
import { FormControl, NgForm } from "@angular/forms";
import { Observable, retry, share, Subject, switchMap, takeUntil, timer } from "rxjs";
import { Location } from "@angular/common";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import {ManageListDataService} from "../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private _location: Location, private route: ActivatedRoute,
              private manageProductData: ManageProductDataService, private router: Router, private authService: AuthService,
              public manageListData:ManageListDataService) {
  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.manageListData.listname = params['name'];
        this.manageListData.listid = params['id'];
      }
      );

    let data = {
      'listID': this.manageListData.listid,
      'jwt': this.authService.loggedInUserValue.token
    }

    this.manageListData.receivedProductsOfListOberservable = timer(1, 3000).pipe(
      switchMap(() => this.manageProductData.getProductsOfList(data)),
      retry(),
      share(),
      takeUntil(this.manageListData.stopPolling)
    );

    this.manageListData.receivedProductsOfListOberservable.subscribe(value => {
      if (value.accessGranted == 1) {
        let products = value.products;
        this.manageListData.receivedProductIDOfList.length = 0
        this.manageListData.receivedProductsOfList.length = 0
        for (let i = 0; i < products.length; i++) {
          if (!this.manageListData.receivedProductIDOfList.includes(products[i].pr_id)) {
            this.manageListData.receivedProductIDOfList.push(products[i].pr_id)
            this.manageListData.receivedProductsOfList.push(products[i])
          }
        }
      }
      else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
    })
  }

  transmitProductCategorie() {
    if (this.manageListData.choosedProductCategorie)
      this.manageListData.isProductKategorieChoosed = true;
    let data = {
      'productCategory': this.manageListData.choosedProductCategorie
    }
    this.manageProductData.getProductsOfCategoerie(data).subscribe(value => {
      value.forEach((element: any) => {
        if (!this.manageListData.receivedProductIDOfList.includes(element.pr_id)) {
          this.manageListData.receivedProductsOfCategory.push(element)
          this.manageListData.receivedProductsIDOfCategory.push(element.pr_id)
        }
      })
    })
  }

  deleteProductFromList() {
    let data = {
      'listID': this.manageListData.listid,
      'productID': this.manageListData.temporaryProductToDelete
    }

    this.manageProductData.removeProduct(data).subscribe(value => {
      if (value == 1) {
        for (let i = 0; i < this.manageListData.receivedProductsOfList.length; i++) {
          if (this.manageListData.receivedProductsOfList[i].pr_id == this.manageListData.temporaryProductToDelete) {
            const index = this.manageListData.receivedProductsOfList.indexOf(this.manageListData.receivedProductsOfList[i], 0);
            if (index > -1) {
              this.manageListData.receivedProductsOfList.splice(index, 1);
            }
          }
        }
        const index1 = this.manageListData.receivedProductIDOfList.indexOf(this.manageListData.temporaryProductToDelete, 0);
        if (index1 > -1) {
          this.manageListData.receivedProductIDOfList.splice(index1, 1);
        }
      }
    })
  }

  async addProductsToList() {
    let prIDs: any[] = [];
    console.log(this.manageListData.selectedProducts)
    for (let i = 0; i < this.manageListData.selectedProducts.length; i++) {
      prIDs.push(this.manageListData.selectedProducts[i].pr_id)
    }
    let data = {
      'listID': this.manageListData.listid,
      'productIDs': prIDs
    }
    console.log(data)
    this.manageProductData.addProductToList(data).subscribe(value => {
      if (value != 0) {
        for (let i = 0; i < this.manageListData.selectedProducts.length; i++) {
          console.log(this.manageListData.selectedProducts[i])
          this.manageListData.receivedProductIDOfList.push(this.manageListData.selectedProducts[i].pr_id);
          this.manageListData.receivedProductsOfList.push(this.manageListData.selectedProducts[i]);
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
    this.manageListData.choosedProductCategorie = undefined;
    this.manageListData.isProductKategorieChoosed = false;
    this.manageListData.selectedProducts.length = 0;
    this.manageListData.receivedProductsOfCategory.length = 0;
    this.manageListData.receivedProductsIDOfCategory.length = 0;
  }

  ngOnDestroy() {
    this.manageListData.stopPolling.next("rs");
  }

  createProduct(newProductName: any, newProductPrice: any, shouldBeAddedToList: any) {
    let data = {
      'productName': newProductName,
      'productCategory': this.manageListData.selectedProductCategory,
      'productPrice': newProductPrice
    }
    console.log(data)
    this.manageProductData.createProduct(data).subscribe(value => {
      if (value != 0) {
        this.snackBar.open('Created!', 'Close', {
          duration: 3000
        });
        let temp: any[] = [];
        if (shouldBeAddedToList) {
          temp.push(value);
          let prod = {
            'listID': this.manageListData.listid,
            'productIDs': temp
          }
          this.manageProductData.addProductToList(prod).subscribe(value => {
            if (value != 0) {
              this.snackBar.open('Product created and added!', 'Close', {
                duration: 3000
              });
            } else {
              this.snackBar.open('Adding failed', 'Close', {
                duration: 3000
              });
            }
          });
        }
      } else {
        this.snackBar.open('Create failed!', 'Close', {
          duration: 3000
        });
      }
    })
    this.manageListData.createNextNewProduct = true;
  }

  clearForm(listInfoForm: NgForm) {
    listInfoForm.resetForm();
  }

  toggleTicked(pr_id: any, number: number) {
    let data = {
      'listID': this.manageListData.listid,
      'productID': pr_id,
      'isTicked': number
    }
    this.manageProductData.updateIsTicked(data).subscribe(value => {

    });
  }

  resetModal(productForm: NgForm) {
    productForm.resetForm();
  }

  editPriceField(price: any, id: any) {
    this.manageListData.temporaryPriceToEdit = price;
    this.manageListData.temporaryProductID = id;
  }

  goBack() {
    this._location.back();
  }

  changeProductPrice(price: any) {
    if (price.includes(',')) {
      price = price.replace(',', '.');
    }
    let data = {
      'listID': this.manageListData.listid,
      'productID': this.manageListData.temporaryProductID,
      'price': price
    }
    this.manageProductData.updatePriceOfProduct(data).subscribe(value => {
      if (value == 1) {
        this.snackBar.open('Price updated!', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Update failed!', 'Close', {
          duration: 3000
        });
      }
    })
  }
}
