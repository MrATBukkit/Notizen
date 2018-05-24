import { Injectable } from '@angular/core';

import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Http} from "@angular/http";
import {Note} from "../../models/interfaces/Notes";
import {HttpHeaders, HttpResponse} from "@angular/common/http";

const BASE_URL = "/api/";

@Injectable()
export class NotizenService {

  notes: Subject<Note[]> = new Subject<Note[]>();
  JSONnote: Note[];

  httpOptions = {
      headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
      })
  };

  constructor(private http: Http) {
      this.notes.subscribe((data) => {
         this.JSONnote = data;
      });
  }

  getNotes() : Observable<Note[]> {
    this.http.get(BASE_URL+"notes").subscribe(
        data => {
          let jsonNote = JSON.parse(data.text());
          this.notes.next(jsonNote);
        },
        err => {
          console.log(err);
        }
    );
    return this.notes;
  }
  removeNote(id:number): Observable<Boolean> {
      let subject = new Subject<Boolean>();
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

  addNote(note: Note): Observable<Boolean> {
      let subject = new Subject<Boolean>();
      //this.http.post(BASE_URL+"notes/", note, this.httpOptions);
      return subject;
  }

  private removeElement(id: number, inputJSON: Note[]): Note[] {
    for (let i in this.JSONnote) {
        if (this.JSONnote[i].PK == id) {
            delete inputJSON[i];
        }
    }
    return inputJSON;
  }
}
