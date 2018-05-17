import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

const BASE_URL = "/api/";

@Injectable()
export class NotizenService {

  constructor(private http:Http) { }

  getNotes() : Observable<JSON> {
    let subject = new Subject<JSON>();
    let header = new Headers();
    header.append('Content-Type', 'application/json');
    this.http.get(BASE_URL+"notes").subscribe(
        data => {
            console.log(JSON.parse(data.text()));
          subject.next(JSON.parse(data.text()))
        },
        err => {
          console.log(err);
        }
    );
    return subject;
  }


}
