// Import necessary components from the UI library
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Define the props for the FileConvertTableDisplay component
interface FileConvertTableDisplayProps {
  data: boolean | string[][];
}

// Functional component to display a table based on the provided data
const FileConvertTableDisplay = ({ data }: FileConvertTableDisplayProps) => {
  // Check if data is an array and contains rows; otherwise, return null
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  // Destructure the data array into header and rows
  const [header, ...rows] = data;

  // Render the table structure with header, body, and footer
  return (
    <Table>
      {/* Table Header */}
      <TableHeader>
        <TableRow>
          {/* Map through header items to create TableHead components */}
          {header.map((headerItem, index) => (
            <TableHead key={index}>{headerItem}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      {/* Table Body */}
      <TableBody>
        {/* Map through rows to create TableRow components */}
        {rows.map((rowData, rowIndex) => (
          <TableRow key={rowIndex}>
            {/* Map through cell data to create formatted TableCell components */}
            {rowData.map((cellData, cellIndex) => (
              <TableCell key={cellIndex}>
                {cellIndex === 0 ||
                cellIndex === 1 ||
                cellIndex === 2 ||
                cellIndex === 9
                  ? cellData
                  : formatNumber(cellData)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>

      {/* Table Footer */}
      <TableFooter>
        <TableRow>
          {/* Display a bold TableCell spanning the entire header length - 1 */}
          <TableCell colSpan={header.length - 1} className="font-bold">
            Total
          </TableCell>
          {/* Calculate the total amount dynamically based on the last index of the inputted data */}
          <TableCell className="font-bold">
            {/* Use reduce to sum up the amounts from the last column of each row */}
            $
            {formatNumber(
              rows
                .reduce(
                  (total, rowData) =>
                    total + parseFloat(rowData[rowData.length - 1] || "0"),
                  0
                )
                .toFixed(2)
            )}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

// Helper function to format numbers with commas
const formatNumber = (value: string): string => {
  const parsedValue = parseFloat(value);
  if (!isNaN(parsedValue)) {
    return parsedValue.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  }
  return value;
};

// Export the FileConvertTableDisplay component
export default FileConvertTableDisplay;
