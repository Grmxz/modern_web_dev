export class Message
{
  private _sender: string;
  private _recipient: string;
  private _content: string;
  private _broadcast: boolean;

  constructor( sender: string , recipient: string , content: string , broadcast: boolean )
  {
    this._sender = sender;
    this._recipient = recipient;
    this._content = content;
    this._broadcast = broadcast;
  }

  get sender(): string
  {
    return this._sender;
  }

  get recipient(): string
  {
    return this._recipient;
  }

  get content(): string
  {
    return this._content;
  }

  get broadcast(): boolean
  {
    return this._broadcast;
  }
}
