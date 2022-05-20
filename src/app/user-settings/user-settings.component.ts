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
  username: any=sessionStorage.getItem('user');
  firstname: any;
  lastname: any;
  mail: any;

  constructor(private manageUserData: ManageUserDataService) {
  }

  ngOnInit(): void {
    let data={
      'username':sessionStorage.getItem('user')
    }
    this.manageUserData.getThisUser(data).subscribe(value => {
       console.log(value)
      this.firstname=value.firstname;
      this.lastname=value.lastname;
      this.mail=value.email;
    });
  }

  updateUser(updateForm: NgForm) {

    if (updateForm.value.firstname!=""&&updateForm.value.firstname) {
       this.firstname = updateForm.value.firstname;
    }

    if (updateForm.value.lastname!=""&&updateForm.value.lastname) {
       this.lastname = updateForm.value.lastname;
    }

    if (updateForm.value.mail!=""&&updateForm.value.mail) {
      this.mail = updateForm.value.mail;
    }


    let data={
      'username': this.username,
      'firstname':this.firstname,
      'lastname':this.lastname,
      'eMail':this.mail
    }

    this.manageUserData.updateThisUser(data).subscribe();
  }
}
