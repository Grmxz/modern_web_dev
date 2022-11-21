import {Component , Input , OnInit} from '@angular/core';
import {Message} from "../../classes/message";
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-chatentry',
  templateUrl: './chatentry.component.html',
  styleUrls: ['./chatentry.component.css']
})
export class ChatentryComponent implements OnInit {

  @Input() message!:Message;

  constructor(public status:StatusService) { }

  ngOnInit(): void {
  }
}
