import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VarSharingService {

  constructor() { }
  public pathOfChange:string ="";
  private componentMethodCallSourcePath = new Subject<any>();
  checkPathComponentCalled = this.componentMethodCallSourcePath.asObservable();

  public SetPath(path:string) {
    this.pathOfChange = path;
    this.componentMethodCallSourcePath.next();
    console.log(this.pathOfChange);
 }

 public GetPath():string{
    return this.pathOfChange;
 }

 public NewPath() {
  this.componentMethodCallSourcePath.next();
}
}
