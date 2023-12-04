import React from "react";
import Container from "../Utils/Container/Container";
import Image from "next/image";
import logo from "./../../../../public/images/traders-edge-logo.png";

const Nav = () => {
  return (
    <div className=" bg-slate-800 py-4">
      <Container>
        <div className="flex items-center space-x-6">
          <Image height={155} width={155} src={logo} alt="" />
          <div className="text-slate-300 font-bold text-xs sm:text-sm ">
            Trade Conversion Utility Tool
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Nav;
