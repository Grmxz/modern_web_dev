import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChatentryComponent } from './components/chatentry/chatentry.component';
import { TextinputComponent } from './components/textinput/textinput.component';
import {FormsModule} from "@angular/forms";
import { ServermonitorComponent } from './components/servermonitor/servermonitor.component';
import { ImagesContentComponent } from './images-content/images-content.component';
import { UpDirectoryComponent } from './components/up-directory/up-directory.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatentryComponent,
    TextinputComponent,
    ServermonitorComponent,
    ImagesContentComponent,
    UpDirectoryComponent,
    FileUploadComponent
  ],
	imports: [
		BrowserModule ,
		FormsModule
	],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
