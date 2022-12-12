import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatentryComponent } from './components/chatentry/chatentry.component';
import { TextinputComponent } from './components/textinput/textinput.component';
import {FormsModule} from "@angular/forms";
import { ServermonitorComponent } from './components/servermonitor/servermonitor.component';
import { ImagesContentComponent } from './images-content/images-content.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatentryComponent,
    TextinputComponent,
    ServermonitorComponent,
    ImagesContentComponent
  ],
	imports: [
		BrowserModule ,
		FormsModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
