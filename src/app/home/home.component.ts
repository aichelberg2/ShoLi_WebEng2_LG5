import { Component, OnInit } from '@angular/core';
import { FormControl, NgForm } from "@angular/forms";
import { Observable, retry, share, startWith, Subject, subscribeOn, switchMap, takeUntil, timer } from "rxjs";
import { ManageUserDataService } from "../services/manageUserData/manage-user-data.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { ManageListDataService } from "../services/manageListData/manage-list-data.service";
import { AuthService } from "../services/auth/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";

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
    //"username": this.manageUserData.getUsername_loggedIn()
    //"username": JSON.parse(sessionStorage.getItem('user') || ' ')
    'username': sessionStorage.getItem('user')
  }
  temporaryListIDToDelete: string | undefined;

  constructor(private snackBar: MatSnackBar, private manageUserData: ManageUserDataService, private router: Router, private manageListData: ManageListDataService, private authService: AuthService) {
  }

  ngOnInit(): void {
    let data = {
      'jwt': this.authService.loggedInUserValue.token
    }
    this.receivedListsObservable = timer(1, 1000).pipe(
      switchMap(() => this.manageListData.getLists(data)),
      retry(),
      share(),
      takeUntil(this.stopPolling)
    );

    this.receivedListsObservable.subscribe(value => {
      if (value.accessGranted == 1) {
        let responseLists = value.lists;
        this.listIDs.length = 0;
        this.lists.length = 0;
        for (let i = 0; i < responseLists.length; i++) {
          if (!this.listIDs.includes(responseLists[i].list_id)) {
            this.listIDs.push(responseLists[i].list_id)
            this.lists.push(responseLists[i])
          }
        }
      }
      else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
    })
  }

  closePopUpForListName() {
    this.isPopUpDisplayed = !this.isPopUpDisplayed;

    if (this.isPopUpDisplayed) {
      this.options.length = 0;
      this.manageUserData.getAllUsers().subscribe(value => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].username != this.userNameAsJSON.username) {
            this.options.push(value[i].username);
          }
        }
      });
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
    this.router.navigate(["home/list"], { queryParams: { name: list_name, id: list_id } });
  }

  pushLol(newList_name: any) {
    let names: any[] = [];
    this.selectedNames.forEach((element: any) => {
      names.push(element);
    })
    let data = {
      'jwt': this.authService.loggedInUserValue.token,
      'listname': newList_name,
      'isListShared': this.isPopUpDisplayed,
      'usernames': names,
    }
    console.log(data)
    this.manageListData.createList(data).subscribe(value => {
      if (value != 0) {
        this.snackBar.open('Created!', 'Close', {
          duration: 3000
        });
      } else {
        this.snackBar.open('Failed!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  async getPermissionToDelete(list_id: any) {
    this.temporaryListIDToDelete = list_id;
    let data = {
      'jwt': this.authService.loggedInUserValue.token,
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
          if (this.lists[i].list_id == list_id) {
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

