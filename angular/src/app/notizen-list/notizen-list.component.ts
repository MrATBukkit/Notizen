import { Component, OnInit } from '@angular/core';
import {NotizenService} from "../services/notizen.service";
import {Note} from "../../models/interfaces/Notes";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-notizen-list',
  templateUrl: './notizen-list.component.html',
  styleUrls: ['./notizen-list.component.css'],
    animations: [
        trigger('noteAnimation', [
            transition(':enter', [
                animate('400ms', keyframes([
                    style({opacity: 0, transform: 'translateY(-100%)', offset: 0}),
                    style({opacity: 0.5, transform: 'translateY(15px)',  offset: 0.3}),
                    style({opacity: 1, transform: 'translateY(0)',     offset: 1.0})
                ]))
            ]),
            transition(':leave', [
                style({'transform-origin': '100% 100%'}),
                animate('400ms', keyframes([
                    style({opacity: 1, transform: 'translateX(-15px)',  offset: 0.3}),
                    style({opacity: 0, transform: 'translateX(100%)',     offset: 1.0})

                ]))
            ])
        ])],
})
export class NotizenListComponent implements OnInit {

  notes: Note[];
  showAddFormular: boolean;

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
