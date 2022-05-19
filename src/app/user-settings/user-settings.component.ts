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
  username: any;
  firstname: any;
  lastname: any;
  email: any;

  constructor(private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
    this.manageUserData.getThisUser(sessionStorage.getItem('user')).subscribe(value => {
      console.log(value)
      this.firstname=value.firstname;
      this.lastname=value.lastname;
      this.email=value.email;
    });
  }

  updateUser(updateForm: NgForm) {

    if (this.firstname != updateForm.value.firstname) {
      this.firstname = updateForm.value.firstname;
    }

    if (this.lastname != updateForm.value.lastname) {
      this.lastname = updateForm.value.lastname;
    }

    if (this.email != updateForm.value.email) {
      this.email = updateForm.value.email;
    }

    let data={
      'username': this.username,
      'firstname':this.firstname,
      'lastname':this.lastname,
      'eMail':this.email
    }

    this.manageUserData.updateThisUser(data).subscribe(value => {
      if (value == 1) {
        alert("Toll!");
      } else {
        alert("Blöd");
      }
    });
  }
}
