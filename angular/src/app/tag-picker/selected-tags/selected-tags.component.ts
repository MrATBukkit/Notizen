import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Tag} from "../../../models/interfaces/Tag";

@Component({
  selector: 'app-selected-tags',
  templateUrl: './selected-tags.component.html',
  styleUrls: ['./selected-tags.component.css']
})
export class SelectedTagsComponent implements OnInit {
  @Input() tag: Tag;
  @Output() closeTag = new EventEmitter();

  selectedTag:Tag;
  constructor() {
  }

  ngOnInit() {
    console.log("Tags: " + this.tag.tag);
    this.selectedTag = this.tag;
  }

  deleteTag() {
    this.closeTag.emit()
  }

}
