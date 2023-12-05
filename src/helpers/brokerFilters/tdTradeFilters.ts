import { mapToProperFormat } from "../helpers";

/**
 * Filters data for TD type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */
export function tdTradeFilter(data: any): Array<Array<string>> {
  // Implementation for TD filtering
  const final: Array<Array<string>> = [];
  let lastCharInAccount = data[1][1]
    .split(" ")[4]
    .charAt(data[1][1].split(" ")[4].length - 1);
  let accountNum = data[1][1].split(" - ")[1];

  for (let i = 4; i < data.length; i++) {
    let temp = [];
    let date, month, day, year;

    for (let j = 0; j < data[i].length; j++) {
      // looks through every column by index and changes it based on requirements
      if (j === 3) {
        if (data[i][j] === "SELL") {
          temp.push("sell");
          temp.push(data[i][j]);
        } else if (data[i][j] === "BUY") {
          temp.push("buy");
          temp.push(data[i][j]);
        } else {
          temp.push("unallocated");
          temp.push(data[i][j]);
        }
      } else if (j === 0 || j === 1) {
        date = new Date(data[i][j]);
        month = (date.getMonth() + 1).toString().padStart(2, "0");
        day = date.getDate().toString().padStart(2, "0");
        year = date.getFullYear();

        temp.push(`${month}/${day}/${year}`);
      } else if (j === 4) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 5) {
        if (data[i][4] === 0) {
          temp.push(0);
        } else {
          temp.push((Math.abs(data[i][7]) / Math.abs(data[i][4])).toFixed(4));
        }
      } else if (j === 6) {
        temp.push(data[i][j] ? parseInt(data[i][j]) : 0);
      } else if (j === 7) {
        temp.push(Math.abs(data[i][j]));
      } else {
        temp.push(data[i][j]);
      }
    }
    temp.push(accountNum);
    temp.push("");
    temp.push("");
    if (data[i][0]) {
      console.log(temp);
      temp.push(filterDescriptionTD(data[i][2]));
      final.push(temp);
    }
  }

  return mapToProperFormat(final, {
    9: 0,
    0: 1,
    1: 2,
    11: 3,
    10: 4,
    12: 5,
    4: 6,
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
