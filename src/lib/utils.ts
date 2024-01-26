import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// function to format numbers with commas
export const formatNumber = (value: string): string => {
  const parsedValue = parseFloat(value);
  if (!isNaN(parsedValue)) {
    return parsedValue.toLocaleString("en-US", {
      maximumFractionDigits: 2,
    });
  }
  return value;
};

// function to standardize date formats
export const standardizeDate = (dateString: string): string => {
  // Check if the date is in the "YYYY-MM-DD" or "MM/DD/YY" format
  const isISODate = /^\d{4}-\d{2}-\d{2}$/.test(dateString);

  if (isISODate) {
    // If it's already in ISO format, return as is
    return dateString;
  } else {
    // Assuming the date is in "MM/DD/YY" format, convert it to "YYYY-MM-DD"
    const [month, day, year] = dateString.split("/");
    const isoDate = `${year}-${month.padStart(2, "0")}-${day?.padStart(
      2,
      "0"
    )}`;
    return isoDate;
  }
};

export const checkCSVForMissingFields = (csvData: string[][]) => {
  // Assuming the first row contains header names
  const header = csvData[0];

  // Array to store missing fields for each row
  const missingFields = [];

  // Check each row starting from the second row (index 1)
  for (let rowIndex = 1; rowIndex < csvData.length; rowIndex++) {
    const row = csvData[rowIndex];

    // Array to store missing fields for the current row
    const missingFieldsForRow = [];

    // Check each field in the row
    for (let columnIndex = 0; columnIndex < header.length; columnIndex++) {
      const fieldName = header[columnIndex];

      // Check if the field is missing
      if (row[columnIndex] === undefined || row[columnIndex] === "") {
        missingFieldsForRow.push(fieldName);
      }
    }

    // If there are missing fields for the current row, add them to the result
    if (missingFieldsForRow.length > 0) {
      missingFields.push({
        row: rowIndex + 1, // Adding 1 to convert to 1-based index
        fields: missingFieldsForRow,
      });
    }
  }

  // Return the result
  return missingFields.length > 0
    ? { hasMissingFields: true, missingFields }
    : { hasMissingFields: false };
};
