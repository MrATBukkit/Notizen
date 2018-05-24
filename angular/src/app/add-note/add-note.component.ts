import { Component, OnInit } from '@angular/core';
import {addNote, createInitilaAddNote} from "../../models/interfaces/addNotes";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css']
})
export class AddNoteComponent implements OnInit {
  addNoteModel: addNote;
  constructor() {
    this.addNoteModel = createInitilaAddNote();
  }

  ngOnInit() {
  }

  update(values: any, valid: boolean) {

  }

}
