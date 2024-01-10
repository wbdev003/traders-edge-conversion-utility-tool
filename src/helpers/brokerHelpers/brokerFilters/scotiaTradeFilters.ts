import { mapToProperFormat } from "../brokerhelpers";
/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */

export function scotiaTradeFilter(data: any): Array<Array<string>> {
  // Implementation for TD filtering
  const final: Array<Array<string>> = [];
  let accountNum = data[1][1].split(" - ")[1];

  for (let i = 4; i < data.length; i++) {
    let temp = [];
    let date, month, day, year;

    for (let j = 0; j < data[i].length; j++) {
      // looks through every column by index and changes it based on requirementsif (j === 3) {
      if (j === 3) {
        if (data[i][j] === "SELL") {
          temp.push("Sell");
          temp.push(data[i][j]);
        } else if (data[i][j] === "BUY") {
          temp.push("Buy");
          temp.push(data[i][j]);
        } else {
          temp.push("Unallocated");
          temp.push(data[i][j]);
        }
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
      } else if (j === 0 || j === 1) {
        date = new Date(data[i][j]);
        month = (date.getMonth() + 1).toString().padStart(2, "0");
        day = date.getDate().toString().padStart(2, "0");
        year = date.getFullYear();

        temp.push(`${month}/${day}/${year}`);
      } else if (j === 4) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 5) {
        /* if (data[i][4] === 0) {
            temp.push(0);
          } else {
            const pricePerQuantity = Math.abs(data[i][5]) / Math.abs(data[i][4]);
            temp.push(pricePerQuantity.toFixed(8));
          } */
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
      } else if (j === 9) {
        temp.push(data[i][j]);
      } else {
        temp.push(data[i][j]);
      }
    }
    temp.push(accountNum);
    temp.push("");
    temp.push("");
  }

  return mapToProperFormat(final, {
    9: 0,
    0: 1,
    1: 2,
    11: 3,
    10: 4,
    12: 5,
    3: 6,
    4: 7,
    5: 8,
    6: 9,
    8: 1,
  });
}
