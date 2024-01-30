"use client";
import React, { useEffect, useState } from "react";
import TableDisplay from "./TableDisplay/TableDisplay";
import { useFileUploadStore } from "@/store/useFileUploadStore";
import { useDownloadState } from "@/store/useDownloadState";
import { fetchStockInfo } from "@/apiClient/fetchData";
import useSWR from "swr";

const FileConvertLayout = () => {
  const { processedData } = useFileUploadStore();
  const { setAccountNumber, setEndDate, setStartDate } = useDownloadState();

  /* Setting state for download file name */
  useEffect(() => {
    console.log(processedData);
    if (Array.isArray(processedData) && processedData?.length > 1) {
      setAccountNumber(processedData[1][0]);
      setStartDate(processedData[processedData?.length - 1][1]);
      setEndDate(processedData[1][1]);
    } else {
      console.error(
        "Invalid data format: processedData is not an array with at least two elements."
      );
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Journal Data
  /* const { data, error, isLoading } = useSWR(
    `${process.env.NEXT_PUBLIC_API_URL}`,
    () => fetchStockInfo("GATEKEEPER SYSTEMS INC"),
    {
      revalidateOnFocus: false,
      refreshInterval: 0,
      focusThrottleInterval: 60000,
    }
  );

  useEffect(() => {
    console.log(data);
  }, [data]); */

  return (
    <div>
      <TableDisplay data={processedData} />
    </div>
  );
};

export default FileConvertLayout;
