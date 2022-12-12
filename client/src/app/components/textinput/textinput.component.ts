import {Component , OnInit } from '@angular/core';
import {StatusService} from "../../services/status.service";
import {Message} from "../../classes/message";

@Component( {
  selector: 'app-textinput' ,
  templateUrl: './textinput.component.html' ,
  styleUrls: ['./textinput.component.css']
} )
export class TextinputComponent implements OnInit
{
  public ip: string = "localhost:12345";
  public message!: string;
  public recipient!: string;
  public user:string = "kai";


  constructor( public status: StatusService )
  {
  }

  ngOnInit(): void
  {
  }

  public connect(): void
  {
    console.log( "connect to : " + this.ip );
    this.status.connect( this.ip , this.user );
    //this.send();
  }

  public send(path:string): void
  {
    //console.log( "send '" + this.message + "' to : " + this.recipient );
    //console.log( this.status.send( new Message( this.status.loggedInUser , this.recipient , this.message , false ) ) );
    console.log( this.status.GetContent(path) );
  }
}
