import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService, public manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
  }

  goForLogIn(form: NgForm) {    //Methode welche getriggert wird, wenn User sich einloggen will
    //hier werden Eingaben geprüft. Es gibt eine Fallunterscheidung, da es das normale Inputfeld und das rot eingekreiste Inputfeld gibt(falls schonmal gegen eine Richtlinie verstoßen wurde)
    //dies muss für sowohl den Usernamen als auch das Passwort passieren, gecheckt wird nach Leerzeichen und Leere
    if (this.manageUserData.isUsernameValid && (form.value.login_username != '' && !form.value.login_username.includes(" ")) || !this.manageUserData.isUsernameValid && (form.value.login_username1 != '' && !form.value.login_username1.includes(" "))) {
      if (this.manageUserData.isPasswordValid && (form.value.login_password != '' && !form.value.login_password.includes(" ")) || !this.manageUserData.isPasswordValid && (form.value.login_password1 != '' && !form.value.login_password1.includes(" "))) {

        //wenn Credentials vollst. eingegeben, werden die Inputfelder "normal"
        this.manageUserData.isUsernameValid = true;
        this.manageUserData.isPasswordValid = true;

        let username: string;
        let pwd: string;

        //zwischenspeichern von Username und Passwort, auch hier muss eine Fallunterscheidung getroffen werden, je nachdem ob in das "normale" oder in das rot umkreiste Inputfeld eingegeben wurde
        if (form.value.login_username == undefined)
          username = form.value.login_username1;
        else
          username = form.value.login_username;

        if (form.value.login_password == undefined)
          pwd = form.value.login_password1;
        else
          pwd = form.value.login_password;

        let data = {    //Objekt, welches Username und Passwort beinhaltet
          'username': username,
          'password': pwd
        }

        this.authService.loginUser(data.username, data.password)
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            });
        //ist eine Überprüfung gescheitert, wird das Inputfeld rot umkreist
      } else {
        this.manageUserData.isPasswordValid = false;
      }
    } else {
      this.manageUserData.isUsernameValid = false;
    }
  }
}
