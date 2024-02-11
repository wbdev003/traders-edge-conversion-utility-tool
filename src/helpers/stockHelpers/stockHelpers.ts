import axios from "axios";

export async function fetchEODData(queryString: string): Promise<any> {
  const apiUrl = `https://eodhd.com/api/search/${queryString}?limit=1&api_token=${process.env.NEXT_PUBLIC_EOD_API_KEY}&fmt=json`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching EOD data:", error);
    throw error;
  }
}

export function mapToStockExchange(input: string): string {
  const stockExchangeMap: Record<string, string> = {
    TO: "TSX",
    V: "TSXV",
    US: "NASDAQ",
    USA: "NASDAQ",
    F: "FWB",
    // Add more mappings as needed
  };

  const result = stockExchangeMap[input?.toUpperCase()] || "other"; // Default to 'Unknown' if not found
  return result;
}

export function mapTransactionType(teType: string): string {
  const transactionTypeMap: Record<string, string> = {
    BUY: "Buy",
    SELL: "Sell",
    // Add more mappings as needed
  };

  const result = transactionTypeMap[teType?.toUpperCase()] || "unallocated"; // Default to 'Unallocated' if not found
  return result;
}

export function determineAction(string: string): string {
  if (string === "O") {
    return "BUY";
  } else if (string === "C") {
    return "SELL";
  } else {
    return "unallocated";
  }
}
