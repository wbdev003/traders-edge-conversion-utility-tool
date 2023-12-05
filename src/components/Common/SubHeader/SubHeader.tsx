"use client";
import React from "react";
import Container from "../Utils/Container/Container";
import Icons from "../Icons/Icons";
import { Button } from "@/components/ui/button";
import { Dialog } from "@radix-ui/react-dialog";
import { useModalStore } from "@/store/useModalStore";

const SubHeader = () => {
  const { toggleModal, setToggleModal } = useModalStore();
  return (
    <div className="w-full font-semibold py-4 bg-slate-50  text-lg text-left">
      <Container>
        <div className="flex items-center w-full justify-between">
          <p className="text-base sm:text-lg text-slate-700">
            Import Your Trades From A CSV
          </p>
          <Button
            variant={"outline"}
            className="rounded-full p-0 shadow-none hover:bg-slate-400"
            onClick={() => {
              setToggleModal(true);
            }}
          >
            <Icons type="help" size={35} color="black" />
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default SubHeader;
