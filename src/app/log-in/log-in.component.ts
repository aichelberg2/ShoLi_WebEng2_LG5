import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { ManageUserDataService } from "../services/manageUserData/manage-user-data.service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService, private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
  }

  goForLogIn(form: NgForm) {
    if (form.value.login_username != '' || form.value.login_password != '') {
      if (!form.value.login_username.includes(" ") || !form.value.login_password.includes(" ")) {
        let data = {
          'username': form.value.login_username,
          'password': form.value.login_password
        }
        this.authService.loginUser(data.username, data.password)
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            });
      }
    }
  }
}
