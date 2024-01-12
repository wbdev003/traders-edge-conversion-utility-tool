import React, { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <div className=" mx-auto px-4 sm:px-4 max-w-7xl">{children}</div>;
};

export default Container;
