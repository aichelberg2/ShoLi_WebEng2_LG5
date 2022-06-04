import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {Observable, retry, share, startWith, Subject, subscribeOn, switchMap, takeUntil, timer} from "rxjs";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {ManageListDataService} from "../services/manageListData/manage-list-data.service";
import {AuthService} from "../services/auth/auth.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ManageHomeDataService} from "../services/manageHomeData/manage-home-data.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, private manageUserData: ManageUserDataService, private router: Router,
              private manageListData: ManageListDataService, private authService: AuthService, public manageHomeData: ManageHomeDataService) {
  }

  ngOnInit(): void {
    let data = {
      'jwt': this.authService.loggedInUserValue.token
    }
    this.manageHomeData.receivedListsObservable = timer(1, 1000).pipe(
      switchMap(() => this.manageListData.getLists(data)),
      retry(),
      share(),
      takeUntil(this.manageHomeData.stopPolling)
    );

    this.manageHomeData.receivedListsObservable.subscribe(value => {
      if (value.accessGranted == 1) {
        let responseLists = value.lists;
        this.manageHomeData.listIDs.length = 0;
        this.manageHomeData.lists.length = 0;
        for (let i = 0; i < responseLists.length; i++) {
          if (!this.manageHomeData.listIDs.includes(responseLists[i].list_id)) {
            this.manageHomeData.listIDs.push(responseLists[i].list_id)
            this.manageHomeData.lists.push(responseLists[i])
          }
        }
      } else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
    })
  }

  closePopUpForListName() {
    this.manageHomeData.isPopUpDisplayed = !this.manageHomeData.isPopUpDisplayed;

    if (this.manageHomeData.isPopUpDisplayed) {
      this.manageHomeData.options.length = 0;
      this.manageUserData.getAllUsers().subscribe(value => {
        for (let i = 0; i < value.length; i++) {
          if (value[i].username != this.manageHomeData.userNameAsJSON.username) {
            this.manageHomeData.options.push(value[i].username);
          }
        }
      });
    }
  }

  removeItem(option: string) {
    this.manageHomeData.options.forEach((name, index) => {
      if (name == option)
        this.manageHomeData.options.splice(index, 1);
    });
  }

  ngOnDestroy() {
    this.manageHomeData.stopPolling.next("rs");
  }

  clearForm(listInfoForm: NgForm) {
    listInfoForm.resetForm();
    this.manageHomeData.isPopUpDisplayed = false;
    this.manageHomeData.selectedNames.length = 0;
  }

  clicker(list_name: any, list_id: any) {
    this.router.navigate(["home/list"], {queryParams: {name: list_name, id: list_id}});
  }

  pushLol(newList_name: any) {
    let names: any[] = [];
    this.manageHomeData.selectedNames.forEach((element: any) => {
      names.push(element);
    })
    let data = {
      'jwt': this.authService.loggedInUserValue.token,
      'listname': newList_name,
      'isListShared': this.manageHomeData.isPopUpDisplayed,
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
    this.manageHomeData.temporaryListIDToDelete = list_id;
    let data = {
      'jwt': this.authService.loggedInUserValue.token,
      'listID': list_id
    }
    await new Promise<void>(resolve => {
      this.manageListData.getIsCreator(data).subscribe(async value => {
        if (value == 1) {
          this.manageHomeData.havePErmissionToDeleteList = true;
        } else {
          this.manageHomeData.havePErmissionToDeleteList = false;
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
        const index = this.manageHomeData.listIDs.indexOf(list_id, 0);
        if (index > -1) {
          this.manageHomeData.listIDs.splice(index, 1);
        }

        for (let i = 0; i < this.manageHomeData.lists.length; i++) {
          if (this.manageHomeData.lists[i].list_id == list_id) {
            const index = this.manageHomeData.lists.indexOf(this.manageHomeData.lists[i], 0);
            if (index > -1) {
              this.manageHomeData.lists.splice(index, 1);
            }
          }
        }
      }
    })
  }
}

