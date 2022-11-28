"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ws_1 = require("ws");
var messageprocessor_1 = require("./messageprocessor");
var status_1 = require("./status");
var port = 12345;
var server = new ws_1.WebSocketServer({ port: port });
server.on("connection", function (websocket) {
    console.log("connection opened.");
    websocket.on("message", function (data) {
        messageprocessor_1.MessageProcessor.processMessage(websocket, data.toString());
    });
    websocket.on("close", function (data) {
        status_1.Status.instance.closeConnection(websocket);
    });
    websocket.on("error", function (websocket, error) {
        console.log("connection error : " + error.toString());
    });
});
console.log("Server running...");
