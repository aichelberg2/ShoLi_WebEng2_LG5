import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService,private manageUserData:ManageUserDataService) {
  }

  ngOnInit(): void {
    this.manageUserData.setUsername_loggedIn(undefined);
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['login'])
  }
}
