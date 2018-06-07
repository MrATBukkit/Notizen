import { Component, OnInit } from '@angular/core';
import {createInitilaTag, Tag} from "../../models/interfaces/Tag";

@Component({
  selector: 'app-tag-picker',
  templateUrl: './tag-picker.component.html',
  styleUrls: ['./tag-picker.component.css']
})
export class TagPickerComponent implements OnInit {

  constructor() {
    this.tags = [];
    let tag1 = createInitilaTag();
    tag1.PK = 1;
    tag1.tag = "hallo";
    let tag2 = createInitilaTag();
    tag1.PK = 2;
    tag1.tag = "test";
    this.tags.push(tag1);
    this.tags.push(tag2);
  }
  tags: Tag[];

  ngOnInit() {
  }

}
