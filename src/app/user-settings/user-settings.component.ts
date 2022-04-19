import {Component, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  constructor(private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
    this.manageUserData.getThisUser(this.manageUserData.getUsername_loggedIn()).subscribe(value => {
      console.log(value);
    });
  }

  updateUser(signinForm: NgForm) {

  }
}
