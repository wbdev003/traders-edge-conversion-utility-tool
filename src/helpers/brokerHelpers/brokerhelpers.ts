import { tdTradeFilter } from "./brokerFilters/tdTradeFilters";
import { questTradeFilter } from "./brokerFilters/questTradeFilters";
import { rbcTradeFilter } from "./brokerFilters/rbcTradeFilters";
import { ibkrTradeFilter } from "./brokerFilters/ibkrTradeFilters";
import { scotiaTradeFilter } from "./brokerFilters/scotiaTradeFilters";
import { vbTradeFilter } from "./brokerFilters/vbTradeFilter";

// Define a variable to hold the selected type (questrade, TD, RBC)
export const header = [
  "Account #",
  "Trade date",
  "Settlement date",
  "Symbol",
  "Exchange",
  "Security name",
  "TE type",
  "Broker type",
  "#units",
  "$price/unit",
  "Amount",
];

/**
 * Takes in a format of { originalIndex: newIndex }. Rearranges the function.
 * @param {Array<Array<string>>} currentData - Data array to be rearranged.
 * @param {Object} args - Mapping of original indices to new indices.
 * @returns {Array<Array<string>>} - Rearranged array of data.
 */
export function mapToProperFormat(
  currentData: Array<Array<string>>,
  args: { [key: number]: number }
): Array<Array<string>> {
  const final: Array<Array<string>> = [];

  // Initializes the array
  for (let i = 0; i < currentData.length; i++) {
    const add: Array<string> = Array(Object.keys(args).length).fill("");
    final.push(add);
  }

  // Maps everything out
  for (let i = 0; i < currentData.length; i++) {
    for (let j = 0; j < currentData[i].length; j++) {
      if (Object.keys(args).includes(String(j))) {
        final[i][args[j]] = currentData[i][j];
      }
    }
  }

  const finalValue: Array<Array<string>> = [header];
  for (let i = 0; i < final.length; i++) {
    finalValue.push(final[i]);
  }

  return finalValue;
}

/**
 * Checks if two arrays are equal.
 * @param {any[]} arrayOne - First array to compare.
 * @param {any[]} arrayTwo - Second array to compare.
 * @returns {boolean} - True if arrays are equal, false otherwise.
 */
export function checkArrayEqual(arrayOne: any[], arrayTwo: any[]): boolean {
  if (arrayOne.length === arrayTwo.length) {
    for (let i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i].trim() !== arrayTwo[i]) {
        return false;
      }
    }
    console.log("equal");
    return true;
  } else {
    console.log("not equal");
    return false;
  }
}

/**
 * Checks for error cases based on the selected type.
 * @param {any} args - Data array to check for errors.
 * @returns {Promise<boolean | string[][]>} - False if an error is detected, true otherwise.
 */
export async function errorCasePromise(
  args: any,
  selectedBroker: string
): Promise<boolean | string[][]> {
  // ... your existing code

  // Questrade
  if (selectedBroker === "questrade") {
    if (
      checkArrayEqual(args[0], [
        "Transaction Date",
        "Settlement Date",
        "Action",
        "Symbol",
        "Description",
        "Quantity",
        "Price",
        "Gross Amount",
        "Commission",
        "Net Amount",
        "Currency",
        "Account #",
        "Activity Type",
        "Account Type",
      ])
    ) {
      return questTradeFilter(args);
    } else {
      return false;
    }
    /* TD */
  } else if (selectedBroker === "td") {
    if (
      checkArrayEqual(args[3], [
        "Trade Date",
        "Settle Date",
        "Description",
        "Action",
        "Quantity",
        "Price",
        "Commission",
        "Net Amount",
      ])
    ) {
      return tdTradeFilter(args);
    } else {
      return false;
    }
    /* RBC */
  } else if (selectedBroker === "rbc") {
    if (
      checkArrayEqual(args[8], [
        "Date",
        "Activity",
        "Symbol",
        "Symbol Description",
        "Quantity",
        "Price",
        "Settlement Date",
        "Account",
        "Value",
        "Currency",
        "Description",
      ])
    ) {
      return rbcTradeFilter(args);
    } else {
      return false;
    }
  } else if (selectedBroker === "ibkr") {
    if (
      checkArrayEqual(args[8], [
        "Date",
        "Activity",
        "Symbol",
        "Symbol Description",
        "Quantity",
        "Price",
        "Settlement Date",
        "Account",
        "Value",
        "Currency",
        "Description",
      ])
    ) {
      return ibkrTradeFilter(args);
    } else {
      return false;
    }
  } else if (selectedBroker === "scotia") {
    if (
      checkArrayEqual(args[0], [
        "Description",
        "Symbol",
        "Transaction Date",
        "Settlement Date",
        "Account Currency",
        "Type",
        "Quantity",
        "Currency of Price",
        "Price",
        "Settlement Amount",
      ])
    ) {
      return scotiaTradeFilter(args);
    } else {
      return false;
    }
  } else if (selectedBroker === "vb") {
    if (
      checkArrayEqual(args[0], [
        "Account Number",
        "Effective Date",
        "Process Date",
        "Description",
        "TX Type",
        "Symbol",
        "TransactionID",
        "SubTransactionID",
        "SecurityType",
        "CC",
        "QTY",
        "COMSN",
        "Price",
        "Net Amount",
      ])
    ) {
      return vbTradeFilter(args);
    } else {
      return false;
    }
  } else {
    console.log("not equal");
    return false;
  }
}

export function errorCase(
  args: any,
  selectedBroker: string
): boolean | string[][] {
  // Add if statements for new types in error cases here

  // Questrade
  if (selectedBroker === "questrade") {
    if (
      checkArrayEqual(args[0], [
        "Transaction Date",
        "Settlement Date",
        "Action",
        "Symbol",
        "Description",
        "Quantity",
        "Price",
        "Gross Amount",
        "Commission",
        "Net Amount",
        "Currency",
        "Account #",
        "Activity Type",
        "Account Type",
      ])
    ) {
      return questTradeFilter(args);
    } else {
      return false;
    }
  } else if (selectedBroker === "td") {
    if (
      checkArrayEqual(args[3], [
        "Trade Date",
        "Settle Date",
        "Description",
        "Action",
        "Quantity",
        "Price",
        "Commission",
        "Net Amount",
      ])
    ) {
      return tdTradeFilter(args);
    } else {
      return false;
    }
  } else if (selectedBroker === "rbc") {
    if (
      checkArrayEqual(args[8], [
        "Date",
        "Activity",
        "Symbol",
        "Symbol Description",
        "Quantity",
        "Price",
        "Settlement Date",
        "Account",
        "Value",
        "Currency",
        "Description",
      ])
    ) {
      return rbcTradeFilter(args);
    } else {
      return false;
    }
  } else {
    // Case when nothing is selected
    console.log("not equal");
    return false;
  }
}
