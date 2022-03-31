import {Component, NgModule, OnInit} from '@angular/core';
import {ManageUserDataService} from '../services/manageUserData/manage-user-data.service';
import {User} from "../User";
import {NgForm} from "@angular/forms";
import {newUser} from "../services/manageUserData/user";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  providers: [ManageUserDataService]
})

export class RegistrationComponent implements OnInit {
  constructor(private manageUserData: ManageUserDataService) {
  }

  //url: string | ArrayBuffer | null = "assets/Pictures/standardProfilePic.png";

  ngOnInit(): void {
  }
  goForRegister(form:NgForm){
    let newRegisteredUser = new newUser(form.value.register_username, form.value.register_email, form.value.register_password);

    if(newRegisteredUser.getUsername()==form.value.verify_password){
      //call an service
      //nach injections checken
    }
  }
  // validateRegistrationData(frm:any) {
  //   let regUser = new User(frm.profilepicture,frm.username,frm.firstname,frm.birthday,frm.email,frm.password,);
  //   console.log(regUser.getUserUsername())
  // }

  // showProfilePicture(event: any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     reader.readAsDataURL(event.target.files[0]); // read file as data url
  //     reader.onload = (event) => { // called once readAsDataURL is completed
  //       // @ts-ignore
  //       this.url = event.target.result;
  //     }
  //   }
  // }
}
