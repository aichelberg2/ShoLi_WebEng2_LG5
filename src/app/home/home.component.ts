import {Component, NgModule, OnInit} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
//import {PollingService} from "../services/polling/polling.service";
import {startWith, interval, Subscription, switchMap, Observable, Observer} from "rxjs";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  testnames: string[] = [
    "Hans",
    "Peter",
    "Sascha",
    "Lucas",
    "Sabi",
    "Myriam"
  ];
  isPopUpDisplayed: boolean = true;
 // currencyInfo$: Observable<string[]>;

  // constructor(private pollingService: PollingService) {
    //this.currencyInfo$ = pollingService.getAllCurrencies();
  // }

  constructor() {
    //this.currencyInfo$ = pollingService.getAllCurrencies();
  }

  ngOnInit(): void {
    let listTable = document.getElementById("listTable");
    for (let i = 1; i <= 20; i++) {
      let x = document.createElement("pre");
      if (listTable != null) {
        x.style.marginTop = "25px";
        x.id = `${i}`;
        x.className = "preTags"
        listTable.appendChild(x);
      }
    }
  }

  closePopUpForListName() {
    this.isPopUpDisplayed = !this.isPopUpDisplayed;
  }

  createNewList(form: NgForm) {
    let listTable = document.getElementById("listTable");
    let x = document.createElement("tr");
    if (listTable != null) {
      for (let i = 1; i <= 20; i++) {
        // @ts-ignore
        if (document.getElementById(i.toString()).tagName == "PRE") {
          x.id = `${i}`;
          x.style.fontSize = "16.459px";
          x.innerText = form.value.newList_name;
          // @ts-ignore
          document.getElementById(i.toString()).replaceWith(x);
          break;
        }
      }
    }
    //wenn geaddet wurde form wieder leer machen und flags setzen
  }

  keyUp(event: KeyboardEvent) {
    // $("#sharedUSers1").autocomplete({
    //   source: testnames
    // });
  }
}
