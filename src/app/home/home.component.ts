import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
//import {PollingService} from "../services/polling/polling.service";
import {elementAt, Observable, retry, share, startWith, Subject, switchMap, takeUntil, timer} from "rxjs";
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
  receivedListsObservable: Observable<any> | undefined;
  filteredOptions: Observable<string[]> | undefined;
  isPopUpDisplayed: boolean = false;
  private stopPolling = new Subject();

  userNameAsJSON = {
    "username": this.manageUserData.getUsername_loggedIn()
  }

  constructor(private manageUserData: ManageUserDataService, private router: Router, private manageListData: ManageListDataService, private authService: AuthService) {
  }

  ngOnInit(): void {
    let listTable = document.getElementById("listTable");

    this.receivedListsObservable = timer(1, 1000).pipe(
      switchMap(() => this.manageListData.getLists(this.userNameAsJSON)),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    this.manageUserData.getAllUsers().subscribe(value => {
      for (let i = 0; i < value.length; i++) {
        if (value[i].username != this.userNameAsJSON.username) {
          this.options.push(value[i].username);
        }
      }
    });


    this.receivedListsObservable.subscribe(value => {
      value.forEach((element: any) => {
        // @ts-ignore
        if (listTable.querySelector(`.${element.name}`) == null) {
          this.createNewList(element.name, false)
        }
      })
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );


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

  createNewList(listName: any, isCreatedByPopUp: boolean) {
    let router = this.router;
    let listTable = document.getElementById("listTable");
    let x = document.createElement("tr");
    if (listName != "") {
      if (listTable != null) {
        for (let i = 1; i <= 20; i++) {
          // @ts-ignore
          if (document.getElementById(i.toString()).tagName == "PRE") {
            x.id = `${i}`;
            x.className = listName;
            x.style.fontSize = "16.459px";
            x.innerText = listName;
            x.onclick = function () {
              router.navigate(["home/list"], {queryParams: {name: x.innerText}});
            };
            if (isCreatedByPopUp) {
              let data = {
                'listname': listName,
                'isListShared': this.isPopUpDisplayed,
                'usernames': this.selectedNames,
                'creator': this.userNameAsJSON.username
              }
              this.manageListData.createList(data).subscribe(value => {
                if (value == 1) {
                  // @ts-ignore
                  document.getElementById(i.toString()).replaceWith(x);
                }
              });
            } else {
              // @ts-ignore
              document.getElementById(i.toString()).replaceWith(x);
            }
            break;
          }
        }
      }
    } else {
      console.log("STOP");
    }
  }

  // createNewListFromForm(listName: string) {
  //   let router = this.router;
  //   let listTable = document.getElementById("listTable");
  //   let x = document.createElement("tr");
  //   if (!listName.includes(" ") && listName != "") {
  //     if (listTable != null) {
  //       for (let i = 1; i <= 20; i++) {
  //         // @ts-ignore
  //         if (document.getElementById(i.toString()).tagName == "PRE") {
  //           x.id = `${i}`;
  //           x.style.fontSize = "16.459px";
  //           x.innerText = listName;
  //           x.onclick = function () {
  //             router.navigate(["home/list"], {queryParams: {name: x.innerText}});
  //           };
  //
  //
  //           break;
  //         }
  //       }
  //     }
  //   } else {
  //     console.log("STOP");
  //   }
  // }

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

  removeItem(option: string) {
    this.options.forEach((name, index) => {
      if (name == option)
        this.options.splice(index, 1);
    });
  }

  ngOnDestroy() {
    this.stopPolling.next("rs");
  }

  clearForm(listInfoForm: NgForm) {
    listInfoForm.resetForm();
    this.isPopUpDisplayed = false;
    this.selectedNames.length = 0;
  }
}
