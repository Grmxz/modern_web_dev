"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcessor = void 0;
const status_1 = require("./status");
const testFolder = './Images/';
const fs = require('fs');
class MessageProcessor {
    static open(ws, json) {
        status_1.Status.instance.addConnection(ws, json);
        ws.send(JSON.stringify({ command: "welcome", content: "welcome, " + json['user'] }));
    }
    static close(ws) {
        status_1.Status.instance.closeConnection(ws);
    }
    static send(ws, json) {
        let recipient = json['recipient'];
        let conn = status_1.Status.instance.findConnection(ws);
        if (conn) {
            let sender = conn.userId;
            status_1.Status.instance.connections.forEach(oneConnection => {
                if (oneConnection.userId == recipient || !recipient)
                    oneConnection.ws.send(JSON.stringify({ command: "message", sender: sender, content: json['content'] }));
            });
        }
    }
    static GetCurrentDir(ws, json) {
        let fileList = [];
        /*
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
              fileList.push(file as string);
              //console.log(fileList);
              console.log(file);
            });
        });
        */
        fs.readdirSync(testFolder).forEach(file => {
            console.log(file);
            fileList.push(file);
        });
        console.log(fileList);
        console.log(fileList);
        console.log(fileList);
        ws.send(JSON.stringify({ command: "Here", content: fileList }));
    }
    static processMessage(ws, message) {
        console.log("process message : " + message);
        let json = JSON.parse(message);
        switch (json['command']) {
            case 'open':
                MessageProcessor.open(ws, json);
                break;
            case 'close':
                MessageProcessor.close(ws);
                break;
            case 'message':
                MessageProcessor.send(ws, json);
                break;
            case 'GetCurrentDir':
                MessageProcessor.GetCurrentDir(ws, json);
                break;
            default:
                console.log("unknown command.");
        }
    }
}
exports.MessageProcessor = MessageProcessor;
