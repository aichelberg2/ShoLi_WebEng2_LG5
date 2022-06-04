import {Component, OnInit} from '@angular/core';
import {ListComponent} from "../../../list/list.component";
import {ManageListDataService} from "../../../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-modal-change-price-of-product',
  templateUrl: './modal-change-price-of-product.component.html',
  styleUrls: ['./modal-change-price-of-product.component.css']
})
export class ModalChangePriceOfProductComponent implements OnInit {

  constructor(public list: ListComponent, public manageListData: ManageListDataService) {
  }

  ngOnInit(): void {
  }

}
