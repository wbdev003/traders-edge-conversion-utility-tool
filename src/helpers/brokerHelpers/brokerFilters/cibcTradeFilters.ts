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

export function cibcTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];
  const accountNumber = data[0][0];
  // Implementation for Scotia filtering
  for (let i = 10; i < data.length; i++) {
    const temp: Array<string> = [];
    const market = data[i][5];
    console.log(market);
    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 0) {
        temp.push(accountNumber);
      } else if (j === 2) {
        temp.push(data[i][1]);
      } else if (j === 3) {
        temp.push(mapTransactionType(data[i][j]));
      } else if (j === 4) {
        if (!data[i][j]) {
          temp.push(`n/a`);
        } else {
          temp.push(data[i][j]);
        }
      } else if (j === 7) {
        temp.push(String(Math.abs(data[i][j])));
      } else if (j === 10) {
        temp.push(data[i][j]); // exchange index
      } else if (j === 11) {
        let calc = data[i][13] / data[i][10];
        temp.push(String(Math.abs(calc)));
      } else if (j === 13) {
        temp.push(String(Math.abs(data[i][j])));
      } else if (j === 14) {
        temp.push(data[i][3]);
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      const exchangeIndex = 10;

      if (market === "USA") {
        temp[exchangeIndex] = mapToStockExchange("US");
      } else if (market === "CDN") {
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
    0: 0, //account #
    1: 1, // trade date
    2: 2, // settlement date
    4: 3, // symbol
    10: 4, // exchange
    6: 5, // security name
    3: 6, // te type
    14: 7, // broker type
    7: 8, //#units
    9: 9, // #price unit
    13: 10, // amount
  });
}
