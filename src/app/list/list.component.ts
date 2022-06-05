import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ManageProductDataService} from "../services/manageProductData/manage-product-data.service";
import {NgForm} from "@angular/forms";
import {retry, share, switchMap, takeUntil, timer} from "rxjs";
import {Location} from "@angular/common";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {ManageListDataService} from "../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private route: ActivatedRoute,
              private manageProductData: ManageProductDataService, private router: Router, private authService: AuthService,
              public manageListData: ManageListDataService) {
  }

  ngOnInit(): void {

    this.route.queryParams  //Query-Parameter der URL abgreifen, sodass die gerade ausgewähle Liste identifiziert werden kann
      .subscribe(params => {
          this.manageListData.listname = params['name'];  //parameter mit name als "key"
          this.manageListData.listid = params['id'];  //parameter mit id als "key"
        }
      );

    let data = {  //Objekt, welches ListenID und Token enthält
      'listID': this.manageListData.listid,
      'jwt': this.authService.loggedInUserValue.token
    }

    this.manageListData.receivedProductsOfListOberservable = timer(1, 3000).pipe(   //3-sekündiges Polling
      switchMap(() => this.manageProductData.getProductsOfList(data)),  //ProduktObservable wird mit den Produkten der Liste gefüllt...
      retry(),
      share(),
      takeUntil(this.manageListData.stopPolling)  //...bis stopPolling "beginnt"
    );

    this.manageListData.receivedProductsOfListOberservable.subscribe(value => {   //auf das ProduktOberservable zugreifen
      if (value.accessGranted == 1) {
        let products = value.products;
        this.manageListData.receivedProductIDOfList.length = 0
        this.manageListData.receivedProductsOfList.length = 0
        for (let i = 0; i < products.length; i++) { //über alle Produkte iterieren
          if (!this.manageListData.receivedProductIDOfList.includes(products[i].pr_id)) {   //wenn Produkt noch nicht im Array ist...
            this.manageListData.receivedProductIDOfList.push(products[i].pr_id) //...füge ProduktID zu Array hinzu(für leichteren Zugriff auf Produkte...
            this.manageListData.receivedProductsOfList.push(products[i])    //...füge Produkt zu Array hinzu
          }
        }
      } else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
    })
  }

  transmitProductCategorieByAddingProduct() {     //Methode, welche getriggert wird, wenn nach einer Produktcategorie gesucht wird
    if (this.manageListData.choosedProductCategorie)
      this.manageListData.isProductKategorieChoosed = true; //Flag welches gesetzt wird, sodass nächstes Kommunikationsfenster geöffnet werden kann
    let data = {  //Objekt, welches Produktkategorie enthält
      'productCategory': this.manageListData.choosedProductCategorie
    }
    this.manageProductData.getProductsOfCategoerie(data).subscribe(value => { //call, um alle Produkte einer bestimmten Produktkategorie zu bekommen
      value.forEach((element: any) => {     //über alle Produkte iterieren
        if (!this.manageListData.receivedProductIDOfList.includes(element.pr_id)) {   //wenn Produkt noch nicht in Array...
          this.manageListData.receivedProductsOfCategory.push(element)    //...füge Produkt dem Produkt-Array hinzu...
          this.manageListData.receivedProductsIDOfCategory.push(element.pr_id)    //füge ProduktID dem ProduktID-Array hinzu(um einfacher auf vorhandene Produkte einer Liste zuzugreifen)
        }
      })
    })
  }

  deleteProductFromList() {   //Methode, welche getriggert wird, wenn Produkt einer Liste gelöscht werden soll
    let data = {    //Objekt mit ListenID und dem Produkt was gelöscht werden soll
      'listID': this.manageListData.listid,
      'productID': this.manageListData.temporaryProductToDelete
    }

    this.manageProductData.removeProduct(data).subscribe(value => { //call, welcher das Produkt aus der Liste in der Datenbank löscht
      if (value == 1) {   //ist dies geglückt...
        for (let i = 0; i < this.manageListData.receivedProductsOfList.length; i++) {   //...lösche das Produkt aus dem Produkt-Array...
          if (this.manageListData.receivedProductsOfList[i].pr_id == this.manageListData.temporaryProductToDelete) {
            const index = this.manageListData.receivedProductsOfList.indexOf(this.manageListData.receivedProductsOfList[i], 0);
            if (index > -1) {
              this.manageListData.receivedProductsOfList.splice(index, 1);
            }
          }
        }
        const index1 = this.manageListData.receivedProductIDOfList.indexOf(this.manageListData.temporaryProductToDelete, 0); //...lösche das Produkt aus dem ProduktID-Array
        if (index1 > -1) {
          this.manageListData.receivedProductIDOfList.splice(index1, 1);
        }
      }
    })
  }

  //asynchron, da die Attribute die im Call gefüllt werden, direkt wieder zur Verfügung stehen müssen
  async addProductsToList() {  //Methode, welche getriggert wird, wenn Produkt einer Liste hinzugefügt werden werden soll
    let prIDs: any[] = [];
    for (let i = 0; i < this.manageListData.selectedProducts.length; i++) { //Ausgewählte Produkte welche der Liste hinzugefügt werden sollen zwischenspeichern
      prIDs.push(this.manageListData.selectedProducts[i].pr_id)
    }
    let data = {    //Objekt mit ListenID und der hinzugefügten ProduktID's
      'listID': this.manageListData.listid,
      'productIDs': prIDs
    }
    this.manageProductData.addProductToList(data).subscribe(value => {  //call, um das Produkt der Liste in der Datenbank hinzuzfügen
      if (value != 0) { //ist dies geglückt...
        for (let i = 0; i < this.manageListData.selectedProducts.length; i++) {
          this.manageListData.receivedProductIDOfList.push(this.manageListData.selectedProducts[i].pr_id);  //...ProduktID's dem ProduktID-Array hinzufügen (um einfacher auf Produkte zuzugreifen)...
          this.manageListData.receivedProductsOfList.push(this.manageListData.selectedProducts[i]); //...Produkte dem Produkt-Array hinzufügen
        }
        this.snackBar.open('Added!', 'Close', { //3-sekündiges geglücktes Feedback-Fenster
          duration: 3000
        });
      } else {  //3-sekündiges gescheitertes Feedback-Fenster
        this.snackBar.open('Failed!', 'Close', {
          duration: 3000
        });
      }

    })
    //nun werden alle Attribute die für die "User-Kommunikation" gebraucht wurden, zurückgesetzt, sodass diese wieder leer verwendet werden können
    this.manageListData.choosedProductCategorie = undefined;
    this.manageListData.isProductKategorieChoosed = false;
    this.manageListData.selectedProducts.length = 0;
    this.manageListData.receivedProductsOfCategory.length = 0;
    this.manageListData.receivedProductsIDOfCategory.length = 0;
  }

  ngOnDestroy() {
    this.manageListData.stopPolling.next("rs"); //wenn Komponente zerstört wird, wird Polling gestoppt
  }

  createProduct(newProductName: any, newProductPrice: any, shouldBeAddedToList: any) {  //Methode, welche getriggert wird, wenn Produkt neu erstellt werden soll
    let data = {  //Objekt mit allen vom User eingegebenen Daten
      'productName': newProductName,
      'productCategory': this.manageListData.selectedProductCategory,
      'productPrice': newProductPrice
    }
    this.manageProductData.createProduct(data).subscribe(value => { //call, um das Produkt der Datenbank hinzuzufügen, return Wert(value) ist eine ProduktID des erstellten Produkts
      if (value != 0) { //ist dies geglückt...
        this.snackBar.open('Created!', 'Close', { //...3-sekündiges geglücktes Feedback-Fenster
          duration: 3000
        });
        let temp: any[] = [];
        if (shouldBeAddedToList) {  //wählt der User im Kommunikationsfenster aus, dass das Produkt direkt der Liste hinzugefügt werden soll...
          temp.push(value); //zwischenspeichern der ProduktID
          let data = {  //Objekt, mit ListenID ud ProduktID
            'listID': this.manageListData.listid,
            'productIDs': temp
          }
          this.manageProductData.addProductToList(data).subscribe(value => {  //call, um Produkt der Liste in der Datenbank hinzuzufügen
            if (value != 0) { //ist dies geglückt...
              this.snackBar.open('Product created and added!', 'Close', { //...3-sekündiges geglücktes Feedback-Fenster
                duration: 3000
              });
            } else {    //...3-sekündiges gescheitertes Feedback-Fenster (Produkt hinzuzufügen)
              this.snackBar.open('Adding failed', 'Close', {
                duration: 3000
              });
            }
          });
        }
      } else {//...3-sekündiges gescheitertes Feedback-Fenster (Produkt erstellen)
        this.snackBar.open('Create failed!', 'Close', {
          duration: 3000
        });
      }
    })
    this.manageListData.createNextNewProduct = true;  //Flag, welches ein Kommunikationsfenster öffnet, um den User zu fragen, ob er noch ein Produkt erstellen will
  }

  clearCreateProductForm(listInfoForm: NgForm) {   //Methode, welche getriggert wird, wenn Kommunikationsfenster für Erstellen der Produkte zurückgesetzt werden soll
    listInfoForm.resetForm();
  }

  toggleTicked(pr_id: any, number: number) {   //Methode, welche getriggert wird, wenn User das Produkt als "eingekauft" oder "nicht eingekauft" markiert (Häkchen setzen)
    let data = {  //Objekt, welches Daten des Produkts der Liste enthält und ob Häkchen gesetzt oder nicht
      'listID': this.manageListData.listid,
      'productID': pr_id,
      'isTicked': number
    }
    this.manageProductData.updateIsTicked(data).subscribe();  //call, welcher das Produkt in der Datenbank als "eingekauft" oder "nicht eingekauft" markiert
  }

  editPriceField(price: any, id: any) {  //Methode, welche getriggert wird, wenn User den Preis des Produkts bearbeiten möchte
    this.manageListData.temporaryPriceToEdit = price; //Temporäres Speichern des bisherigen Preises
    this.manageListData.temporaryProductID = id;  //Temporäres Speichern der ProduktID
  }

  changeProductPrice(price: any) {  //Methode, welche getriggert wird, wenn User den Preis des Produkts bearbeitet hat
    if (price.includes(',')) {  //wenn Preis Komma enthält...
      price = price.replace(',', '.');    //...wechsel zu Punkt
    }
    let data = {    //Objekt, welches Daten des gerade editierten Produkts enthält
      'listID': this.manageListData.listid,
      'productID': this.manageListData.temporaryProductID,
      'price': price
    }
    this.manageProductData.updatePriceOfProduct(data).subscribe(value => {    //call, um neuen Preis in die Datenbank zu speichern
      if (value == 1) {   //ist dies geglückt...
        this.snackBar.open('Price updated!', 'Close', {   //...3-sekündiges geglücktes Feedback-Fenster
          duration: 3000
        });
      } else {
        this.snackBar.open('Update failed!', 'Close', { //...3-sekündiges gescheitertes Feedback-Fenster
          duration: 3000
        });
      }
    })
  }
}
