import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatentryComponent } from './components/chatentry/chatentry.component';
import { TextinputComponent } from './components/textinput/textinput.component';
import {FormsModule} from "@angular/forms";
import { ServermonitorComponent } from './components/servermonitor/servermonitor.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatentryComponent,
    TextinputComponent,
    ServermonitorComponent
  ],
	imports: [
		BrowserModule ,
		FormsModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
