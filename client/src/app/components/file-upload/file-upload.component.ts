import { Component, OnInit } from '@angular/core';
import { StatusService } from './../../services/status.service';
import { VarSharingService } from './../../services/var-sharing.service';
//import { ImagesContentComponent } from './../../images-content/images-content.component';
//const path = require('path')
//var fs = require('file-system');



@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.css']
})


export class FileUploadComponent implements OnInit {
    constructor(public status: StatusService,
      public VarSharing:VarSharingService
    ) {

      this.VarSharing.checkPathComponentCalled.subscribe(
        () => {
          this.CurrentDirectory = this.status.GetPath();
          console.log("get new path");
          console.log(this.CurrentDirectory);
        }
      );
     }
    selectedFile:any;
    currentId: number = 0;
    CurrentDirectory:string="";

    
    ImageToEncode: any;

    EncodedImage: string = "";

    ngOnInit(): void {
    }

    handleInputChange(files:any) {
      var file = files;
      var pattern = /image-*/;
      var reader = new FileReader();
      if (!file.type.match(pattern)) {
        alert('invalid format');
        return;
      }
      reader.onloadend = this._handleReaderLoaded.bind(this);
      reader.readAsDataURL(file);
    }


    public picked(event:any, field:any) {
      this.currentId = field;
      let fileList: FileList = event.target.files;
      if (fileList.length > 0) {
        const file: File = fileList[0];

        this.ImageToEncode = file;
        this.handleInputChange(file); //turn into base64

      }
    }

    _handleReaderLoaded(e:any) {
      let reader = e.target;
      var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
      //this.imageSrc = base64result;
      this.EncodedImage = base64result;
      console.log(this.EncodedImage);
      this.Upload();
    }



    onFileChanged(event:any) {
      this.selectedFile = event.target.files[0]
      console.log(this.selectedFile);
      //let filename = path.basename(this.selectedFile);
      //let file64 = fs.readFileSync(this.selectedFile,{encoding: 'base64'});
      console.log(this.selectedFile);
      let encoded: string = btoa(this.selectedFile);
      console.log(encoded);
    }
  
    public Upload() {
      //this.EncodedImage
      //add name of file
      console.log(this.CurrentDirectory);
      this.status.Upload(this.CurrentDirectory,this.CurrentDirectory,this.EncodedImage);
    }

}
