"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageProcessor = void 0;
var status_1 = require("./status");
var CSVoperator_1 = require("./CSVoperator");
//import Path from 'path'
var root = './Images/';
var fs = require('fs');
var path = require('path');
var imageToBase64 = require('image-to-base64');
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
    MessageProcessor.GetDirContent = function (ws, json) {
        /*
        fs.readdir(testFolder, (err, files) => {
            files.forEach(file => {
              fileList.push(file as string);
              //console.log(fileList);
              console.log(file);
            });
        });
        */
        var fileList = [];
        var dir = json['directory'];
        fs.readdirSync(root + dir).forEach(function (file) {
            //console.log(file);
            fileList.push(file);
        });
        console.log(fileList);
        ws.send(JSON.stringify({ command: "Here", content: fileList }));
    };
    MessageProcessor.ChangeDirectory = function (ws, json) {
        console.log("ok2");
        var fileList = [];
        var dir = json['directory'];
        console.log("ok3");
        //try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
        fs.readdirSync(root + dir).forEach(function (file) {
            fileList.push(file);
        });
        console.log(fileList);
        ws.send(JSON.stringify({ command: "ChangeDirectory", content: fileList }));
    };
    MessageProcessor.Delete = function (ws, json) {
        var fileList = [];
        var dir = json['directory'];
        //only delete files
        //try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
        fs.unlinkSync(root + dir);
        ws.send(JSON.stringify({ command: "deleted" }));
    };
    MessageProcessor.Create = function (ws, json) {
        var fileList = [];
        var type = json['type'];
        var dir = json['directory'];
        //try catch for directory checking  	Error: ENOENT: no such file or directory, scandir './Images/Test/'
        //fs.unlinkSync(root+dir)
        if (type == "File") {
            fs.open(root + dir, 'w', function (err, file) {
                if (err)
                    throw err;
                console.log('Saved!');
                ws.send(JSON.stringify({ command: "created_file" }));
            });
        }
        else if (type == "Directory") {
            if (!fs.existsSync(root + dir)) {
                fs.mkdirSync(root + dir);
                ws.send(JSON.stringify({ command: "created_directory" }));
            }
        }
    };
    MessageProcessor.GetContent = function (ws, json) {
        var fileList = [];
        var dir = json['directory'];
        fs.readdirSync(root + dir).forEach(function (file) {
            var fileSpecs = { name: "", base64encode: "", type: "" };
            console.log(root + dir);
            console.log(file);
            var type = "";
            var file64 = "";
            if (fs.lstatSync(root + dir + file).isDirectory()) {
                type = "Directory";
            }
            else {
                file64 = fs.readFileSync(root + dir + file, { encoding: 'base64' });
                type = "File";
            }
            var filename = path.basename(root + dir + file);
            fileSpecs.name = filename;
            fileSpecs.base64encode = file64;
            fileSpecs.type = type;
            //console.log(file);
            fileList.push(fileSpecs);
        });
        console.log(fileList);
        ws.send(JSON.stringify({ command: "GetContent", content: fileList }));
    };
    //or
    //import imageToBase64 from 'image-to-base64/browser';
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
            case 'Delete':
                MessageProcessor.Delete(ws, json);
                break;
            case 'Create':
                MessageProcessor.Create(ws, json);
                break;
            case 'GetDirContent':
                MessageProcessor.GetDirContent(ws, json);
                break;
            case 'ChangeDirectory':
                MessageProcessor.ChangeDirectory(ws, json);
                break;
            case 'GetContent':
                MessageProcessor.GetContent(ws, json);
                break;
            case 'GetImages':
                CSVoperator_1.CSVoperator.ImportFromCSV(ws, json);
                break;
            default:
                console.log("unknown command.");
        }
    };
    return MessageProcessor;
}());
exports.MessageProcessor = MessageProcessor;
