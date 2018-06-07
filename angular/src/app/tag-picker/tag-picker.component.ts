import { Component, OnInit } from '@angular/core';
import {Tag} from "../../models/interfaces/Tag";

@Component({
  selector: 'app-tag-picker',
  templateUrl: './tag-picker.component.html',
  styleUrls: ['./tag-picker.component.css']
})
export class TagPickerComponent implements OnInit {

  constructor() { }
  tags: Tag[];

  ngOnInit() {
  }

}
