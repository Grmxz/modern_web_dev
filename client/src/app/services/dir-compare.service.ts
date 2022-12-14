import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DirCompareService {

  constructor() { }
  public pathOfChange:string = "";

  public CheckPath(path:string) {
    this.pathOfChange = path;
    //console.log("callcomponent");
  }
}
