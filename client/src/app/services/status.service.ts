import {Injectable} from '@angular/core';
import {Message} from "../classes/message";
import {Server} from "../classes/server";
import { Observable, Subject } from 'rxjs';
//import {} from "../images-content/ima";


@Injectable( {
   providedIn: 'root'
} )
export class StatusService
{
   public loggedInUser: string = 'X';
   public connectedServer: Server | null = null;

   public messages: Message[] = [];

   constructor()
   {
/*
      this.messages.push( new Message( "X" , "Y" , "Message 1" , false ) );
      this.messages.push( new Message( "X" , "Y" , "Message 2" , false ) );
      this.messages.push( new Message( "Y" , "X" , "Message 3" , false ) );
      this.messages.push( new Message( "X" , "Y" , "Message 4" , false ) );
      this.messages.push( new Message( "Y" , "X" , "Message 5" , false ) );
*/
   }


     // Observable string sources
   private componentMethodCallSource = new Subject<any>();
   private componentMethodCallSourcePath = new Subject<any>();
   public pathOfChange:string ="";
   // Observable string streams
   reloadComponentCalled = this.componentMethodCallSource.asObservable();
   checkPathComponentCalled = this.componentMethodCallSourcePath.asObservable();
   //pathOfChangeCalled = this.pathOfChange.asObservable();

   public CheckPath(path:string) {
      this.pathOfChange = path;
      console.log(this.pathOfChange);
   }

   public GetPath():string{
      return this.pathOfChange;
   }


   public callComponentMethod() {
      this.componentMethodCallSource.next();
      //console.log("callcomponent");
    }

   public NewPath() {
      this.componentMethodCallSourcePath.next();
   }

   public connect( ip: string , user: string ): boolean
   {
      this.connectedServer = Server.connect( ip , user , this);
      return this.connectedServer != null;
   }

   public send( message: Message ): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.send( message );
   }

   public GetContent(path:string): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.GetContent(path);
   }

   public RefreshContent(path:string): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.GetContent(path);
   }

   public Updirectory(path:string): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Updirectory(path);
   }

   public Create(path:string, Dirpath:string, type:boolean): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Create(path,Dirpath, type);
   }

   public Delete(path:string, Dirpath:string, type:boolean): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Delete(path,Dirpath, type);
   }

   public Rename(path:string,NewName:string, Dirpath:string, type:boolean): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Rename(path,NewName,Dirpath, type);
   }

   public Upload(path:string, Dirpath:string, base64:string): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Upload(path,Dirpath, base64);
   }

   public disconnect(): void
   {
      if ( this.connected )
      {
         this.connectedServer?.disconnect();
      }
   }

   public get connected(): boolean
   {
      return this.connectedServer != null && this.connectedServer.connected;
   }
}

