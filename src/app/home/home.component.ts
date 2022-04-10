import {Component, NgModule, OnInit} from '@angular/core';
import {FormControl, FormsModule, NgForm} from "@angular/forms";
//import {PollingService} from "../services/polling/polling.service";
import {startWith, interval, Subscription, switchMap, Observable, Observer} from "rxjs";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {map} from "rxjs/operators";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  myControl = new FormControl();
  options: string[] = [];
  selectedNames: string[] = [];
  filteredOptions: Observable<string[]> | undefined;
  isPopUpDisplayed: boolean = true;


  constructor(private manageUserData: ManageUserDataService, private router: Router) {
  }

  ngOnInit(): void {

    this.manageUserData.getUser().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        this.options.push(value[i].username);
      }
    });

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  closePopUpForListName() {
    this.isPopUpDisplayed = !this.isPopUpDisplayed;
  }

  createNewList(form: NgForm) {
    let router1 = this.router;
    let listTable = document.getElementById("listTable");
    let x = document.createElement("tr");
    if (listTable != null) {
      for (let i = 1; i <= 20; i++) {
        // @ts-ignore
        if (document.getElementById(i.toString()).tagName == "PRE") {
          x.id = `${i}`;
          x.style.fontSize = "16.459px";
          x.innerText = form.value.newList_name;
          x.onclick = function () {
            router1.navigate(["/home/list"], {queryParams: {name: form.value.newList_name}});
          };
          // @ts-ignore
          document.getElementById(i.toString()).replaceWith(x);
          break;
        }
      }
    }
    //wenn geaddet wurde form wieder leer machen und flags setzen
  }

  addValue(option: string) {
    let element = document.getElementById("addedUsersTextArea");
    if (element != null) {
      if (this.selectedNames.length == 0) {
        this.selectedNames.push(option);
        element.append(option);
      } else {
        for (let i = 0; i < this.selectedNames.length; i++) {
          if (!(this.selectedNames.includes(option))) {
            this.selectedNames.push(option);
            element.append(", " + option);
          }
        }
      }
    }
  }
}
