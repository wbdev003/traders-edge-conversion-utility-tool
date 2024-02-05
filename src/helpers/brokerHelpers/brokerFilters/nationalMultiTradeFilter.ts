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

export function nationalMultiTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Implementation for Scotia filtering
  for (let i = 1; i < data.length; i++) {
    const temp: Array<string> = [];
    let market = data[i][5];
    console.log(market);
    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements

      if (j === 5) {
        temp.push(data[i][j]);
      } else if (j === 6) {
        if (!data[i][j]) {
          temp.push("n/a");
        } else {
          temp.push(data[i][j]);
        }
      } else if (j === 7) {
        // Security name
        temp.push(data[i][j]);
      } else if (j === 8) {
        temp.push(mapTransactionType(data[i][j]));
      } else if (j === 9) {
        temp.push(data[i][8]);
      } else if (j === 10) {
        temp.push(`${Math.abs(+(data[i][12] / data[i][11]).toFixed(2))}`);
      } else if (j === 11) {
        temp.push(`${Math.abs(data[i][9])}`);
      } else if (j === 12) {
        temp.push(data[i][9]);
      } else if (j === 13) {
        temp.push(data[i][j]);
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      const exchangeIndex = 13;

      if (market === "USA") {
        temp[exchangeIndex] = mapToStockExchange("US");
      } else if (market === "CAN") {
        temp[exchangeIndex] = mapToStockExchange("TO");
      } else {
        temp[exchangeIndex] = mapToStockExchange(market);
      }

      temp.push(data[i][4].split(" COM ")[0]);
      final.push(temp);
    }
  } // Converts all of the important columns into proper format
  // left is representing the array csv - non-zero indexed
  // right is representing the position in the table - zero indexed
  return mapToProperFormat(final, {
    0: 0, // account number
    2: 1, // trade date
    3: 2, // settlement date
    6: 3, // symbol
    13: 4, // exchange
    7: 5, // security name
    8: 6, // te type
    9: 7, // broker type
    12: 8, //#units
    10: 9, // #price unit
    11: 10, // amount
  });
}
