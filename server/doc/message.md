# Messageformat for Minichat

Message are are JSON-structs. Every message contains a command and additional parameters. The structure is:

    {
        "command" : "open"|"close"|"message"
        "user"|"message": parameters - see below
    }

## Commands

### open
The open-command is send from the client to the server to register the client as a member of the chatgroup. 
Every websocket-connection can only be added once.

Parameters:
- user: a unique user-id
### close
The close-command is send from the client to the server to terminate the connection.

Parameters:
none
### message
The message-command is sent from the client to the server for sending the message to connected clients 
or is sent from server to client
Parameters (if sent from client):
- content: The message to sent
- user: the recipient of the message. If this parameter is omitted the message will be sent to every member.
Parameters (if sent from server):
- content: The message to receive/show
- user: The sender
### welcome
The welcome-command is sent from server to the client to welcome the newly connected client
- content: The welcome-message
