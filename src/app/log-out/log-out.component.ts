import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { ManageUserDataService } from "../services/manageUserData/manage-user-data.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService, private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
    this.authService.logoutUser();
    this.router.navigate(['login'])
  }
}
