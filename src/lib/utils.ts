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
