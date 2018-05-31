import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {createInitilaNote, Note} from "../../models/interfaces/Notes";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Tag} from "@angular/compiler/src/i18n/serializers/xml_helper";

const BASE_URL = "/api/";

@Injectable()
export class NotizenService {

  notes: Subject<Note[]> = new Subject<Note[]>();
  private notesArray: Note[];

  httpOptions = {
      headers: new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': 'my-auth-token'
      })
  };

  constructor(private http: HttpClient) {
      this.notes.subscribe((data) => {
         this.notesArray = data;
      });
  }

  getNotes() : Observable<Note[]> {
    this.http.get<Note[]>(BASE_URL+"notes").subscribe(
        data => {
          this.notes.next(data);
        },
        err => {
          console.log(err);
        }
    );
    return this.notes;
  }
  removeNote(id:number): Observable<Boolean> {
      let subject = new Subject<Boolean>();
      this.http.delete(BASE_URL+"notes/"+id, {responseType: 'text'}).subscribe(
          data => {
              this.notes.next(this.removeElement(id, this.notesArray));
              subject.next(true);
          }, err => {
              subject.error(err);
              throw err;
          }
      );
      return subject;
  }

  addNote(note: Note): Observable<Boolean> {
      let subject = new Subject<Boolean>();
      this.http.post<Note>(BASE_URL+"notes/", note, this.httpOptions).subscribe(data => {
          this.notesArray.push(data);
          this.notes.next(this.notesArray);
          subject.next(true);
      }, err => {
          subject.error(err);
      });
      return subject;
  }

  searchTags(text: string): Observable<Tag[]> {
    let subject = new Subject<Tag[]>();
    const url = BASE_URL + `tags/search?q=${text}`;
    this.http.get<Tag[]>(url).subscribe(data => {
        subject.next(data);
    }, err => {
        subject.error(err);
    });
    return subject;
  };

  private removeElement(id: number, inputJSON: Note[]): Note[] {
    for (let i in this.notesArray) {
        if (this.notesArray[i].PK == id) {
            delete inputJSON[i];
        }
    }
    return inputJSON;
  }
}
