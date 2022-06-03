import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { Router } from "@angular/router";
import { ManageUserDataService } from "../services/manageUserData/manage-user-data.service";


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router, private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
  }

  goForLogIn(form: NgForm) {
    if (form.value.login_username != '' || form.value.login_password != '') {
      if (!form.value.login_username.includes(" ") || !form.value.login_password.includes(" ")) {
        let data = {
          'username': form.value.login_username,
          'pw': form.value.login_password
        }
        this.authService.loginUser(data.username, data.pw)
          .subscribe(
            data => {
              console.log(data);
            },
            error => {
              console.log(error);
            });

        // this.manageUserData.checkUserDataInput_Login(data).subscribe(value => {
        //   if (value != 0) {
        //     this.authService.loginUser(data.username, data.pw);
        //     this.router.navigate(['home']);
        //   } else {
        //     console.log(`${window.location.protocol}//${window.location.hostname}`);
        //   }
        // });
      }
    }
  }
}
