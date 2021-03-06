import { Injectable } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManageHomeDataService {

  myControl = new FormControl();
  options: string[] = [];
  selectedNames: string[] = [];
  receivedListsObservable: Observable<any> | undefined;
  filteredOptions: Observable<string[]> | undefined;
  isListShared: boolean = false;
  stopPolling = new Subject();
  lists: any[] = [];
  listIDs: any[] = [];
  havePermissionToDeleteList: boolean = false;
  userNameAsJSON = {
    'username': sessionStorage.getItem('user')
  }
  temporaryListIDToDelete: string | undefined;

  constructor() { }
}
