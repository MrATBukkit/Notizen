import {Component, Input, OnInit} from '@angular/core';
import {Tag} from "../../../models/interfaces/Tag";

@Component({
  selector: 'app-selected-tags',
  templateUrl: './selected-tags.component.html',
  styleUrls: ['./selected-tags.component.css']
})
export class SelectedTagsComponent implements OnInit {
  @Input() tag: Tag;
  selectedTag:Tag;
  constructor() {
  }

  ngOnInit() {
    console.log("Tags: " + this.tag.tag);
    this.selectedTag = this.tag;
  }

}
