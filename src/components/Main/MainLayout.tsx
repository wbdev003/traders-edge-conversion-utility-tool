import React from "react";
import Nav from "../Common/Nav/Nav";
import Container from "../Common/Utils/Container/Container";
import SubHeader from "../Common/SubHeader/SubHeader";
import ProgressBarLayout from "../Common/ProgressBar/ProgressBarLayout";
import Divider from "../Common/Divider/Divider";
import MultiStepFormLayout from "../MultiStepForm/MultiStepFormLayout";
import InstructionModal from "../Common/Modal/InstructionModal";

const MainLayout = () => {
  return (
    <div className="bg-slate-200 min-h-screen h-full pb-36 ">
      <Nav />
      {/* <SubHeader />
      <Divider width="1" /> */}
      <ProgressBarLayout />
      <Container>
        <MultiStepFormLayout />
      </Container>
      <InstructionModal />
    </div>
  );
};

export default MainLayout;
