import {WebSocket} from "ws";
import {Status} from "./status";
import {CSVoperator} from "./CSVoperator";
//import Path from 'path'

const root = './Images/';
const fs = require('fs');
const path = require('path');
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

	private static sendAll( ws: WebSocket , dir:string, FolderDir:string)
	{
		//let recipient: string = json['recipient'];
		let conn = Status.instance.findConnection( ws );
		if ( conn )
		{
			let sender = conn.userId;
			Status.instance.connections.forEach( oneConnection => {
				//if ( oneConnection.userId == recipient || !recipient )
				oneConnection.ws.send( JSON.stringify( { command: "Done",directory:dir, FolderDirectory:FolderDir} ) );
			} );
		}
	}

	private static GetDirContent( ws: WebSocket , json: any )
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
		let dir = json['directory'];
		fs.readdirSync(root+dir).forEach((file:any) => {
			//console.log(file);
			fileList.push(file as string);
		});

		console.log(fileList);
		ws.send( JSON.stringify( { command: "Here" , content: fileList} ) );
	}




	private static ChangeDirectory( ws: WebSocket , json: any )
	{
		console.log("ok2");
		let fileList:String[]=[];
		let dir = json['directory'];
		console.log("ok3");


		//try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
		fs.readdirSync(root+dir).forEach((file:any) => {
			fileList.push(file as string);
		});

		console.log(fileList);
		ws.send( JSON.stringify( { command: "ChangeDirectory" , content: fileList} ) );
	}


	private static Delete( ws: WebSocket , json: any )
	{
		let fileList:String[]=[];
		let dir = json['directory'];
		let type = json['type'];
		let FolderDir = json['FolderDirectory'];
		//only delete files
		//try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
		
		if(type=="Directory"){
			fs.rmdir(root+dir, { recursive: true }, err => {
				if (err) {
				  throw err
				}
				console.log(`${dir} is deleted!`);
				MessageProcessor.sendAll(ws,dir,FolderDir);
			  })
		} else if(type=="File"){
			fs.unlinkSync(root+dir);
			MessageProcessor.sendAll(ws,dir,FolderDir);
		}

		//ws.send( JSON.stringify( { command: "deleted"} ) );
	}

	private static Create( ws: WebSocket , json: any )
	{
		let fileList:String[]=[];
		let type = json['type'];
		let dir = json['directory'];
		let FolderDir = json['FolderDirectory'];

		//try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
		//fs.unlinkSync(root+dir)
		if(type=="File"){
			fs.open(root+dir, 'w', function (err:any, file:any) {
				if (err) throw err;
				console.log('Saved!');
				MessageProcessor.sendAll(ws,dir,FolderDir);
			});
		}else if(type=="Directory"){
			if (!fs.existsSync(root+dir)){
				fs.mkdirSync(root+dir);
				//ws.send( JSON.stringify( { command: "created_directory"} ) );
				MessageProcessor.sendAll(ws,dir,FolderDir);
			}
		}
		

	}



	private static Rename( ws: WebSocket , json: any )
	{
		let fileList:String[]=[];
		let type = json['type'];
		let dir = json['directory'];
		let newDir = json['Newdirectory']
		let FolderDir = json['FolderDirectory'];

		//try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
		fs.renameSync(dir, newDir);
		MessageProcessor.sendAll(ws,dir,FolderDir);

	}

	private static GetContent( ws: WebSocket , json: any )
	{
		/*imageToBase64("Images/test.jpg") // Path to the image
		.then(
			(response:any) => {
				console.log(response); // "cGF0aC90by9maWxlLmpwZw=="
				ws.send( JSON.stringify( { command: "directory_data" , content: response} ) );
			}
		)
		.catch(
			(error:any) => {
				console.log(error); // Logs an error if there was one
			}
		)*/
		type FileSpecs = {
			name: string;
			base64encode: string;
			type: string;
		};
		let fileList:any[]=[];
		let dir = json['directory'];
		fs.readdirSync(root+dir).forEach((file:any) => {
			let fileSpecs:FileSpecs = {name :"",base64encode:"",type:""};
			console.log(root+dir);
			console.log(file);
			let type = "";
			let file64 = "";
			if(fs.lstatSync(root+dir+file).isDirectory()){
				type = "Directory"
			}else{
				file64 = fs.readFileSync(root+dir+file,{encoding: 'base64'});
				type = ""
			}
			let filename = path.basename(root+dir+file); 
	
			fileSpecs.name = filename;
			fileSpecs.base64encode = file64;
			fileSpecs.type = type;
			//console.log(file);
			fileList.push(fileSpecs);
		});

		console.log(fileList);
		ws.send( JSON.stringify( { command: "GetContent" , content: fileList} ) );

		
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
			case 'Delete':
				MessageProcessor.Delete( ws ,json);
				break;
			case 'Create':
				MessageProcessor.Create( ws ,json);
				break;
			case 'Rename':
				MessageProcessor.Rename( ws ,json);
				break;
			case 'GetDirContent':
				MessageProcessor.GetDirContent( ws ,json);
				break;
			case 'ChangeDirectory':
				MessageProcessor.ChangeDirectory( ws ,json);
				break;
			case 'GetContent':
				MessageProcessor.GetContent( ws ,json);
				break;
			case 'GetImages':
				CSVoperator.ImportFromCSV(ws, json);
				break;
			default:
				console.log( "unknown command." );

				// add rename
		}
	}
}

