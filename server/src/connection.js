"use strict";
exports.__esModule = true;
exports.Connection = void 0;
var Connection = /** @class */ (function () {
    function Connection(userId, ws) {
        this._userId = userId;
        this._ws = ws;
    }
    Object.defineProperty(Connection.prototype, "userId", {
        get: function () {
            return this._userId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Connection.prototype, "ws", {
        get: function () {
            return this._ws;
        },
        enumerable: false,
        configurable: true
    });
    return Connection;
}());
exports.Connection = Connection;
