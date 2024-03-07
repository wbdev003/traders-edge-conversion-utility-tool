import React from "react";
import Nav from "../Common/Nav/Nav";
import Container from "../Common/Utils/Container/Container";
import ProgressBarLayout from "../Common/ProgressBar/ProgressBarLayout";
import MultiStepFormLayout from "../MultiStepForm/MultiStepFormLayout";
import InstructionModal from "../Common/Modal/InstructionModal";

const MainLayout = () => {
  return (
    <div className="bg-slate-200 min-h-screen h-full overflow-auto">
      <Nav />
      <ProgressBarLayout />
      <Container>
        <MultiStepFormLayout />
      </Container>
      <InstructionModal />
    </div>
  );
};

export default MainLayout;
