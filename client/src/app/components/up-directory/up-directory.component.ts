import { Component, OnInit } from '@angular/core';
import {StatusService} from "../../services/status.service";

@Component({
  selector: 'app-up-directory',
  templateUrl: './up-directory.component.html',
  styleUrls: ['./up-directory.component.css']
})
export class UpDirectoryComponent implements OnInit {

  constructor(public status: StatusService) { }
  
  CurrentDirectory:string = "";

  ngOnInit(): void {
    this.CurrentDirectory = "";
  }

  public Updirectory(){
    this.CurrentDirectory = this.CurrentDirectory + "..";
  }

  public Downdirectory(path:string){
    this.CurrentDirectory = this.CurrentDirectory + path;
  }

}
