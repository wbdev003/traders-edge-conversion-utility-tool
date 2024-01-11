import { mapToProperFormat } from "../brokerhelpers";
/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */

export function scotiaTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Implementation for Scotia filtering
  for (let i = 1; i < data.length; i++) {
    const temp: Array<string> = [];

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      /* if (j === 2) {
        if (data[i][j] === "Buy") {
          temp.push("BUY");
          temp.push(data[i][j]);
        } else if (data[i][j] === "Sell") {
          temp.push("SELL");
          temp.push(data[i][j]);
        } else {
          temp.push("unallocated");
          temp.push(data[i][j]);
        }
      } else if (j === 11) {
        temp.push(data[i][j] + data[i][10]);
      } else if (j === 4) {
        const name = data[i][2].split("COM")[0];
        console.log(name);
        temp.push(name);
      } else if (j === 3) {
        const symbol = data[i][j];
        temp.push(symbol[0]);
        if (symbol[1] === "TO") {
          temp.push("TSX");
        } else if (symbol[1] === "VN") {
          temp.push("TSXV");
        } else {
          temp.push("other");
        }
      } else if (j === 0 || j === 1) {
        const entry = data[i][j];
        temp.push(entry);
      } else if (j === 9) {
        temp.push(String(Math.abs(data[i][9])));
      } else if (j === 5) {
        temp.push(String(Math.abs(data[i][j])));
      } else if (j === 6) {
        temp.push((Math.abs(data[i][9]) / Math.abs(data[i][5])).toFixed(4));
      } else {
        temp.push(data[i][j]);
      } */
      if (j === 5) {
        temp.push(data[i][j]);
      } else if (j === 6) {
        temp.push(data[i][5]);
      } else if (j === 9) {
        temp.push(String(Math.abs(data[i][9])));
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
    13: 0,
    2: 1,
    3: 2,
    1: 3,
    14: 4,
    0: 5,
    5: 6,
    6: 7,
    7: 8,
    9: 9,
    10: 10,
  });
}
