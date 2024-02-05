import { mapToProperFormat } from "../brokerhelpers";
import { fetchEODData } from "@/helpers/stockHelpers/stockHelpers";
import {
  mapToStockExchange,
  mapTransactionType,
} from "@/helpers/stockHelpers/stockHelpers";

/**
 * Filters data for RBC type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */ export async function rbcTradeFilter(
  data: any[]
): Promise<Array<Array<string>>> {
  let dataReal: any[] = [];
  let currency = data[9][9];

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
  let final: any[] = [];

  for (let i = 0; i < data.length; i++) {
    let temp: any[] = [];

    for (let j = 0; j < data[i].length; j++) {
      if (j === 0) {
        temp.push(data[i][j]);
      } else if (j === 1) {
        /* const mappedTransactionType = mapTransactionType(data[i][j]);
        temp.push(mappedTransactionType); */
        const mappedTransactionType = mapTransactionType(data[i][j]);
        temp.push(mappedTransactionType);
      } else if (j === 2) {
        temp.push(data[i][j]);
      } else if (j === 3) {
        temp.push(data[i][j]);
      } else if (j === 4) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 5) {
        const numerator = Math.abs(parseFloat(data[i][8]));
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
        temp.push(data[i][j]);
      } else if (j === 7) {
        temp.push(data[i][j] + data[i][9]);
      } else if (j === 8) {
        temp.push(Math.abs(data[i][j]));
      } else if (j === 10) {
        const mappedTransactionType = mapTransactionType(data[i][1]);
        temp.push(mappedTransactionType);
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      const symbolIndex = 2;
      const exchangeIndex = 13;
      const securityNameIndex = 3;
      const symbol = temp[symbolIndex];
      const securityName = temp[securityNameIndex]
        .split(" ")
        .slice(0, 1)
        .join(" ");
      const teType = temp[1];

      if (currency === "USD") {
        temp[exchangeIndex] = mapToStockExchange("US");
      } else if (currency === "CAN") {
        temp[exchangeIndex] = mapToStockExchange("TO");
      } else {
        try {
          if (securityName && (teType === "Buy" || teType === "Sell")) {
            const eodData = await fetchEODData(symbol || securityName);
            console.log(eodData);

            let matchingExchange = null;

            for (const eodItem of eodData) {
              const exchange = eodItem?.Exchange;
              if (
                exchange &&
                ["US", "V", "TO"].includes(exchange.toUpperCase())
              ) {
                matchingExchange = exchange;
                break;
              }
            }

            if (matchingExchange) {
              if (securityName) {
                temp[exchangeIndex] = matchingExchange;
              } else if (symbol) {
                temp[exchangeIndex] = matchingExchange;
              }
            } else {
              // Handle the case where no matching exchange is found
              console.error(
                "No matching exchange found for symbol or securityName."
              );
            }
          }
        } catch (error) {
          console.error("Error fetching EOD data:", error);
          throw error;
        }
      }

      final.push(temp);
    }
    temp.push("");
    temp.push(data[i][3]);
    final.push(temp);
  }

  return mapToProperFormat(final, {
    7: 0, // Account #
    0: 1, // Trade Date
    6: 2, // Settlement Date
    2: 3, // Symbol
    13: 4, // Exchange
    3: 5, // Security Name
    1: 6, // TE Type
    10: 7, // Broker Type
    4: 8, // #units
    5: 9, // $price/unit
    8: 10, // Amount
  });
}
