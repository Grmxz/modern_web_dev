"use strict";
exports.__esModule = true;
exports.Status = void 0;
var connection_1 = require("./connection");
var Status = /** @class */ (function () {
    function Status() {
        this.listOfConnections = [];
    }
    Status.prototype.plotConnectionlist = function () {
        console.log("Connections:");
        console.log(this.listOfConnections);
        console.log("-------------------");
    };
    Object.defineProperty(Status, "instance", {
        get: function () {
            if (this._instance === null)
                this._instance = new Status();
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Status.prototype, "connections", {
        get: function () {
            return this.listOfConnections;
        },
        enumerable: false,
        configurable: true
    });
    Status.prototype.addConnection = function (ws, json) {
        if (!this.listOfConnections.find(function (oneConnection) { return oneConnection.ws == ws; })) {
            this.listOfConnections.push(new connection_1.Connection(json['user'], ws));
            this.plotConnectionlist();
        }
    };
    Status.prototype.closeConnection = function (ws) {
        var closeIdx = this.listOfConnections.findIndex(function (oneConnection) { return oneConnection.ws == ws; });
        if (closeIdx > -1) {
            this.listOfConnections.splice(closeIdx, 1);
            this.plotConnectionlist();
        }
    };
    Status.prototype.findConnection = function (ws) {
        return this.listOfConnections.find(function (oneConnection) { return oneConnection.ws == ws; });
    };
    Status._instance = null;
    return Status;
}());
exports.Status = Status;
