import { NextResponse, NextRequest } from "next/server";
import { errorCasePromise } from "@/helpers/brokerHelpers/brokerhelpers";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    // Process Body
    const body = await req.json();

    if (body) {
      // Access the CSV file from the request body
      let csvData = body.csvData;
      // Access the selected broker from request body
      let selectedBroker = body.selectedBroker;
      /* return NextResponse.json({ s: csvData }); */

      // Check for error cases and perform CSV conversion
      const result = await errorCasePromise(csvData, selectedBroker);

      if (result) {
        // If errorCase returns a valid result, it means there are no errors
        // Perform the CSV conversion based on your specific logic

        // Return the converted data to the client
        return NextResponse.json(result);
      } else {
        // If errorCase returns false, there are errors in the CSV
        return NextResponse.json(
          {
            error: "Invalid CSV format for the selected broker.",
          },
          { status: 400 }
        );
      }
    } else {
      // Handle the case when the body is empty
      return NextResponse.json(
        {
          error: "Invalid request body.",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    return NextResponse.json({
      Welcome: "Welcome to Trader's Edge - Trade Conversion Utility Tool",
    });
  } catch (error) {
    return NextResponse.json({
      error: "Invalid CSV format for the selected broker.",
    });
  }
}
