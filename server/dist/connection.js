"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Connection = void 0;
class Connection {
    constructor(userId, ws) {
        this._userId = userId;
        this._ws = ws;
    }
    get userId() {
        return this._userId;
    }
    get ws() {
        return this._ws;
    }
}
exports.Connection = Connection;
