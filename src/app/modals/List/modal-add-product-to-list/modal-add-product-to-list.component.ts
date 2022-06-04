import { Component, OnInit } from '@angular/core';
import {ListComponent} from "../../../list/list.component";
import {ManageListDataService} from "../../../services/manageListData/manage-list-data.service";

@Component({
  selector: 'app-modal-add-product-to-list',
  templateUrl: './modal-add-product-to-list.component.html',
  styleUrls: ['./modal-add-product-to-list.component.css']
})
export class ModalAddProductToListComponent implements OnInit {

  constructor(public list:ListComponent, public manageListData:ManageListDataService) { }

  ngOnInit(): void {
  }

  choosedCategorie(option: string) {
    this.manageListData.choosedProductCategorie = option;
    const gridList = document.getElementsByClassName('mat-grid-tile options rounded') as HTMLCollectionOf<HTMLElement>;
    const element = document.getElementById(option);
    for (let i = 0; i < gridList.length; i++) {
      gridList[i].style.backgroundColor = '#6c757d';
    }
    if (element != null)
      element.style.backgroundColor = '#007bff';
  }

}
