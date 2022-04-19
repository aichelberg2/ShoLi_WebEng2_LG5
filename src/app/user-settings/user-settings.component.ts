import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent implements OnInit {

  myControl = new FormControl();
  data: any;

  constructor(private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
    this.manageUserData.getThisUser(this.manageUserData.getUsername_loggedIn()).subscribe(value => {
      this.data = {
        'username': value.username,
        'firstname': value.firstname,
        'lastname': value.lastname,
        'email': value.email
      }
    });
  }

  updateUser(updateForm: NgForm) {

    if (this.data.firstname != updateForm.value.firstname) {
      this.data.firstname = updateForm.value.firstname;
    }

    if (this.data.lastname != updateForm.value.lastname) {
      this.data.lastname = updateForm.value.lastname;
    }

    if (this.data.email != updateForm.value.email) {
      this.data.email = updateForm.value.email;
    }

    this.manageUserData.updateThisUser(this.data).subscribe(value => {
      if (value == 1) {
        alert("Toll!");
      } else {
        alert("Blöd");
      }
    });
  }
}
