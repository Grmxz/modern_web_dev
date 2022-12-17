import {Message} from "./message";
import {StatusService} from "../services/status.service";
import { ImagesContentComponent } from "../images-content/images-content.component";

type Image = {
   name: string;
   latitude: string;
   longitude: string;
   device: string;
   size: string;
   base64encode: string;
 };

export type File = {
   name: string;
   base64encode: string;
   type: string;
 };

export let FileList:File[] = [{name:"0",base64encode:"0",type:"0"}];

export let IMAGESCONTENT:Image[]=[{name:"0",latitude:"0",longitude:"0",device:"0",size:"0",base64encode:"0"}];

export class Server
{
   private _ip: string;
   private _ws: WebSocket | null;

   constructor( ws: WebSocket , ip: string , public status: StatusService)
   {
      this._ip = ip;
      this._ws = ws;
   }

   get ip(): string
   {
      return this._ip;
   }

   public static connect( ip: string , user: string , status: StatusService): Server
   {
      let adr = "ws://" + ip;
      console.log( `connect to : ${adr}` );
      let ws: WebSocket = new WebSocket( adr );
      let retval = new Server( ws , ip , status);
      ws.onopen = (() => {
         ws.send( JSON.stringify( { command: "open" , "user": user } ) );
         status.GetContent("");
         
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


   public GetContent(path:string): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         this._ws.send( JSON.stringify( { "command": "GetContent","directory" : path } ) );
         //this.status.messages.push( new Message( this.status.loggedInUser , message.recipient , message.content , !message.recipient ) );
         return true;
      }
      return false;
   }

   public Updirectory(path:string): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         this._ws.send( JSON.stringify( { "command": "GetContent","directory" : path } ) );
         //this.status.messages.push( new Message( this.status.loggedInUser , message.recipient , message.content , !message.recipient ) );
         return true;
      }
      return false;
   }

   public Create(path:string,Dirpath:string,Type:boolean): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         if(Type==false){
            this._ws.send( JSON.stringify( { "command": "Create","directory" : path,"FolderDirectory" : Dirpath,"type":"Directory" } ) );
            return true;
         }else if(Type==true){
            this._ws.send( JSON.stringify( { "command": "Create","directory" : path,"FolderDirectory" : Dirpath,"type":"File" } ) );
            return true;
         }
      }
      return false;
   }

   public Delete(path:string,Dirpath:string,Type:boolean): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         if(Type==false){
            this._ws.send( JSON.stringify( { "command": "Delete","directory" : path,"FolderDirectory" : Dirpath,"type":"Directory" } ) );
            return true;
         }else if(Type==true){
            this._ws.send( JSON.stringify( { "command": "Delete","directory" : path,"FolderDirectory" : Dirpath,"type":"File" } ) );
            return true;
         }
      }
      return false;
   }

   public Rename(path:string,NewName:string,Dirpath:string,Type:boolean): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {
         if(Type==false){
            this._ws.send( JSON.stringify( { "command": "Rename","directory" : path,"Newdirectory": NewName, "FolderDirectory" : Dirpath,"type":"Directory" } ) );
            return true;
         }else if(Type==true){
            this._ws.send( JSON.stringify( { "command": "Rename","directory" : path,"Newdirectory": NewName, "FolderDirectory" : Dirpath,"type":"File" } ) );
            return true;
         }
      }
      return false;
   }

   public Upload(path:string,Dirpath:string,base64:string): boolean
   {
      if ( this._ws === null )
         return false;
      if ( this._ws.readyState == 1 )
      {

         this._ws.send( JSON.stringify( { "command": "Upload","directory" : path,"base64":base64, "FolderDirectory" : Dirpath } ) );
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
      if ( messdata['command'] == 'message' ) {
         let m: Message = new Message( messdata['user'] , this.status.loggedInUser , messdata['content'] , false )
         console.log( m );
         this.status.messages.push( m );
      } else if ( messdata['command'] == 'GetContent' ) {
         //let m: Message = new Message( messdata['user'] , this.status.loggedInUser , messdata['content'] , false )
         FileList = messdata['content'];
         //console.log(FileList);
         this.status.callComponentMethod();
         ImagesContentComponent.arguments(FileList)
         //GlobalPubSub.fireEvent('sampleEventName', args)
         //window.fireAngularEvent('reloadDirectory',0);

         //console.log(this.status.callComponentMethod()+"yay");
         //console.log("ouais");
         //ImagesContentComponent.reload();
         //this.status.messages.push( m );
      } else if ( messdata['command'] == 'Done' ) {
         console.log(messdata);
         //alert('(Refresh Asked) Method called!');
         this.status.CheckPath(messdata['FolderDirectory']);
         this.status.NewPath();
      }
   }
}
