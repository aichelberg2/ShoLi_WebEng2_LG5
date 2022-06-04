import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../../../list/list.component";
import {ManageListDataService} from "../../../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-modal-delete-product-of-list',
  templateUrl: './modal-delete-product-of-list.component.html',
  styleUrls: ['./modal-delete-product-of-list.component.css']
})
export class ModalDeleteProductOfListComponent implements OnInit {

  constructor(public list: ListComponent) {
  }

  ngOnInit(): void {
  }

}
