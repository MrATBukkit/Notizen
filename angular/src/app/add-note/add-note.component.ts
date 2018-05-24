import { Component, OnInit } from '@angular/core';
import {Note, createInitilaNote} from "../../models/interfaces/Notes";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  addNoteModel: Note;
  constructor() {
    this.addNoteModel = createInitilaNote();
  }

  ngOnInit() {
  }

  update(values: any, valid: boolean) {

  }

}
