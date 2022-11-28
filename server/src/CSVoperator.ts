import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse';
import {WebSocket} from "ws";
import { MessageProcessor } from "./messageprocessor";

const csvFilePath = path.resolve(__dirname, 'Images/datacsv.csv');

const headers = ['name', 'latitude', 'longitude', 'device', 'size', 'base64encode'];



type Images = {
  name: string;
  latitude: string;
  longitude: string;
  device: string;
  size: string;
  base64encode: string;
};

export class CSVoperator{

  public static ImportFromCSV ( ws: WebSocket , json: any ){
    
    const fileContent = fs.readFileSync(csvFilePath, { encoding: 'utf-8' });

    parse(fileContent, {
      delimiter: ';',
      columns: headers,
      fromLine: 2,
    }, (error, result: Images[]) => {
      if (error) {
        console.error(error);
      }

      //console.log("Result", result);
      ws.send( JSON.stringify( { command: "Image_csv" , content: result} ) );
    });
  }

  public static StoreToCSV (Metadata:string){
    fs.appendFile(csvFilePath, Metadata, (err) => {
      if (err) {
        console.log(err);
      }
    })
  }

}