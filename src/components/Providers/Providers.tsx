"use client";
import React, { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/system";

interface ProvidersProps {
  children: ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return <NextUIProvider>{children}</NextUIProvider>;
};

export default Providers;
