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
      if (j === 10) {
        temp.push(`${Math.trunc(data[i][j])}`);
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
    // both are zero indexed
    0: 0, // account #
    1: 1, // trade date
    2: 2, // settlement date
    5: 3, //symbol
    24: 4, // exchange
    224: 5, // security name
    25: 6, // ty type
    47: 7, // broker type
    11: 8, //#units
    12: 9, // #price unit
    14: 10, // amount
  });
}
