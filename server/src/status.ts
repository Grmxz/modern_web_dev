import {Connection} from "./connection";
import {WebSocket} from "ws";

export class Status
{
	private static _instance: Status | null = null;

	private listOfConnections: Connection[] = [];

	private plotConnectionlist()
	{
		console.log( "Connections:" );
		console.log( this.listOfConnections );
		console.log( "-------------------" );
	}

	private constructor()
	{
	}

	public static get instance(): Status
	{
		if ( this._instance === null )
			this._instance = new Status();
		return this._instance;
	}

	public get connections(): Connection[]
	{
		return this.listOfConnections;
	}

	public addConnection( ws: WebSocket , json: any ): void
	{
		if ( !this.listOfConnections.find( oneConnection => oneConnection.ws == ws ) )
		{
			this.listOfConnections.push( new Connection( json['user'] , ws ) );
			this.plotConnectionlist();
		}
	}

	public closeConnection( ws: WebSocket ): void
	{
		let closeIdx: number = this.listOfConnections.findIndex( oneConnection => oneConnection.ws == ws );
		if ( closeIdx > -1 )
		{
			this.listOfConnections.splice( closeIdx , 1 );
			this.plotConnectionlist();
		}
	}

	public findConnection( ws: WebSocket ): Connection | undefined
	{
		return this.listOfConnections.find( oneConnection => oneConnection.ws == ws );
	}
}
