import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {retry, share, switchMap, takeUntil, timer} from "rxjs";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
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
    let data = {    //Objekt, welches Token enthält
      'jwt': this.authService.loggedInUserValue.token
    }
    this.manageHomeData.receivedListsObservable = timer(1, 1000).pipe(  //Polling, welches sekündlich getriggert wird
      switchMap(() => this.manageListData.getLists(data)),  //holt sich alle Listen und wird in Observable gespeichert
      retry(),
      share(),
      takeUntil(this.manageHomeData.stopPolling)  //wird solange getriggert, bis stopPolling "beginnt"
    );

    this.manageHomeData.receivedListsObservable.subscribe(value => {  //auf das Oberservable der Listen wird zugegriffen
      if (value.accessGranted == 1) {
        let responseLists = value.lists;
        this.manageHomeData.listIDs.length = 0;
        this.manageHomeData.lists.length = 0;
        for (let i = 0; i < responseLists.length; i++) {  //über alle Listen iterieren
          if (!this.manageHomeData.listIDs.includes(responseLists[i].list_id)) {  //wenn es diese Liste noch nicht gibt...
            this.manageHomeData.listIDs.push(responseLists[i].list_id)    //...füge diese in ein Array hinzu (Extra Array mit ListID's um besser auf schon hinzugefügte Listen zuzugreifen)
            this.manageHomeData.lists.push(responseLists[i])
          }
        }
      } else {
        this.authService.logoutUser();
        this.router.navigate(['login']);
      }
    })
  }

  goForSharingTheCreatedList() {    //Methode, welche getriggert wird wenn eine erstellte Liste geteilt werden soll
    this.manageHomeData.isListShared = !this.manageHomeData.isListShared; //toggle checkBox-Boolean

    if (this.manageHomeData.isListShared) { //wenn die Liste geteilt wird...
      this.manageHomeData.options.length = 0;
      this.manageUserData.getAllUsers().subscribe(value => {  //...werden alle User gefetcht...
        for (let i = 0; i < value.length; i++) {
          if (value[i].username != this.manageHomeData.userNameAsJSON.username) {
            this.manageHomeData.options.push(value[i].username);  //...und in ein Array gepusht
          }
        }
      });
    }
  }

  ngOnDestroy() {
    this.manageHomeData.stopPolling.next("rs"); //wenn Komponente zerstört wird, wird Polling gestoppt
  }

  clearCreatingForm(listInfoForm: NgForm) { //Methode, welche getriggert wird, wenn das Kommunikationsfenster der Listenerstellung zurückgesetzt werden soll
    listInfoForm.resetForm();    //Form reseten
    this.manageHomeData.isListShared = false;
    this.manageHomeData.selectedNames.length = 0;
  }

  redirectToList(list_name: any, list_id: any) {  //Methode, welche getriggert wird, wenn auf eine Liste geklickt wird - hier wird zu dieser Liste weitergeleitet
    this.router.navigate(["home/list"], {queryParams: {name: list_name, id: list_id}}); //hierbei werden Namen und ID der Liste als Query-Parameter in URL mitgegeben
  }

  createList(newList_name: any) { //Methode, welche getriggert wird, wenn Liste erstellt wird
    let names: any[] = [];
    this.manageHomeData.selectedNames.forEach((element: any) => {
      names.push(element);  //wenn die Liste geshared wurde, werden die User in names-Array gespeichert
    })
    let data = {  //Objekt mit Daten der erstellten Liste
      'jwt': this.authService.loggedInUserValue.token,
      'listname': newList_name,
      'isListShared': this.manageHomeData.isListShared,
      'usernames': names,
    }

    this.manageListData.createList(data).subscribe(value => {   //call, welcher Liste in der Datenbank erstellt
      if (value != 0) {   //wenn erstellt wurde...
        this.snackBar.open('Created!', 'Close', {   //...kommt ein 3-sekündiges erfolgreiches Feedback-Feld
          duration: 3000
        });
      } else {  //...kommt ein 3-sekündiges gescheitertes Feedback-Feld
        this.snackBar.open('Failed!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  //await und async sind hier für Asynchronität, wird benötigt da in der nächsten Methode die Flags benötigt werden
  async getPermissionToDelete(list_id: any) {   //Methode, welche getriggert wird, wenn Liste gelöscht werden soll (wenn ein User Ersteller ist hat er das Recht, die Liste zu löschen)
    this.manageHomeData.temporaryListIDToDelete = list_id;    //ListenID zwischenspeichern
    let data = {    //Objekt, welches Token und ListenID enthält
      'jwt': this.authService.loggedInUserValue.token,
      'listID': list_id
    }
    await new Promise<void>(resolve => {
      this.manageListData.getIsCreator(data).subscribe(async value => {   //mit diesem call wird gecheckt, ob User Ersteller ist
        if (value == 1) {
          this.manageHomeData.havePermissionToDeleteList = true;    //Rechte-Flag true setzen
        } else {
          this.manageHomeData.havePermissionToDeleteList = false; //Rechte-Flag false setzen
        }
        resolve();
      })
    })
  }

  deleteListByCreator(list_id: any) {     //Methode, welche getriggert wird, wenn bestätigt wurde, dass die Liste gelöscht werden soll
    let data = {    //Objekt, welches ListenID enthält
      'listID': list_id
    }
    this.manageListData.deleteList(data).subscribe(value => { //call, sodass Liste aus Datenbank gelöscht wird
      if (value == 1) {   //wenn aus DB gelöscht...
        const index = this.manageHomeData.listIDs.indexOf(list_id, 0);    //...ListenID der gerade gelöschten Liste aus ListenID-Array entfernen...
        if (index > -1) {
          this.manageHomeData.listIDs.splice(index, 1);
        }

        for (let i = 0; i < this.manageHomeData.lists.length; i++) {    //...Gerade gelöschte Liste aus Listen-Array entfernen
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

