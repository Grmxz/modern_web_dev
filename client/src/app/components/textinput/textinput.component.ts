import {Component , OnInit } from '@angular/core';
import {StatusService} from "../../services/status.service";

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
  public user:string = "User1";


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
  }

  public send(): void
  {
    console.log( this.status.GetContent("") );
  }
}
