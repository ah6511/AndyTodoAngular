import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
// import { AngularFontAwesomeModule } from 'angular-font-awesome';
//import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TodoService } from './todo.service';
import { ErrorService } from './error.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
//    AngularFontAwesomeModule,
    AppRoutingModule
  ],
  providers: [ErrorService, TodoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
