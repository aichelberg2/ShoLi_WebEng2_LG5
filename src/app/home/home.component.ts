import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
//import {PollingService} from "../services/polling/polling.service";
import {Observable, retry, share, startWith, Subject, subscribeOn, switchMap, takeUntil, timer} from "rxjs";
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
  lists: any[] = [];
  listIDs: any[] = [];
  havePErmissionToDeleteList: boolean = false;
  userNameAsJSON = {
    "username": this.manageUserData.getUsername_loggedIn()
  }
  temporaryListIDToDelete: string | undefined;

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
      for (let i = 0; i < value.length; i++) {
        if (!this.listIDs.includes(value[i].list_id)) {
          this.listIDs.push(value[i].list_id)
          this.lists.push(value[i])
        }
      }
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

  clicker(list_name: any, list_id: any) {
    this.router.navigate(["home/list"], {queryParams: {name: list_name, id: list_id}});
  }

  pushLol(newList_name: any) {
    let data = {
      'listname': newList_name,
      'isListShared': this.isPopUpDisplayed,
      'usernames': this.selectedNames,
      'creator': this.userNameAsJSON.username
    }
    this.manageListData.createList(data).subscribe(value => {
      let obj =
        {
          list_id: `${value}`,
          name: `${newList_name}`
        }
      this.listIDs.push(value)
    });
  }

  async getPermissionToDelete(list_id: any) {
    this.temporaryListIDToDelete = list_id;
    let data = {
      'creator': this.manageUserData.getUsername_loggedIn(),
      'listID': list_id
    }
    await new Promise<void>(resolve => {
      this.manageListData.getIsCreator(data).subscribe(async value => {
        if (value == 1) {
          this.havePErmissionToDeleteList = true;
        } else {
          this.havePErmissionToDeleteList = false;
        }
        resolve();
      })
    })
  }

  deleteListByCreator(list_id: any) {
    let data = {
      'listID': list_id
    }
    this.manageListData.deleteList(data).subscribe(value => {
      if (value == 1) {
        const index = this.listIDs.indexOf(list_id, 0);
        if (index > -1) {
          this.listIDs.splice(index, 1);
        }

        for (let i = 0; i < this.lists.length; i++) {
          if(this.lists[i].list_id==list_id){
            const index = this.lists.indexOf(this.lists[i], 0);
            if (index > -1) {
              this.lists.splice(index, 1);
            }
          }
        }
      }
    })
  }
}

