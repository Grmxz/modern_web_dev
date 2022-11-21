"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const messageprocessor_1 = require("./messageprocessor");
const status_1 = require("./status");
const port = 12345;
const server = new ws_1.WebSocketServer({ port });
server.on("connection", websocket => {
    console.log("connection opened.");
    websocket.on("message", data => {
        messageprocessor_1.MessageProcessor.processMessage(websocket, data.toString());
    });
    websocket.on("close", data => {
        status_1.Status.instance.closeConnection(websocket);
    });
    websocket.on("error", (websocket, error) => {
        console.log("connection error : " + error.toString());
    });
});
console.log("Server running...");
