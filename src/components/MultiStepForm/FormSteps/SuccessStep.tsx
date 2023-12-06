import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import ExitButton from "@/components/Common/Buttons/ExitButton";
const SuccessStep = () => {
  const router = useRouter();

  const handleGoBack = () => {
    // Assuming your first step is at the path "/"
    router.replace("/");
  };

  return (
    <div className="w-full text-center pt-4">
      <ExitButton mode="regular" />
    </div>
  );
};

export default SuccessStep;
