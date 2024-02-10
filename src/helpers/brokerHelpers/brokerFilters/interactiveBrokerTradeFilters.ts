import { mapToProperFormat } from "../brokerhelpers";

/**
 * Filters data for Questrade type.
 * @param {any} data - Data array to filter.
 * @returns {Array<Array<string>>} - Array of filtered data if successful, an empty array otherwise.
 */
export function ibkrTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  for (let i = 1; i < data.length; i++) {
    const temp: Array<string> = [];

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 1) {
      } else {
        temp.push(data[i][j].replace(/(\r\n|\n|\r)/gm, ""));
      }
    }

    if (data[i][0]) {
      temp.push(data[i][4].split(" COM ")[0]);
      final.push(temp);
    }
  } // Converts all of the important columns into proper format
  return mapToProperFormat(final, {
    13: 0,
    0: 1,
    1: 2,
    4: 3,
    5: 4,
    16: 5,
    3: 6,
    2: 7,
    7: 8,
    8: 9,
    11: 10,
  });
}
