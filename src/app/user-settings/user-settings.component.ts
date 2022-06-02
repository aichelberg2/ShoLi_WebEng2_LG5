import {Component, OnInit} from '@angular/core';
import {FormControl, NgForm} from "@angular/forms";
import {ManageUserDataService} from "../services/manageUserData/manage-user-data.service";
import {Location} from '@angular/common';
import {MatSnackBar} from "@angular/material/snack-bar";

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

  constructor(private snackBar: MatSnackBar, private manageUserData: ManageUserDataService,private _location: Location) {
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

    this.manageUserData.updateThisUser(data).subscribe(value=>{
      if(value==1){
        this.snackBar.open('Succesful!', 'Close', {
          duration: 3000
        });
      }else {
        this.snackBar.open('Failes!', 'Close', {
          duration: 3000
        });
      }
    });
  }

  goBack() {
    this._location.back();
  }
}
