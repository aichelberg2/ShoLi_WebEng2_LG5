import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {Location} from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from '../services/auth/auth.service'
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private snackBar: MatSnackBar, public manageUserData: ManageUserDataService, private _location: Location,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    let data = {  //Objekt, welches Token enthält
      'jwt': this.authService.loggedInUserValue.token
    }
    this.manageUserData.getThisUser(data).subscribe(value => {    //call, um User-Daten zu bekommen
      //User-Daten zwischenspeichern
      this.manageUserData.firstname = value.firstname;
      this.manageUserData.lastname = value.lastname;
      this.manageUserData.mail = value.email;
    });
  }

  goForUpdateUser(updateForm: NgForm) {  //Methode, welche getriggert wird, wenn User seine Daten updaten möchte
    //wenn Inputfeld nicht leer und keine Leerzeichen enthält und es ausgefüllt wurde...
    if (updateForm.value.firstname != "" && updateForm.value.firstname && !updateForm.value.firstname.includes(" ")) {
      this.manageUserData.firstname = updateForm.value.firstname;
      this.updateUser();  //...wird geupdated
    } else {
      this.snackBar.open('Failed!', 'Close', {  //3-sekündiges gescheitertes Fenster
        duration: 3000
      });
    }
    //wenn Inputfeld nicht leer und keine Leerzeichen enthält und es ausgefüllt wurde...
    if (updateForm.value.lastname != "" && updateForm.value.lastname && !updateForm.value.lastname.includes(" ")) {
      this.manageUserData.lastname = updateForm.value.lastname;
      this.updateUser();  //...wird geupdated
    } else {
      this.snackBar.open('Failed!', 'Close', {  //3-sekündiges gescheitertes Fenster
        duration: 3000
      });
    }
    //wenn Inputfeld nicht leer und keine Leerzeichen enthält und es ausgefüllt wurde...
    if (updateForm.value.mail != "" && updateForm.value.mail && !updateForm.value.mail.includes(" ")) {
      this.manageUserData.mail = updateForm.value.mail;
      this.updateUser();  //...wird geupdated
    } else {
      this.snackBar.open('Failed!', 'Close', {  //3-sekündiges gescheitertes Fenster
        duration: 3000
      });
    }
  }

  updateUser() {    //Methode, welche getriggert wird, wenn Daten für Update richtig sind
    let data = {  //Objekt, welches Update-Daten enthält
      'jwt': this.authService.loggedInUserValue.token,
      'firstname': this.manageUserData.firstname,
      'lastname': this.manageUserData.lastname,
      'eMail': this.manageUserData.mail
    }

    this.manageUserData.updateThisUser(data).subscribe(value => {   //call, welcher Daten aktualisiert
      if (value == 1) {
        this.snackBar.open('Succesful!', 'Close', { //3-sekündiges erfolgreiches Fenster
          duration: 3000
        });
      } else {
        this.snackBar.open('Failed!', 'Close', {    //3-sekündiges gescheitertes Fenster
          duration: 3000
        });
      }
    });
  }

  clearUserUpdateForm(form: NgForm) {   //Methode, welche getriggert wird, wenn das Formular für Update des Users zurückgesetzt werden soll
    form.resetForm();
  }
}
