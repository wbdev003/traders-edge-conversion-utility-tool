import { Trade } from "@/models/clientModels";

export async function convertTradeData(
  csvData: unknown[],
  selectedBroker: string
) {
  /* https://trade-conversion-utility-tool.vercel.app/ */
  const apiUrl = "https://trade-conversion-utility-tool.vercel.app/api/convert"; // Replace with your actual backend API URL

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        selectedBroker,
        csvData,
      }),
    });

    if (!response.ok) {
      // Handle non-successful responses
      throw new Error(`Failed to process data. Status: ${response.status}`);
    }

    // Assuming your backend returns JSON data, you can parse it like this:
    const responseData = await response.json();

    return responseData;

    // Process the responseData as needed
  } catch (error) {
    // Handle fetch or processing errors
    console.error("Error processing data:", error);
  }
}
