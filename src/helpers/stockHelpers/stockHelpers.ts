import axios from "axios";

export async function fetchEODData(queryString: string): Promise<any> {
  const apiUrl = `https://eodhd.com/api/search/${queryString}?api_token=${process.env.NEXT_PUBLIC_EOD_API_KEY}&fmt=json`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching EOD data:", error);
    throw error;
  }
}
