import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note, createInitilaNote} from "../../models/interfaces/Notes";
import {NotizenService} from "../services/notizen.service";

@Component({
  selector: 'app-add-note',
  templateUrl: './add-note.component.html',
  styleUrls: ['./add-note.component.css'],
})


export class AddNoteComponent implements OnInit {

  @Output() addFinished = new EventEmitter();


  addNoteModel: Note;
  constructor(private notizenService: NotizenService) {
    this.addNoteModel = createInitilaNote();
  }

  ngOnInit() {
  }

  addNote(values: any, valid: boolean) {
    let note: Note = createInitilaNote();
    note.text = values.text;
    this.notizenService.addNote(note);
    this.addNoteModel = createInitilaNote();
    this.addFinished.emit();
  }

}
