import {Injectable} from '@angular/core';
import {Message} from "../classes/message";
import {Server} from "../classes/server";

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

   public connect( ip: string , user: string ): boolean
   {
      this.connectedServer = Server.connect( ip , user , this );
      return this.connectedServer != null;
   }

   public send( message: Message ): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.send( message );
   }

   public GetContent(): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.GetContent();
   }

   public RefreshContent(path:string): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.GetContent();
   }

   public Updirectory(): boolean
   {
      if ( this.connectedServer === null )
         return false;
      return this.connectedServer.Updirectory();
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
