import { mapToProperFormat } from "../brokerhelpers";

/**
 * Filters data for Questrade type.
 * @param {any} data - Data array to filter.
 * @returns {Array<Array<string>>} - Array of filtered data if successful, an empty array otherwise.
 */
export function ibkrTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Extract Acount Number
  const accountNumber = data[8][3];

  for (let i = 28; i < data.length; i++) {
    const temp: Array<string> = [];

    for (let j = 4; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 0) {
        temp.push(accountNumber);
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      temp.push(data[i][4].split(" COM ")[0]);
      final.push(temp);
    }
  } // Converts all of the important columns into proper format
  return mapToProperFormat(final, {
    0: 0, // Account Number
    1: 1,
    2: 2,
    4: 3,
    5: 4,
    16: 5,
    3: 6,
    42: 7,
    7: 8,
    8: 9,
    11: 10,
  });
}
