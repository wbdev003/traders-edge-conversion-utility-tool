import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  // Function to generate an array of numbers from 0 to n-1
  const generateArray = (n: number) => Array.from({ length: n }, (_, i) => i);

  // Number of rows and columns
  const numRows = 6;
  const numCols = 11;

  return (
    <div className="flex flex-col space-y-4 w-full py-6 px-6">
      {generateArray(numRows).map((rowIndex) => (
        <div key={rowIndex} className="flex items-center space-x-4">
          {generateArray(numCols).map((colIndex) => (
            <Skeleton key={colIndex} className="h-8 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
