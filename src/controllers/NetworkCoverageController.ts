import { Request, Response } from 'express';
import * as ValidationHelper from '../helpers/ValidationHelper';
import { CoverageResponse, Orange, Free, Bouygue, SFR } from '../dto/coverageResponse';
const AddressService = require('../services/AddressService');
const path = require('path');
var fs = require("fs");

//Initiate and create a map, keys are the codes in the json file which returns the operator name as a value
const operateurMap = new Map<number, string>();
operateurMap.set(20801, 'Orange');
operateurMap.set(20810, 'SFR');
operateurMap.set(20815, 'Free');
operateurMap.set(20820, 'Bouygue');

export class NetworkCoverageController {
  async getNetworkCoverage(req: Request, res: Response) {
    const address: string = (typeof req.query.q === 'string') ? req.query.q : "";
    //validate the address
    const validInput: ValidationHelper.ValidateInputsResponse = ValidationHelper.validateInputs(address);
    if (validInput.validCode == 500 || validInput.validCode == 400) {
      res.status(validInput.validCode).send({ errorMessage: validInput.errorMessage, description: validInput.errorDescription });
      return;
    }
    //call getAddress Service
    await AddressService.getAddress({
      address: address
    }).then((response: any) => {
      //parse the returned object
      var addressObj = JSON.parse(response);
      //check if the service found the address
      if (addressObj.features.length > 0) {
        //get Lambert 93 coordinates from api response x & y
        var x = Math.trunc(addressObj.features[0].properties.x);
        var y = Math.trunc(addressObj.features[0].properties.y);
        //read the json file that contains the networks coverage data per Lambert 93 coordinates 
        let rawdata = fs.readFileSync(path.resolve(__dirname, '../assets/csvjson.json'));
        //parse the json file content
        let data = JSON.parse(rawdata);
        //search for input address's coordinates in the json file
        let result = data.filter((it: { X: number, Y: number; }) => it.X === x && it.Y === y);
        //initiate response object
        let coverageResponse = {} as CoverageResponse;
        //check if the coordinates found in the json file
        if (result.length > 0) {
          //fetch the resulted rows from the json file
          result.forEach((element: any) => {
            //create the correspondent object for each operator if exists for the input address
            switch (operateurMap.get(element.Operateur)) {
              case 'Orange': {
                let orange: Orange = { _2G: !!element.SecondG, _3G: !!element.ThirdG, _4G: !!element.FourthG };
                coverageResponse.orange = orange;
                break;
              }
              case 'SFR': {
                let sfr: SFR = { _2G: !!element.SecondG, _3G: !!element.ThirdG, _4G: !!element.FourthG };
                coverageResponse.sfr = sfr;
                break;
              }
              case 'Free': {
                let free: Free = { _2G: !!element.SecondG, _3G: !!element.ThirdG, _4G: !!element.FourthG };
                coverageResponse.free = free;
                break;
              }
              case 'Bouygue': {
                let bouygue: Bouygue = { _2G: !!element.SecondG, _3G: !!element.ThirdG, _4G: !!element.FourthG };
                coverageResponse.bouygue = bouygue;
                break;
              }
              default: {
                break;
              }
            }
          });
          //return response when input address found and exit
          res.status(200).send({ successMsg: true, coverageResponse });
          return;
        }
      }
      //return response when input address is not found and exit
      res.status(200).send({ successMsg: true, response: 'data for `' + address + '` is not found!' });
      return;
    }).catch((err: any) => {
      res.status(err.statusCode || 503).send(err.message);
      return;
    })
  }
}
