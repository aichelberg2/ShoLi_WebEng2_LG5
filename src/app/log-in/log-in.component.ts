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

  goForLogIn(form: NgForm) {
    if (this.manageUserData.isUsernameValid && (form.value.login_username != '' && !form.value.login_username.includes(" ")) || !this.manageUserData.isUsernameValid && (form.value.login_username1 != '' && !form.value.login_username1.includes(" "))) {
      if (this.manageUserData.isPasswordValid && (form.value.login_password != '' && !form.value.login_password.includes(" ")) || !this.manageUserData.isPasswordValid && (form.value.login_password1 != '' && !form.value.login_password1.includes(" "))) {

        this.manageUserData.isUsernameValid = true;
        this.manageUserData.isPasswordValid = true;

        let user: string;
        let pwd: string;

        if (form.value.login_username == undefined)
          user = form.value.login_username1;
        else
          user = form.value.login_username;

        if (form.value.login_password == undefined)
          pwd = form.value.login_password1;
        else
          pwd = form.value.login_password;

        let data = {
          'username': user,
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
      } else {
        this.manageUserData.isPasswordValid = false;
      }
    } else {
      this.manageUserData.isUsernameValid = false;
    }
  }
}
