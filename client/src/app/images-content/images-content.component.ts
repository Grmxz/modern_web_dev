import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FileList, Server, File } from '../classes/server';
import { GlobalPubSub } from '../global-pub-sub.service';
import {StatusService} from "../services/status.service";


@Component({
  selector: 'app-images-content',
  templateUrl: './images-content.component.html',
  styleUrls: ['./images-content.component.css']
})
export class ImagesContentComponent implements OnInit {
  constructor(
    public globalPubSub: GlobalPubSub,
    public status: StatusService) { 

      this.status.reloadComponentCalled.subscribe(
        () => {
          //alert('(Component2) Method called!');
          this.reload();
        }
      );

  }
  fileList = FileList;
  imageList = FileList;
  directoryList = FileList;
  CurrentDirectory:string = "";

  
 

  private checkTypes(){
    let ImageList:File[] = [];
    let directoryList:File[] = [];
    for (var i in FileList) {
      if(FileList[i].type!="Directory"){
        ImageList.push(FileList[i]);
      }else{
        directoryList.push(FileList[i]);

      }
    }
    return [ImageList,directoryList];
  }

  
  //ImagesContent = globalPubSub
  //refreshUsers$ = new BehaviorSubject<boolean>(true);

  ngOnInit(): void {
    //GlobalPubSub.subscribe('sampleEventName', fn)
    //this.refreshUsers$.subscribe(IMAGESCONTENT)
    this.fileList = FileList;
    [this.imageList,this.directoryList] = this.checkTypes();
    console.log(this.fileList);
    this.CurrentDirectory = "";
  }
  
 
  public reload(): void{
    this.fileList = FileList;
    [this.imageList,this.directoryList] = this.checkTypes();
    console.log(this.fileList);
    console.log(this.imageList);
    console.log(this.directoryList);
    //this.ImagesContent = globalPubSub.subscribe('reloadDirectory');
  }

  public UpDirectory():void{
    this.CurrentDirectory = this.CurrentDirectory+"../";
    console.log( this.status.Updirectory(this.CurrentDirectory) );
    console.log("element from div "+document.getElementById("1")?.className);
  }

  public ChangeDirectory(index:number){
    console.log(this.directoryList[index].name+'/');
    this.CurrentDirectory = this.CurrentDirectory+this.directoryList[index].name+'/';
    this.status.GetContent(this.CurrentDirectory);
    //this.reload();
  }
 

}