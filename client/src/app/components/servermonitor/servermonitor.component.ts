import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-servermonitor',
  templateUrl: './servermonitor.component.html',
  styleUrls: ['./servermonitor.component.css']
})
export class ServermonitorComponent implements OnInit
{

  constructor( public status: StatusService )
  {
  }

  ngOnInit(): void
  {
  }

  public connectionString(): string
  {
    if ( this.status.connected )
      return `${this.status.connectedServer?.ip}` ;
    return " not connected";
  }
}
