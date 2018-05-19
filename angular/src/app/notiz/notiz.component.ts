import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-notiz',
  templateUrl: './notiz.component.html',
  styleUrls: ['./notiz.component.css']
})
export class NotizComponent implements OnInit {
  @Input() noteInput: JSON;
  note: JSON;
  constructor() {

  }

  ngOnInit() {
      this.note = this.noteInput;
  }

}
