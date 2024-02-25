"use client";
import React from "react";
import Container from "../Common/Utils/Container/Container";
import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";

const NotFoundLayout = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <Container>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-red-700 mb-4">
          404 - Page Not Found
        </h1>
        <p className="text-gray-700 mb-8 text-xl">
          Sorry, the page you are looking for does not exist.
        </p>
        <Button
          onClick={handleGoBack}
          className="px-4 py-2 bg-slate-800 text-white font-bold text-xl flex items-center justify-center p-4 rounded-2xl hover:bg-slate-700 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Go back
        </Button>
      </div>
    </Container>
  );
};

export default NotFoundLayout;
