import {WebSocket} from "ws";
import {Status} from "./status";
import {CSVoperator} from "./CSVoperator";

const testFolder = './Images/';
const fs = require('fs');
const imageToBase64 = require('image-to-base64');

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

	private static GetCurrentDir( ws: WebSocket , json: any )
	{

		/*
		fs.readdir(testFolder, (err, files) => {
			files.forEach(file => {
			  fileList.push(file as string);
			  //console.log(fileList);
			  console.log(file);
			});
		});
		*/
		let fileList:String[]=[];

		fs.readdirSync(testFolder).forEach((file:any) => {
			//console.log(file);
			fileList.push(file as string);
		});

		console.log(fileList);
		ws.send( JSON.stringify( { command: "Here" , content: fileList} ) );
	}

	private static GetContent( ws: WebSocket , json: any )
	{
		imageToBase64("Images/test.jpg") // Path to the image
		.then(
			(response:any) => {
				console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
				//ws.send( JSON.stringify( { command: "directory_data" , content: response} ) );
			}
		)
		.catch(
			(error:any) => {
				console.log(error); // Logs an error if there was one
			}
		)
		
	}



	
//or
//import imageToBase64 from 'image-to-base64/browser';



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
			case 'GetCurrentDir':
				MessageProcessor.GetCurrentDir( ws ,json);
				break;
			case 'GetContent':
				MessageProcessor.GetContent( ws ,json);
				break;
			case 'GetImages':
				CSVoperator.ImportFromCSV(ws, json);
				break;
			default:
				console.log( "unknown command." );
		}
	}
}
