import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NotizenListComponent } from './notizen-list/notizen-list.component';
import { NotizComponent } from './notiz/notiz.component';
import {NotizenService} from "./services/notizen.service";
import { AddNoteComponent } from './add-note/add-note.component';
import {FormsModule} from "@angular/forms";
import {ShowErrorComponent} from "./show-error/show-error.component";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    NotizenListComponent,
    NotizComponent,
    AddNoteComponent,
    ShowErrorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [NotizenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
