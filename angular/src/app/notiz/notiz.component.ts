import {Component, Input, OnInit} from '@angular/core';
import {NotizenService} from "../services/notizen.service";
import {Note} from "../../models/interfaces/Notes";

@Component({
  selector: 'app-notiz',
  templateUrl: './notiz.component.html',
  styleUrls: ['./notiz.component.css']
})
export class NotizComponent implements OnInit {
  @Input() noteInput: Note;
  note: Note;
  constructor(private notizenService: NotizenService) {

  }

  delite(id: number, event) {
    this.notizenService.removeNote(id).subscribe(
        data => {
          console.log("succes");
        }
    )
  }

  ngOnInit() {
      this.note = this.noteInput;
  }

}
