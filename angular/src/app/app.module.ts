import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NotizenListComponent } from './notizen-list/notizen-list.component';
import { NotizComponent } from './notiz/notiz.component';
import {NotizenService} from "./services/notizen.service";
import {HttpModule} from "@angular/http";


@NgModule({
  declarations: [
    AppComponent,
    NotizenListComponent,
    NotizComponent
  ],
  imports: [
    BrowserModule,
      HttpModule
  ],
  providers: [NotizenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
