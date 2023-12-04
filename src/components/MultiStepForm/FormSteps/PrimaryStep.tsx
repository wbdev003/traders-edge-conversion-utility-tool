import React from "react";
import scotiaItradeLogo from "../../../../public/images/scotia-itrade-logo.webp";
import questtradeLogo from "../../../../public/images/questtrade-logo.png";
import rbcLogo from "../../../../public/images/rbc-logo.png";
import tdLogo from "../../../../public/images/td-logo.png";
import { SelectOptionCard } from "@/components/Common/Cards/SelectOptionCard";

const brokerData = [
  { img: scotiaItradeLogo, title: "Scotia iTrade" },
  { img: questtradeLogo, title: "Quest Trade" },
  { img: tdLogo, title: "TD Direct Investing" },
  { img: rbcLogo, title: "RBC Direct Investing" },
];
const PrimaryStep = () => {
  return (
    <div className="mt-8 grid gap-2 gap-y-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {brokerData.map((broker, index) => (
        <SelectOptionCard
          key={index}
          img={broker.img}
          title={broker.title}
          index={index}
        />
      ))}
    </div>
  );
};

export default PrimaryStep;
