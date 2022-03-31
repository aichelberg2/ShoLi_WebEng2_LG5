import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isPopUpDisplayed: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    let listTable = document.getElementById("listTable");
    for (let i = 1; i <= 20; i++) {
      let x = document.createElement("pre");
      if (listTable != null) {
        x.style.marginTop = "25px";
        x.id = `${i}`;
        x.className = "preTags"
        listTable.appendChild(x);
      }
    }
  }

  openPopUpForListName() {
    this.isPopUpDisplayed = true;
  }

  createNewList() {
    //this.openModalClick();
    let listTable = document.getElementById("listTable");
    let x = document.createElement("tr");
    if (listTable != null) {
      for (let i = 1; i <= 20; i++) {
        // @ts-ignore
        if (document.getElementById(i.toString()).tagName == "PRE") {
          x.id = `${i}`;
          x.style.fontSize = "16.459px";
          x.innerText = "test";
          // @ts-ignore
          document.getElementById(i.toString()).replaceWith(x);
          break;
          //document.getElementById(i.toString()).appendChild(x);
        }
        //listTable.appendChild(x);
      }
    }
  }
}
