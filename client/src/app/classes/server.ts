import {Message} from "./message";
import {StatusService} from "../services/status.service";

export class Server
{
   private _ip: string;
   private _ws: WebSocket | null;

   constructor( ws: WebSocket , ip: string , public status: StatusService )
   {
      this._ip = ip;
      this._ws = ws;
   }

   get ip(): string
   {
      return this._ip;
   }

   public static connect( ip: string , user: string , status: StatusService ): Server
   {
      let adr = "ws://" + ip;
      console.log( `connect to : ${adr}` );
      let ws: WebSocket = new WebSocket( adr );
      let retval = new Server( ws , ip , status );
      ws.onopen = (() => {
         ws.send( JSON.stringify( { command: "open" , "user": user } ) );
      });
      ws.onerror = (() => {
         console.log( "failed" );
         retval.disconnect();
      });
      ws.onclose = (() => {
         console.log( "error" );
         retval.disconnect();
      });
      ws.onmessage = (ev => {
         retval.receive( ev );
      });
      return retval;
   }

   public send( message: Message ): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         this._ws.send( JSON.stringify( { "command": "message" , "content": message.content , "recipient": message.recipient } ) );
         this.status.messages.push( new Message( this.status.loggedInUser , message.recipient , message.content , !message.recipient ) );
         return true;
      }
      return false;
   }

   public disconnect(): void
   {
      if ( this._ws !== null )
         this._ws.close();
      this._ws = null;
   }

   public get connected(): boolean
   {
      return this._ws !== null;
   }

   private receive( ev: MessageEvent )
   {
      let messdata = JSON.parse( ev.data );
      if ( messdata['command'] == 'message' )
      {
         let m: Message = new Message( messdata['user'] , this.status.loggedInUser , messdata['content'] , false )
         console.log( m );
         this.status.messages.push( m );
      }
   }
}
