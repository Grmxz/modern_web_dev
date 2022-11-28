import {WebSocketServer} from "ws";
import {MessageProcessor} from "./messageprocessor";
import {Status} from "./status";



const port = 12345;
const server = new WebSocketServer( { port } );

server.on( "connection" , websocket => {
	console.log( "connection opened." );
	websocket.on( "message" , data => {
		MessageProcessor.processMessage( websocket , data.toString() );
	} );
	websocket.on( "close" , data => {
		Status.instance.closeConnection( websocket );
	} );
	websocket.on( "error" , ( websocket: WebSocket , error: Error ) => {
		console.log( "connection error : " + error.toString() );
	} );
} );

console.log( "Server running..." );


//tsc -t es5 script.ts
