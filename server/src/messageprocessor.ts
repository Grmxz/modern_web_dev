import {WebSocket} from "ws";
import {Status} from "./status";

export class MessageProcessor
{
	private static open( ws: WebSocket , json: any )
	{
		Status.instance.addConnection( ws , json );
		ws.send( JSON.stringify( { command: "welcome" , content: "welcome, " + json['user'] } ) );
	}

	private static close( ws: WebSocket )
	{
		Status.instance.closeConnection( ws );
	}

	private static send( ws: WebSocket , json: any )
	{
		let recipient: string = json['recipient'];
		let conn = Status.instance.findConnection( ws );
		if ( conn )
		{
			let sender = conn.userId;
			Status.instance.connections.forEach( oneConnection => {
				if ( oneConnection.userId == recipient || !recipient )
					oneConnection.ws.send( JSON.stringify( { command: "message" , sender: sender , content: json['content'] } ) );
			} );
		}
	}

	public static processMessage( ws: WebSocket , message: string )
	{
		console.log( "process message : " + message );
		let json = JSON.parse( message );
		switch ( json['command'] )
		{
			case 'open':
				MessageProcessor.open( ws , json );
				break;
			case 'close':
				MessageProcessor.close( ws );
				break;
			case 'message':
				MessageProcessor.send( ws , json );
				break;
			default:
				console.log( "unknown command." );
		}
	}
}
