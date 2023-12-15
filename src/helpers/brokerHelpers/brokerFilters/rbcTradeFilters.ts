import { mapToProperFormat } from "../brokerhelpers";
/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */ export function rbcTradeFilter(data: any[]): Array<Array<string>> {
  let dataReal: any[] = [];

  for (let i = 9; i < data.length; i++) {
    let trueValue: string = "";
    let stopAt: number = 0;
    let charCount: number = 0;
    let temp: any[] = [];

    for (let j = 8; j < data[i].length; j++) {
      if (data[i][j] === "USD" || data[i][j] === "USD") {
        stopAt = j;
        break;
      } else {
        trueValue += data[i][j];
        charCount++;
        console.log(trueValue);
      }
    }

    for (let j = 0; j < stopAt - charCount; j++) {
      temp.push(data[i][j]);
    }

    temp.push(parseFloat(trueValue.replace(/,/g, "")));

    for (let j = stopAt; j < stopAt + 2; j++) {
      temp.push(data[i][j]);
    }

    if (data[i][0]) {
      dataReal.push(temp);
    }
  }

  data = dataReal;
  console.log(data.length);

  let final: any[] = [];
  console.log("ready");

  for (let i = 0; i < data.length; i++) {
    let temp: any[] = [];
    console.log("here2");

    for (let j = 0; j < data[i].length; j++) {
      console.log("in");

      if (j === 0) {
        let date: Date = new Date(data[i][j]);
        let month: string | number = date.getMonth() + 1;
        let day: string | number = date.getDate();
        let year: number = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        temp.push(`${month}/${day}/${year}`);
      } else if (j === 1) {
        if (data[i][j] === "Sell") {
          temp.push("SELL");
          temp.push(data[i][j]);
        } else if (data[i][j] === "Buy") {
          temp.push("BUY");
          temp.push(data[i][j]);
        } else {
          temp.push("unallocated");
          temp.push(data[i][j]);
        }
      } else if (j === 4) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 5) {
        const numerator = Math.abs(parseFloat(data[i][5]));
        const denominator = Math.abs(parseFloat(data[i][4]));
        if (data[i][4] && data[i][5]) {
          /* console.log("123", data[i][8], data[i][4]); */
          if (!isNaN(numerator) && !isNaN(denominator) && denominator !== 0) {
            temp.push((numerator / denominator).toFixed(4));
          } else {
            // Handle the case where division is not possible (e.g., denominator is 0)
            temp.push("N/A");
          }
        } else {
          // Handle the case where either data[i][4] or data[i][8] is undefined or falsy
          temp.push("N/A");
        }
      } else if (j === 6) {
        let date: Date = new Date(data[i][j]);
        let month: string | number = date.getMonth() + 1;
        let day: string | number = date.getDate();
        let year: number = date.getFullYear();

        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;

        temp.push(`${month}/${day}/${year}`);
      } else if (j === 7) {
        temp.push(data[i][j] + data[i][9]);
      } else if (j === 8) {
        temp.push(Math.abs(data[i][j]));
      } else {
        temp.push(data[i][j]);
      }
    }

    temp.push("");
    temp.push(data[i][3]);
    final.push(temp);
  }

  console.log(final);
  return mapToProperFormat(final, {
    8: 0,
    0: 1,
    7: 2,
    3: 3,
    12: 4,
    13: 5,
    1: 6,
    2: 7,
    5: 8,
    6: 9,
    4: 10,
  });
}
