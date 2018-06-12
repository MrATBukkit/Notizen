import { Component, OnInit } from '@angular/core';
import {createInitilaTag, Tag} from "../../models/interfaces/Tag";
import {TagService} from "../tag.service";

@Component({
  selector: 'app-tag-picker',
  templateUrl: './tag-picker.component.html',
  styleUrls: ['./tag-picker.component.css']
})
export class TagPickerComponent implements OnInit {

  constructor(private tagService: TagService) {
    this.tags = [];
  }
  tags: Tag[];

  ngOnInit() {
  }

  keyPressed(event, value: string) {
    if (event.keyCode == 13) {
      event.preventDefault();
      let newTag: Tag = createInitilaTag();
      newTag.tag = value;
      this.tagService.addTags(newTag);
      this.tags.push(newTag);
    }
  }

  deletTag(tag: Tag) {
    this.tags = this.tags.filter((item) => {
      return item !== tag;
    });
  }

}
