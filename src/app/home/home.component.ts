import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
//import {PollingService} from "../services/polling/polling.service";
import {Observable, startWith} from "rxjs";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {ManageListDataService} from "../services/manageListData/manage-list-data.service";
import {AuthService} from "../services/auth/auth.service";

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
  isPopUpDisplayed: boolean = false;
  thisUser: string | undefined;


  constructor(private manageUserData: ManageUserDataService, private router: Router, private manageListData: ManageListDataService, private authService: AuthService) {
  }

  ngOnInit(): void {

    this.manageUserData.getAllUsers().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (value[i].username != this.manageUserData.getUsername_loggedIn()){
          this.options.push(value[i].username);
        }
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
    let router = this.router;
    let listTable = document.getElementById("listTable");
    let x = document.createElement("tr");
    if (!form.value.newList_name.includes(" ") && form.value.newList_name != "") {
      if (listTable != null) {
        for (let i = 1; i <= 20; i++) {
          // @ts-ignore
          if (document.getElementById(i.toString()).tagName == "PRE") {
            x.id = `${i}`;
            x.style.fontSize = "16.459px";
            x.innerText = form.value.newList_name;
            x.onclick = function () {
              router.navigate(["home/list"], {queryParams: {name: x.innerText}});
            };

            let data = {
              'listName': form.value.newList_name,
              'isListShared': this.isPopUpDisplayed,
              'usernames': this.selectedNames
            }
            this.manageListData.createList(data).subscribe(value => {
              if (value == 1) {

                // @ts-ignore
                document.getElementById(i.toString()).replaceWith(x);
              }
            });
            break;
          }
        }
      }
    } else {
      console.log("STOP");
    }
    form.resetForm();
    this.isPopUpDisplayed = false;
    this.selectedNames.length = 0;
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
