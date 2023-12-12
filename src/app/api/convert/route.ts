import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { errorCase } from "@/helpers/brokerHelpers/brokerhelpers";
export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Access the CSV file from the request body
    const csvData = req.body.parsedData;

    // Replace 'questrade' with the actual broker selection logic
    const selectedBroker = "questrade";

    // Check for error cases and perform CSV conversion
    const result = errorCase(csvData, selectedBroker);

    if (result) {
      // If errorCase returns a valid result, it means there are no errors
      // Perform the CSV conversion based on your specific logic

      // Return the converted data to the client
      res.status(200).json({ data: csvData });
    } else {
      // If errorCase returns false, there are errors in the CSV
      res
        .status(400)
        .json({ error: "Invalid CSV format for the selected broker." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export async function GET() {
  NextResponse.json({ "123": 123 });
}
