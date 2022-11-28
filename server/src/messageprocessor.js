"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcessor = void 0;
var status_1 = require("./status");
var testFolder = './Images/';
var fs = require('fs');
var MessageProcessor = /** @class */ (function () {
    function MessageProcessor() {
    }
    MessageProcessor.open = function (ws, json) {
        status_1.Status.instance.addConnection(ws, json);
        ws.send(JSON.stringify({ command: "welcome", content: "welcome, " + json['user'] }));
    };
    MessageProcessor.close = function (ws) {
        status_1.Status.instance.closeConnection(ws);
    };
    MessageProcessor.send = function (ws, json) {
        var recipient = json['recipient'];
        var conn = status_1.Status.instance.findConnection(ws);
        if (conn) {
            var sender_1 = conn.userId;
            status_1.Status.instance.connections.forEach(function (oneConnection) {
                if (oneConnection.userId == recipient || !recipient)
                    oneConnection.ws.send(JSON.stringify({ command: "message", sender: sender_1, content: json['content'] }));
            });
        }
    };
    MessageProcessor.GetCurrentDir = function (ws, json) {
        var fileList = [];
        /*
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
              fileList.push(file as string);
              //console.log(fileList);
              console.log(file);
            });
        });
        */
        fs.readdirSync(testFolder).forEach(function (file) {
            console.log(file);
            fileList.push(file);
        });
        console.log(fileList);
        console.log(fileList);
        console.log(fileList);
        ws.send(JSON.stringify({ command: "Here", content: fileList }));
    };
    MessageProcessor.processMessage = function (ws, message) {
        console.log("process message : " + message);
        var json = JSON.parse(message);
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
    };
    return MessageProcessor;
}());
exports.MessageProcessor = MessageProcessor;
