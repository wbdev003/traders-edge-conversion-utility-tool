import { mapToProperFormat } from "../brokerhelpers";
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

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements

      if (j === 5) {
        temp.push(data[i][j]);
      } else if (j === 7) {
        temp.push(data[i][6]);
      } else if (j === 11) {
        let calc = data[i][13] / data[i][10];
        console.log(data[i][10]);
        temp.push(String(Math.abs(calc)));
      } else if (j === 3) {
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
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      temp.push(data[i][4].split(" COM ")[0]);
      final.push(temp);
    }
  } // Converts all of the important columns into proper format
  // left is representing the array csv - non-zero indexed
  // right is representing the position in the table - zero indexed
  return mapToProperFormat(final, {
    0: 0,
    1: 1,
    2: 2,
    6: 3,
    24: 4, // idk
    4: 5, // security name
    5: 6, // ty type
    47: 7, // broker type
    11: 8, //#units
    12: 9, // #price unit
    14: 10, // amount
  });
}
