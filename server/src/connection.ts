import {WebSocket} from "ws";

export class Connection
{
	private _userId: string;
	private _ws: WebSocket;

	constructor( userId: string , ws: WebSocket )
	{
		this._userId = userId;
		this._ws = ws;
	}

	get userId(): string
	{
		return this._userId;
	}

	get ws(): WebSocket
	{
		return this._ws;
	}
}
