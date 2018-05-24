import { Injectable } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Http} from "@angular/http";

const BASE_URL = "/api/";

@Injectable()
export class NotizenService {

  notes: Subject<JSON> = new Subject<JSON>();
  JSONnote: JSON;
  constructor(private http: Http) {
      this.notes.subscribe((data) => {
         this.JSONnote = data;
      });
  }

  getNotes() : Observable<JSON> {
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    this.http.get(BASE_URL+"notes").subscribe(
        data => {
          let jsonNote = JSON.parse(data.text());
          this.notes.next(jsonNote);
          console.log(jsonNote);
        },
        err => {
          console.log(err);
        }
    );
    return this.notes;
  }
  removeNote(id:number): Observable<Boolean> {
      let subject = new Subject<Boolean>();
      let header = new Headers();
      header.append('Content-Type', 'application/json');
      this.http.delete(BASE_URL+"notes/"+id).subscribe(
          data => {
              subject.next(true);
              this.notes.next(this.removeElement(id, this.JSONnote));
          },
          err => {
              throw err;
          }
      );
      return subject;
  }



  private removeElement(id: number, inputJSON: JSON): JSON {
    for (let i in this.JSONnote) {
        if (this.JSONnote[i].PK == id) {
            delete inputJSON[i];
        }
    }
    return inputJSON;
  }
}
