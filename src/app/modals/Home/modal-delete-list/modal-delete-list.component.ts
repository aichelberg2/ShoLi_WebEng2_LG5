import {Component, OnInit} from '@angular/core';
import {HomeComponent} from "../../../home/home.component";
import {ManageHomeDataService} from "../../../services/manageHomeData/manage-home-data.service";

@Component({
  selector: 'app-modal-delete-list',
  templateUrl: './modal-delete-list.component.html',
  styleUrls: ['./modal-delete-list.component.css']
})
export class ModalDeleteListComponent implements OnInit {

  constructor(public manageHomeData: ManageHomeDataService, public home: HomeComponent) {
  }

  ngOnInit(): void {
  }

}
