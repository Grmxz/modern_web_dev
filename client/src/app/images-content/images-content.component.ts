import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FileList, Server, File } from '../classes/server';
import {StatusService} from "../services/status.service";
import { DomSanitizer } from '@angular/platform-browser';

//const normalize = require('normalize-path');
const normalize = require('path-normalize')
//const path = require('path');


@Component({
  selector: 'app-images-content',
  templateUrl: './images-content.component.html',
  styleUrls: ['./images-content.component.css']
})
export class ImagesContentComponent implements OnInit {
  constructor(
    public status: StatusService,
    private _sanitizer: DomSanitizer) { 

      this.status.reloadComponentCalled.subscribe(
        () => {
          //alert('(Component2) Method called!');
          this.reload();
        }
      );

      this.status.checkPathComponentCalled.subscribe(
        () => {
          // comparing path
          let TmpPath = this.status.GetPath();
          TmpPath = normalize(TmpPath);
          let TmpPath2 = normalize(this.CurrentDirectory);
          console.log(TmpPath,TmpPath2);
          if(TmpPath==TmpPath2){
            console.log("normalized");
            this.status.GetContent(this.CurrentDirectory);
          }
        }
      );



  }
  fileList = FileList;
  imageList = FileList;
  directoryList = FileList;
  CurrentDirectory:string = "";
  fileToCreate:string = "example.txt";
  checked = false;

  
 

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



  ngOnInit(): void {
    this.fileList = FileList;
    [this.imageList,this.directoryList] = this.checkTypes();
    console.log(this.fileList);
    this.CurrentDirectory = "";
  }
  
 
  public reload(): void{
    this.fileList = FileList;
    [this.imageList,this.directoryList] = this.checkTypes();

    let n = 0;
    this.imageList.forEach((element:File)=>{
      element.base64encode = this._sanitizer.bypassSecurityTrustUrl('data:image/jpg;base64,' 
      + this.imageList[n].base64encode) as string;
      n = n+1
    })


    //this.imageList[0].base64encode = this._sanitizer.bypassSecurityTrustUrl(this.imageList[0].base64encode) as string;
    console.log(this.fileList);
    console.log(this.imageList);
    console.log(this.directoryList);
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
  }

  public Create(/*type:boolean*/){
    this.status.Create(this.CurrentDirectory+this.fileToCreate,this.CurrentDirectory,true);
  }

  public Delete(/*type:boolean*/){
    this.status.Delete(this.CurrentDirectory+this.fileToCreate,this.CurrentDirectory,true);
  }

  public Rename(/*type:boolean*/){
    this.status.Delete(this.CurrentDirectory+this.fileToCreate,this.CurrentDirectory,true);
  } 

}