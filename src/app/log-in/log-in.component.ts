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

  constructor(private auth: AuthService, private router: Router, private managaUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
  }

  goForLogIn(form: NgForm) {
    let data={
      'username':form.value.login_username,
      'pw':form.value.login_password
    }
    this.managaUserData.performPostEx(data).subscribe(value => {
      if(value==1){
        this.router.navigate(['/home'])
      }
    });
   }
    // goForLogIn(form: NgForm) {
  //   this.managaUserData.performGetEx().subscribe(value => {
  //     let user = new User(value.username, value.firstname, value.birthday, value.eMail, value.password)
  //
  //     if (user.getUserPassword() == form.value.login_password && user.getUserUsername() == form.value.login_username) {
  //       this.auth.setIsLoggedIn(true);
  //       this.router.navigate(['/home'])
  //     }
  //   });
  // }
}
