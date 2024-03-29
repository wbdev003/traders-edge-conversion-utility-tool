import React from "react";
import scotiaItradeLogo from "../../../../public/images/scotia-itrade-logo.webp";
import questtradeLogo from "../../../../public/images/questtrade-logo.png";
import rbcLogo from "../../../../public/images/rbc-logo.png";
import tdLogo from "../../../../public/images/td-logo.png";
import ibLogo from "../../../../public/images/ib-logo.png";
import vbLogo from "../../../../public/images/vb-logo.png";
import cibcLogo from "../../../../public/images/cibc-logo.png";
import bmoLogo from "../../../../public/images/bmo-logo.png";
import nationalbankLogo from "../../../../public/images/nationalbank-logo.png";
import { SelectOptionCard } from "@/components/Common/Cards/SelectOptionCard";

const brokerData = [
  { img: questtradeLogo, title: "Questrade", identifier: "questrade" },
  { img: tdLogo, title: "TD Direct Investing", identifier: "td" },
  { img: rbcLogo, title: "RBC Direct Investing", identifier: "rbc" },

  { img: ibLogo, title: "Interactive Brokers", identifier: "ibkr" },

  { img: scotiaItradeLogo, title: "Scotia ITrade", identifier: "scotia" },
  { img: vbLogo, title: "Virtual Brokers", identifier: "vb" },
  { img: cibcLogo, title: "CIBC Investor's Edge", identifier: "cibc" },
  {
    img: nationalbankLogo,
    title: "National Bank",
    identifier: "nationalMulti",
  },
  {
    img: bmoLogo,
    title: "BMO InvestorLine",
    identifier: "bmo",
  },
];
const ChooseBrokerStep = () => {
  return (
    <div className="mt-8 grid gap-2 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
      {brokerData.map((broker, index) => (
        <SelectOptionCard
          key={index}
          img={broker.img}
          title={broker.title}
          index={index}
          identifier={broker.identifier}
        />
      ))}
    </div>
  );
};

export default ChooseBrokerStep;
