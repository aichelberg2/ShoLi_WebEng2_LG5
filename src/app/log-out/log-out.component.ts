import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private router: Router,private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.setIsLoggedIn(false);
    this.router.navigate(['login'])
  }
}
