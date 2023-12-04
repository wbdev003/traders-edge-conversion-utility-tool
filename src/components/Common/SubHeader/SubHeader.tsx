import React from "react";
import Container from "../Utils/Container/Container";

const SubHeader = () => {
  return (
    <div className="w-full font-semibold py-4 bg-slate-50  text-lg text-left">
      <Container>
        <p className="text-base sm:text-lg">Import Your Trades From A CSV</p>
      </Container>
    </div>
  );
};

export default SubHeader;
