import {Component, NgModule, OnInit} from '@angular/core';
import {ManageUserDataService} from '../services/manageUserData/manage-user-data.service';
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ManageUserDataService]
})

export class RegistrationComponent implements OnInit {
  constructor(public manageUserData: ManageUserDataService, private router: Router, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  goForRegister(form: NgForm) {
    //hier werden Eingaben geprüft. Es gibt eine Fallunterscheidung, da es das normale Inputfeld und das rot eingekreiste Inputfeld gibt(falls schonmal gegen eine Richtlinie verstoßen wurde)
    //dies muss für alle Eingaben passieren, gecheckt wird nach Leerzeichen und Leere
    if (this.manageUserData.isUsernameValid && (form.value.register_username != '' && !form.value.register_username.includes(" ")) || !this.manageUserData.isUsernameValid && (form.value.register_username1 != '' && !form.value.register_username1.includes(" "))) {
      if (this.manageUserData.isFirstnameValid && (form.value.register_firstname != '' && !form.value.register_firstname.includes(" ")) || !this.manageUserData.isFirstnameValid && (form.value.register_firstname1 != '' && !form.value.register_firstname1.includes(" "))) {
        if (this.manageUserData.isLastnameValid && (form.value.register_lastname != '' && !form.value.register_lastname.includes(" ")) || !this.manageUserData.isLastnameValid && (form.value.register_lastname1 != '' && !form.value.register_lastname1.includes(" "))) {
          if (this.manageUserData.isEmailValid && (form.value.register_email != '' && !form.value.register_email.includes(" ")) || !this.manageUserData.isEmailValid && (form.value.register_email1 != '' && !form.value.register_email1.includes(" "))) {
            if (this.manageUserData.isPasswordValid && (form.value.register_password != '' && !form.value.register_password.includes(" ")) || !this.manageUserData.isPasswordValid && (form.value.register_password1 != '' && !form.value.register_password1.includes(" "))) {
              if (this.manageUserData.isPasswordValidValid && (form.value.verify_password != '' && !form.value.verify_password.includes(" ")) || !this.manageUserData.isPasswordValidValid && (form.value.verify_password1 != '' && !form.value.verify_password1.includes(" "))) {
                //sind Passwörter gleich...
                if ((this.manageUserData.isPasswordValid && this.manageUserData.isPasswordValidValid) && (form.value.register_password == form.value.verify_password) || (!this.manageUserData.isPasswordValid && !this.manageUserData.isPasswordValidValid) && (form.value.register_password1 == form.value.verify_password1) ||
                  (!this.manageUserData.isPasswordValid && this.manageUserData.isPasswordValidValid) && (form.value.register_password1 == form.value.verify_password) || (this.manageUserData.isPasswordValid && !this.manageUserData.isPasswordValidValid) && (form.value.register_password == form.value.verify_password1)) {

                  //wenn Credentials vollst. eingegeben, werden die Inputfelder "normal"
                  this.manageUserData.isUsernameValid = true;
                  this.manageUserData.isFirstnameValid = true;
                  this.manageUserData.isFirstnameValid = true;
                  this.manageUserData.isEmailValid = true;
                  this.manageUserData.isPasswordValid = true;
                  this.manageUserData.isPasswordValidValid = true;

                  let username;
                  let firstname;
                  let lastname;
                  let email;
                  let pwd;
                  //zwischenspeichern von Credentials, auch hier muss eine Fallunterscheidung getroffen werden, je nachdem ob in das "normale" oder in das rot umkreiste Inputfeld eingegeben wurde
                  if (form.value.register_username == undefined)
                    username = form.value.register_username1;
                  else
                    username = form.value.register_username;

                  if (form.value.register_firstname == undefined)
                    firstname = form.value.register_firstname1;
                  else
                    firstname = form.value.register_firstname;

                  if (form.value.register_lastname == undefined)
                    lastname = form.value.register_lastname1;
                  else
                    lastname = form.value.register_lastname;

                  if (form.value.register_email == undefined)
                    email = form.value.register_email1;
                  else
                    email = form.value.register_email;

                  if (form.value.register_password == undefined)
                    pwd = form.value.register_password1;
                  else
                    pwd = form.value.register_password;

                  let data = {  //Objekt, welches Credentials beinhaltet
                    'username': username,
                    'firstname': firstname,
                    'lastname': lastname,
                    'eMail': email,
                    'password': pwd,
                  }

                  this.manageUserData.checkUserDataInput_Register(data).subscribe(value => {  //call, welcher checkt ob registriert werden darf und registriert den User
                    if (value == 1) {   //wenn geglückt...
                      this.router.navigate(['login']);   //...auf login verweisen...
                      this.snackBar.open('Successfully registered!', 'Close', { //...und 3-sekündiges geglücktes Feedback-Fenster
                        duration: 3000
                      });
                    } else {
                      this.snackBar.open('User is already there!', 'Close', { // 3-sekündiges gescheitertes Feedback-Fenster
                        duration: 3000
                      });
                    }
                  });
                } else {
                  this.snackBar.open('Passwords are not the same!', 'Close', {  // 3-sekündiges gescheitertes Feedback-Fenster
                    duration: 3000
                  });
                }
                //ansonsten werden Inputs rot umrandet
              } else {
                this.manageUserData.isPasswordValidValid = false;
              }
            } else {
              this.manageUserData.isPasswordValid = false;
            }
          } else {
            this.manageUserData.isEmailValid = false;
          }
        } else {
          this.manageUserData.isLastnameValid = false;
        }
      } else {
        this.manageUserData.isFirstnameValid = false;
      }
    } else {
      this.manageUserData.isUsernameValid = false;
    }
  }
}

