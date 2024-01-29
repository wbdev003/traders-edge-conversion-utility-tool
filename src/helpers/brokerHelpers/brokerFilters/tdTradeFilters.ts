import { mapToProperFormat } from "../brokerhelpers";

/**
 * Filters data for TD type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */
export function tdTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];
  let lastCharInAccount = data[1][1]
    .split(" ")[4]
    .charAt(data[1][1].split(" ")[4].length - 1);
  let accountNum = data[1][1].split(" - ")[1];

  for (let i = 4; i < data.length; i++) {
    let startDate = data[i][0]; // Start date is at index 0
    let endDate = data[i][1]; // End date is at index 1
    let temp = [];
    for (let j = 0; j < data[i].length; j++) {
      if (j === 0) {
        temp.push(accountNum);
      } else if (j === 1) {
        temp.push(startDate);
      } else if (j === 2) {
        temp.push(endDate);
      } else if (j === 3) {
        if (data[i][j] === "SELL") {
          temp.push("Sell");
          temp.push(data[i][j]);
        } else if (data[i][j] === "BUY") {
          temp.push("Buy");
          temp.push(data[i][j]);
        } else {
          temp.push("unallocated");
          temp.push(data[i][j]);
        }
      } else if (j === 4) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 5) {
        if (data[i][4] === 0) {
          temp.push(0);
        } else {
          const pricePerQuantity = Math.abs(data[i][5]);
          temp.push(pricePerQuantity.toFixed(2));
        }
      } else if (j === 6) {
        temp.push(data[i][j] ? parseInt(data[i][j]) : 0);
      } else if (j === 7) {
        temp.push(Math.abs(data[i][j]));
      } else {
        temp.push(data[i][j]);
      }
    }

    temp.push("");
    temp.push("");
    if (data[i][0]) {
      console.log(temp);
      temp.push(filterDescriptionTD(data[i][2]));
      final.push(temp);
    }
  }

  return mapToProperFormat(final, {
    0: 0, // Account #
    1: 1, // Trade Date
    2: 2, // Settlement Date
    3: 3, // Symbol
    4: 4, // Exchange
    5: 5, // Security Name
    6: 6, // TE Type
    7: 7, // Broker Type
    8: 8, // #units
    9: 9, // $price/unit
    10: 10, // Amount
  });
}

/**
 * Filters and extracts the non-numeric part of a given string.
 * @param {string} data - The input string to filter.
 * @returns {string} - The non-numeric part of the input string.
 */
function filterDescriptionTD(data: string): string {
  /**
   * Splits the input string by spaces.
   * @type {string[]}
   */
  const all: string[] = data.split(" ");

  /**
   * Accumulator variable for the final non-numeric data.
   * @type {string}
   */
  let finalData: string = "";

  for (let i = 0; i < all.length; i++) {
    /**
     * Checks if the current element contains a digit.
     * @type {boolean}
     */
    if (/\d/.test(all[i])) {
      break;
    } else {
      finalData = finalData + " " + all[i];
    }
  }

  // Removes leading and trailing whitespaces and returns the final data.
  return finalData.trim();
}
