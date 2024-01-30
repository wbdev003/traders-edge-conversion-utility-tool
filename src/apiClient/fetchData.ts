import axios from "axios";

// https://eodhd.com/financial-apis/search-api-for-stocks-etfs-mutual-funds-and-indices/
// Using the EOD Search Api to search for stock name and info along with exchange
export async function fetchStockInfo(queryString: string) {
  const url = `https://eodhd.com/api/search/${queryString}?api_token=${process.env.NEXT_PUBLIC_EOD_API_KEY}&fmt=json`;
  console.log(url);
  try {
    const response = await axios.get(url, {});

    // Check if the response status is OK (200)
    if (response.status === 200) {
      // Assuming the response contains an array of journal entries
      const journalEntries = response.data;
      return journalEntries;
    } else {
      // Handle other response status codes if needed
      console.error("Received a non-OK response:", response);
      return null; // Return null or throw an error, depending on your requirements
    }
  } catch (error) {
    console.error("An error occurred:", error);
    return null; // Return null or throw an error, depending on your requirements
  }
}
