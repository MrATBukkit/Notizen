import { Component, OnInit } from '@angular/core';
import {NotizenService} from "../services/notizen.service";
import {Note} from "../../models/interfaces/Notes";

@Component({
  selector: 'app-notizen-list',
  templateUrl: './notizen-list.component.html',
  styleUrls: ['./notizen-list.component.css']
})
export class NotizenListComponent implements OnInit {

  notes: Note[];
  showAddFormular: boolean

  constructor(private notizenService: NotizenService) {
    this.showAddFormular = false;
  }

  ngOnInit() {
    this.notizenService.getNotes().subscribe(data => {
      this.notes = data;
    }, err => {
      console.log(err);
    })
  }

}
