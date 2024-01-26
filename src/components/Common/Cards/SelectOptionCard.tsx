"use client";
import React, { useState, useEffect } from "react";
import { Card, CardBody } from "@nextui-org/react";
import { StaticImageData } from "next/image";
import Image from "next/image";
import { useSelectionStore } from "@/store/useSelectionStore";

interface ISelectOptionCard {
  title: string;
  img: StaticImageData;
  index: number;
  identifier: string;
}

export function SelectOptionCard({
  title,
  img,
  index,
  identifier,
}: ISelectOptionCard) {
  const { brokerSelection, brokerIndex, setBrokerSelection, setBrokerIndex } =
    useSelectionStore();

  const handleClick = () => {
    setBrokerIndex(index);
    setBrokerSelection(identifier);
  };

  useEffect(() => {
    console.log(brokerIndex, brokerSelection);
  }, [brokerSelection, brokerIndex]);

  return (
    <Card
      className={`w-fit mx-auto p-1 text-center rounded-xl shadow-xl bg-slate-50 flex items-center justify-center
        border-slate-200 border-solid border-2 ${
          brokerIndex === index ? "bg-slate-300 border-slate-400" : "bg-white"
        }`}
      onClick={handleClick}
      isPressable
    >
      <div className=" h-12 flex items-center justify-center mx-auto">
        <Image src={img} width={45} height={45} alt="broker-logo" />
      </div>
      <CardBody className="mt-0 pt-0 h-18 mx-auto max-w-full w-36">
        <p className="font-semibold text-md text-center">{title}</p>
      </CardBody>
    </Card>
  );
}
