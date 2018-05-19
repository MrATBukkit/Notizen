import { Component, OnInit } from '@angular/core';
import {NotizenService} from "../services/notizen.service";

@Component({
  selector: 'app-notizen-list',
  templateUrl: './notizen-list.component.html',
  styleUrls: ['./notizen-list.component.css']
})
export class NotizenListComponent implements OnInit {

  notes: JSON;

  constructor(private notizenService: NotizenService) { }

  ngOnInit() {
    this.notizenService.getNotes().subscribe(data => {
      this.notes = data;
    }, err => {
      console.log(err);
    })
  }

}