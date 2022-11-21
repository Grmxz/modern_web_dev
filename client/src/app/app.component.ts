import {Component} from '@angular/core';
import {Message} from "./classes/message";
import {StatusService} from "./services/status.service";

@Component( {
   selector: 'app-root' ,
   templateUrl: './app.component.html' ,
   styleUrls: ['./app.component.css']
} )
export class AppComponent
{
   public title = 'Chat-Client';
   public dummy = "";

   constructor( public status: StatusService )
   {
   }
}
