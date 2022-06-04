import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../../../list/list.component";
import {ManageListDataService} from "../../../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-modal-create-product',
  templateUrl: './modal-create-product.component.html',
  styleUrls: ['./modal-create-product.component.css']
})
export class ModalCreateProductComponent implements OnInit {

  constructor(public list: ListComponent, public manageListProduct: ManageListDataService) {
  }

  ngOnInit(): void {
  }

}
