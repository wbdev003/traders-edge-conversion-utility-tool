// Import necessary components from the UI library
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNumber, standardizeDate } from "@/lib/utils";

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
                {cellIndex === 0
                  ? cellData
                  : cellIndex === 1 || cellIndex === 2
                  ? cellData
                  : cellIndex === 9
                  ? cellData
                  : formatNumber(cellData)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
// Export the FileConvertTableDisplay component
export default FileConvertTableDisplay;
