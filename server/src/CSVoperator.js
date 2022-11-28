"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CSVoperator = void 0;
var fs = require("fs");
var path = require("path");
var csv_parse_1 = require("csv-parse");
var csvFilePath = path.resolve(__dirname, 'Images/datacsv.csv');
var headers = ['name', 'latitude', 'longitude', 'device', 'size', 'base64encode'];
var CSVoperator = /** @class */ (function () {
    function CSVoperator() {
    }
    CSVoperator.ImportFromCSV = function (ws, json) {
        var fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });
        (0, csv_parse_1.parse)(fileContent, {
            delimiter: ';',
            columns: headers,
            fromLine: 2,
        }, function (error, result) {
            if (error) {
                console.error(error);
            }
            //console.log("Result", result);
            ws.send(JSON.stringify({ command: "Image_csv", content: result }));
        });
    };
    CSVoperator.StoreToCSV = function (Metadata) {
        fs.appendFile(csvFilePath, Metadata, function (err) {
            if (err) {
                console.log(err);
            }
        });
    };
    return CSVoperator;
}());
exports.CSVoperator = CSVoperator;
