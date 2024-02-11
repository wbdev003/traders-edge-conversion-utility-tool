import { mapToProperFormat } from "../brokerhelpers";
import {
  mapToStockExchange,
  determineAction,
} from "@/helpers/stockHelpers/stockHelpers";
/**
 * Filters data for Questrade type.
 * @param {any} data - Data array to filter.
 * @returns {Array<Array<string>>} - Array of filtered data if successful, an empty array otherwise.
 */
export function ibkrTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];
  const accountNumber = data[8][3]; // Extract Acount Number
  let tradesIndex = 0;

  // Finding where the Trades appear in CSV and assigning index to relavent position
  for (let i = 0; i < data.length; i++) {
    if (data[i][0] === "Trades") {
      tradesIndex = i + 1; // adding one to account for header
      break;
    }
  }

  for (let i = tradesIndex; i < data.length; i++) {
    if (data[i][0] === "Trades" && data[i][1] === "Data") {
      const temp: Array<string> = [];
      let symbol = data[i][5];

      for (let j = 4; j < data[i].length; j++) {
        // Looks through every column by index and changes it based on requirements
        console.log(data[i][0], data[i][1]);
        if (j === 4) {
          temp.push(accountNumber);
        } else if (j === 7) {
          temp.push(`${Math.abs(data[i][j])}`);
        } else if (j === 8) {
          temp.push(data[i][4]);
        } else if (j === 9) {
          temp.push(`${Math.abs(data[i][j])}`);
        } else if (j === 11) {
          // #units
          temp.push(`${Math.abs(data[i][j])}`);
        } else if (j === 12) {
          temp.push(`${Math.abs(data[i][j])}`);
        } else if (j === 13) {
          temp.push(`${Math.abs(data[i][j])}`);
        } else if (j === 14) {
          // settlement date
          temp.push(data[i][6]);
        } else if (j === 16) {
          // settlement date

          temp.push(determineAction(data[i][15]));
        } else {
          temp.push(data[i][j]);
        }
      }

      if (data[i][0]) {
        temp.push(data[i][4].split(" COM ")[0]);
        final.push(temp);

        const securityIndex = 6;
        const exchangeIndex = 5;
        const priceUnitIndex = 9;
        for (let n = 164; n < data.length; n++) {
          if (data[n][3] === symbol) {
            temp[securityIndex] = data[n][4];
            temp[exchangeIndex] = data[n][7];
          }
        }

        temp[priceUnitIndex] = `${Math.abs(data[i][11] / data[i][8]).toFixed(
          4
        )}`;
      }
    }
    /* */
  } // Converts all of the important columns into proper format
  return mapToProperFormat(final, {
    0: 0, // Account Number
    2: 1, // trade date
    10: 2, // settlement date - 14
    1: 3, // Symbol
    5: 4, // Exchange
    6: 5, // Security Name - 9
    12: 6, // TE Type
    11: 7, // Broker Type
    3: 8, // #units
    9: 9, // $price/unit
    8: 10, // Amount
  });
}
