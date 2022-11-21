"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = void 0;
const connection_1 = require("./connection");
class Status {
    constructor() {
        this.listOfConnections = [];
    }
    plotConnectionlist() {
        console.log("Connections:");
        console.log(this.listOfConnections);
        console.log("-------------------");
    }
    static get instance() {
        if (this._instance === null)
            this._instance = new Status();
        return this._instance;
    }
    get connections() {
        return this.listOfConnections;
    }
    addConnection(ws, json) {
        if (!this.listOfConnections.find(oneConnection => oneConnection.ws == ws)) {
            this.listOfConnections.push(new connection_1.Connection(json['user'], ws));
            this.plotConnectionlist();
        }
    }
    closeConnection(ws) {
        let closeIdx = this.listOfConnections.findIndex(oneConnection => oneConnection.ws == ws);
        if (closeIdx > -1) {
            this.listOfConnections.splice(closeIdx, 1);
            this.plotConnectionlist();
        }
    }
    findConnection(ws) {
        return this.listOfConnections.find(oneConnection => oneConnection.ws == ws);
    }
}
exports.Status = Status;
Status._instance = null;
