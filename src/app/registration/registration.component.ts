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
  ) {}

  ngOnInit(): void {
  }

  goForRegister(form: NgForm) {
    if (form.value.login_username != '' && form.value.login_password != '' && form.value.register_firstname != '' && form.value.register_lastname != '' && form.value.register_email != '') {
      if (!form.value.login_username.includes(" ") && !form.value.login_password.includes(" ") && !form.value.register_firstname.includes(" ") && !form.value.register_lastname.includes(" ") && !form.value.register_email.includes(" ")) {
        if (form.value.register_password == form.value.verify_password) {

          let data = {
            'username': form.value.register_username,
            'firstname': form.value.register_firstname,
            'lastname': form.value.register_lastname,
            'eMail': form.value.register_email,
            'password': form.value.register_password,
          }

          this.manageUserData.checkUserDataInput_Register(data).subscribe(value => {
            if (value == 1) {
              this.router.navigate(['/login']);
            }
          });
        } else {
          alert("Passwörter stimmen nicht überein");
        }
      } else {
        alert("Leerzeichen sind nicht erlaubt");
      }
    } else {
      alert("Bitte alle Felder ausfüllen!");
    }
  }
}
