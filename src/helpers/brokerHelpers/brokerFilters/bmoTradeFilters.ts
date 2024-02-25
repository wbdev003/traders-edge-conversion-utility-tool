import { mapToProperFormat } from "../brokerhelpers";
import {
  mapToStockExchange,
  mapTransactionType,
} from "@/helpers/stockHelpers/stockHelpers";

/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */

export function bmoTradeFiter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];
  // Implementation for Scotia filtering
  for (let i = 2; i < data.length; i++) {
    const temp: Array<string> = [];

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 0) {
        temp.push(data[i][j]);
      } else if (j === 6) {
        temp.push(data[i][2]);
      } else if (j === 7) {
        temp.push(String(Math.abs(data[i][7])));
      } else if (j === 9) {
        temp.push(String(Math.abs(data[i][9])));
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      temp.push(data[i][4].split(" COM ")[0]);
      final.push(temp);
    }
  } // Converts all of the important columns into proper format
  // left is representing the array csv - zero indexed
  // right is representing the position in the table - zero indexed
  return mapToProperFormat(final, {
    20: 0, //account #
    0: 1, // trade date
    1: 2, // settlement date
    4: 3, // symbol
    210: 4, // exchange
    3: 5, // security name
    6: 6, // te type
    2: 7, // broker type
    5: 8, //#units
    7: 9, // #price unit
    9: 10, // amount
  });
}
