import {Component, NgModule, OnInit} from '@angular/core';
import {ManageUserDataService} from '../services/manageUserData/manage-user-data.service';
import {User} from "../User";
import {NgForm} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ManageUserDataService]
})

export class RegistrationComponent implements OnInit {
  constructor(
    private manageUserData: ManageUserDataService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
  }

  goForRegister(form: NgForm) {
    let data = {
      'username': form.value.register_username,
      'firstname': form.value.register_firstname,
      'lastname': form.value.register_lastname,
      'eMail': form.value.register_email,
      'password': form.value.register_password,
    }

    if (form.value.register_password == form.value.verify_password) {
      this.manageUserData.checkUserDataInput_Register(data).subscribe(value => {
        if (value == 1) {
          this.router.navigate(['/login']);
        }
      });
    }
  }
}
