import { mapToProperFormat } from "../brokerhelpers";
import { fetchEODData } from "@/helpers/stockHelpers/stockHelpers";

/**
 * Filters data for TD type.
 * @param {any} data - Data array to filter.
 * @returns {boolean} - True if successful, false otherwise.
 */
export async function tdTradeFilter(data: any): Promise<Array<Array<string>>> {
  const final: Array<Array<string>> = [];
  let accountNum = data[1][1].split(" - ")[1];

  for (let i = 4; i < data.length; i++) {
    let startDate = data[i][0]; // Start date is at index 0
    let endDate = data[i][1]; // End date is at index 1

    let teType = data[i][3];
    let numUnits = data[i][4];
    let amount = data[i][7];

    // TODO create logic in that if security name and/or Exchange and/or Symbol is empty
    // make a request to ... to get data via a fetch req from EO HD API

    let temp = [];

    for (let j = 0; j < data[i].length; j++) {
      let securityName = data[i][2];
      let symbol = "";
      let exchange = "";

      if (j === 0) {
        temp.push(accountNum);
      } else if (j === 1) {
        temp.push(startDate);
      } else if (j === 2) {
        temp.push(endDate);
      } else if (j === 11) {
        temp.push(securityName);
      } else if (j === 12) {
        // Adjusted for correct mapping
        temp.push(" "); // Assuming you want to skip Exchange
      } else if (j === 3) {
        // Adjusted for correct mapping
        let filteredSecurity = filterDescriptionTD(securityName);
        if (!filteredSecurity) {
          temp.push("N/A");
        } else {
          temp.push(filteredSecurity);
        }
      } else if (j === 4) {
        if (teType === "BUY") {
          temp.push("Buy");
        } else if (teType === "SELL") {
          temp.push("Sell");
        } else {
          temp.push("unallocated");
        }
      } else if (j === 5) {
        temp.push(teType); // Assuming Broker Type here
      } else if (j === 6) {
        if (data[i][4] === 0) {
          temp.push("0");
        } else {
          const pricePerQuantity = Math.abs(data[i][4]);
          temp.push(pricePerQuantity.toFixed(0));
        }
      } else if (j === 7) {
        let pricePerUnit =
          numUnits !== 0
            ? Math.abs(Math.abs(amount) / numUnits).toFixed(4)
            : "0";
        temp.push(pricePerUnit);
      } else if (j === 8) {
        temp.push(Math.abs(amount));
      } else {
        temp.push(data[i][j]);
      }
    }

    if (data[i][0]) {
      temp.push(filterDescriptionTD(data[i][2]));
      final.push(temp);
    }

    if (data[i][0]) {
      // Fetch additional data if Symbol or Security name is present
      const symbolIndex = 11;
      const exchangeIndex = 12;
      const securityNameIndex = 3;

      const symbol = temp[symbolIndex];
      const securityName = temp[securityNameIndex]
        .split(" ")
        .slice(0, 2)
        .join(" ");
      const teType = temp[4];

      try {
        if (
          (symbol || securityName) &&
          (teType === "Buy" || teType === "Sell")
        ) {
          const eodData = await fetchEODData(symbol || securityName);

          console.log(eodData);

          // Update the temp array with additional information
          if (symbol) {
            // fill in exchange index with fetched data
            temp[exchangeIndex] = eodData[0].Exchange; // fill in exchange
            temp[securityNameIndex] = eodData[0].Name; // fill in Security Name
          } else if (securityName) {
            temp[symbolIndex] = eodData[0].Code; // fill in symbol
            temp[exchangeIndex] = eodData[0].Exchange; // fill in exchange
          }
        }
      } catch (error) {
        // Handle errors or log them as needed
        console.error("Error fetching EOD data:", error);
        throw error;
      }

      final.push(temp);
    }
  }

  return mapToProperFormat(final, {
    0: 0, // Account #
    1: 1, // Trade Date
    2: 2, // Settlement Date
    11: 3, // Symbol
    12: 4, // Exchange
    3: 5, // Security Name
    4: 6, // TE Type
    5: 7, // Broker Type
    6: 8, // #units
    7: 9, // $price/unit
    8: 10, // Amount
  });
}

/**
 * Filters and extracts the non-numeric part of a given string.
 * @param {string} data - The input string to filter.
 * @returns {string} - The non-numeric part of the input string.
 */
function filterDescriptionTD(data: string): string {
  /**
   * Splits the input string by spaces.
   * @type {string[]}
   */
  const all: string[] = data.split(" ");

  /**
   * Accumulator variable for the final non-numeric data.
   * @type {string}
   */
  let finalData: string = "";

  for (let i = 0; i < all.length; i++) {
    /**
     * Checks if the current element contains a digit.
     * @type {boolean}
     */
    if (/\d/.test(all[i])) {
      break;
    } else {
      finalData = finalData + " " + all[i];
    }
  }

  // Removes leading and trailing whitespaces and returns the final data.
  return finalData.trim();
}
