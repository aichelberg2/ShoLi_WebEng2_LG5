import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../../../home/home.component";
import {ManageHomeDataService} from "../../../services/manageHomeData/manage-home-data.service";

@Component({
  selector: 'app-modal-create-list-by-modal-window',
  templateUrl: './modal-create-list-by-modal-window.component.html',
  styleUrls: ['./modal-create-list-by-modal-window.component.css']
})
export class ModalCreateListByModalWindowComponent implements OnInit {

  constructor(public home: HomeComponent, public manageHomeData: ManageHomeDataService) {
  }

  ngOnInit(): void {
  }

}
