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
    let listDiv = document.getElementById("listDiv");

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
      // @ts-ignore
      for (let i = 0; i < listDiv.children.length; i++) {
        // @ts-ignore
        const checkName = (obj: { name: string; }) => obj.name === listDiv.children[i].id;
        if (!value.some(checkName)) {
          // @ts-ignore
          if (listDiv.querySelector(`#${listDiv.children[i].id}`) != null) {
            // @ts-ignore
            listDiv.children[i].remove();
          }
        }
      }
      value.forEach((element: any) => {
        // @ts-ignore
        if (listDiv.querySelector(`#${element.name}`) == null) {
          this.createNewList(element.name, false)
        }
      })
    })

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
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
    let listDiv = document.getElementById("listDiv");
    let x = document.createElement("div");
    if (listName != "") {
      if (listDiv != null) {
        x.id = listName;
        x.style.fontFamily='Square Peg, cursive'
        x.style.fontSize="30px"
        x.className = "rounded-3 list-group-item list-group-item-action";
        x.innerText = listName;
        x.style.cursor = "pointer";
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
              listDiv.append(x);
            }
          });
        } else {
          // @ts-ignore
          listDiv.append(x);
        }
      }
    } else {
      console.log("STOP");
    }
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
