import {Component, Input, OnInit} from '@angular/core';
import {NotizenService} from "../services/notizen.service";
import {createInitilaNote, Note} from "../../models/interfaces/Notes";

@Component({
  selector: 'app-notiz',
  templateUrl: './notiz.component.html',
  styleUrls: ['./notiz.component.css']
})
export class NotizComponent implements OnInit {
  @Input() noteInput: Note;
  note: Note;
  showUpdateForm;

  constructor(private notizenService: NotizenService) {
    this.showUpdateForm = false;
  }

  delite(id: number, event) {
    this.notizenService.removeNote(id).subscribe(
        data => {
          console.log("succes");
        }
    )
  }

  update(values: any, valid:boolean) {
    if (valid) {
        this.notizenService.updateNotes(this.note);
        this.showUpdateForm = false;
    }
  }

  ngOnInit() {
      this.note = this.noteInput;
  }

}
