import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {User} from "../User";


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
        this.manageUserData.checkUserDataInput_Login(data).subscribe(value => {
          if (value == 1) {
            this.authService.setIsLoggedIn(true);
            this.manageUserData.setUsername_loggedIn(form.value.login_username);
            this.router.navigate(['home']);
          }
        });
      }
    }
  }
}
