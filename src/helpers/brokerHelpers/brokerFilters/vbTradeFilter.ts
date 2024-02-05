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

export function vbTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Implementation for Scotia filtering
  for (let i = 1; i < data.length; i++) {
    const temp: Array<string> = [];
    let market = data[i][9];
    console.log(market);

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 1) {
        temp.push(data[i][j]);
      } else if (j === 4) {
        temp.push(mapTransactionType(data[i][j]));
      } else if (j === 5) {
        let symbol = data[i][j];
        if (!symbol) {
          temp.push("n/a");
        } else {
          temp.push(symbol);
        }
      } else if (j === 9) {
        temp.push(data[i][4]);
      } else if (j === 10) {
        // # Units
        temp.push(`${Math.trunc(data[i][j])}`);
      } else if (j === 11) {
        // Extract and convert numerator from data array
        const numeratorConverted = parseFloat(data[i][13].replace(/[$,]/g, ""));

        // Extract denominator from data array
        const denominator = +data[i][10];

        // Check if denominator or numeratorConverted is zero to avoid division by zero
        const result =
          denominator === 0 || numeratorConverted === 0
            ? "0" // If either is zero, set result to "n/a"
            : String(
                Math.abs(Number((numeratorConverted / denominator).toFixed(2)))
              );

        // Push the result into the temp array
        temp.push(result);
      } else if (j === 13) {
        // Amount
        const numberConverted = Math.abs(
          parseFloat(data[i][j].replace(/[$,]/g, ""))
        );
        temp.push(String(numberConverted));
      } else if (j === 14) {
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      const exchangeIndex = 14;

      if (market === "USD") {
        temp[exchangeIndex] = mapToStockExchange("US");
      } else if (market === "CAD") {
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
    // both are zero indexed
    0: 0, // account #
    1: 1, // trade date
    2: 2, // settlement date
    5: 3, //symbol
    14: 4, // exchange
    3: 5, // security name
    4: 6, // te type
    9: 7, // broker type
    10: 8, //#units
    11: 9, // #price unit
    13: 10, // amount
  });
}
