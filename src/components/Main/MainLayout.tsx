import React from "react";
import Nav from "../Common/Nav/Nav";
import Container from "../Common/Utils/Container/Container";
import SubHeader from "../Common/SubHeader/SubHeader";
import FormStepProgress from "../Common/ProgressBar/FormStepProgress";
import Divider from "../Common/Divider/Divider";
import MultiStepForm from "../MultiStepForm/MultiStepForm";
import Modal from "../Common/Modal/Modal";

const MainLayout = () => {
  return (
    <div className="bg-slate-200 min-h-screen h-full pb-20">
      <Nav />
      <SubHeader />
      <Divider width="1" />
      <FormStepProgress />
      <Container>
        <MultiStepForm />
      </Container>
      <Modal />
    </div>
  );
};

export default MainLayout;
