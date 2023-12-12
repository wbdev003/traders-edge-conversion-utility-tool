import { mapToProperFormat } from "../brokerhelpers";

/**
 * Filters data for Questrade type.
 * @param {any} data - Data array to filter.
 * @returns {Array<Array<string>>} - Array of filtered data if successful, an empty array otherwise.
 */
export function questTradeFilter(data: any): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  for (let i = 1; i < data.length; i++) {
    const temp: Array<string> = [];

    for (let j = 0; j < data[i].length; j++) {
      // Looks through every column by index and changes it based on requirements
      if (j === 2) {
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
        const name = data[i][4].split("COM")[0];
        console.log(name);
        temp.push(name);
      } else if (j === 3) {
        const symbol = data[i][j].split(".");
        temp.push(symbol[0]);
        if (symbol[1] === "TO") {
          temp.push("TSX");
        } else if (symbol[1] === "VN") {
          temp.push("TSXV");
        } else {
          temp.push("other");
        }
      } else if (j === 0 || j === 1) {
        const myDate = data[i][j];
        const newDate = myDate.split(" ")[0];
        temp.push(newDate);
      } else if (j === 9) {
        temp.push(String(Math.abs(data[i][9])));
      } else if (j === 5) {
        temp.push(String(Math.abs(data[i][j])));
      } else if (j === 6) {
        temp.push((Math.abs(data[i][9]) / Math.abs(data[i][5])).toFixed(4));
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
