import { mapToProperFormat } from "../brokerhelpers";
/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */

export function cibcTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Implementation for Scotia filtering
  for (let i = 10; i < data.length; i++) {
    const accountNumber = data[0][0];
    const temp: Array<string> = [];

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements

      if (j === 0) {
        temp.push(accountNumber);
      } else if (j === 2) {
        temp.push(data[i][1]);
      } else if (j === 4) {
        temp.push(data[i][3]);
      } else if (j === 11) {
        let calc = data[i][13] / data[i][10];
        console.log(data[i][10]);
        temp.push(String(Math.abs(calc)));
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
    0: 0, //account #
    1: 1, // trade date
    2: 2, // settlement date
    5: 3, // symbol
    24: 4, // exchange
    6: 5, // security name
    3: 6, // te type
    4: 7, // broker type
    7: 8, //#units
    9: 9, // #price unit
    13: 10, // amount
  });
}
