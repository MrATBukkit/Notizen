import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Tag} from "../models/interfaces/Tag";

const BASE_URL = "/api/tags/";

@Injectable()
export class TagService {

  constructor(private http: HttpClient) { }

  httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'my-auth-token'
      })
  };

  searchTags(searchText: string): Observable<Tag[]> {
      let subject = new Subject<Tag[]>();
      const url = BASE_URL + `search?q=${searchText}`;
      this.http.get<Tag[]>(url).subscribe(data => {
          subject.next(data);
      }, err => {
          subject.error(err);
      });
      return subject;
  }

  addTags(tag: Tag): Observable<Tag> {
    let request: Observable<Tag> =this.http.post<Tag>(BASE_URL, tag, this.httpOptions)
    return request;
  }

}
