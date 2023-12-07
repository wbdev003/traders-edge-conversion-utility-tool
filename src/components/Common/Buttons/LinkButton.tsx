import React, { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface LinkButtonProps {
  href: string;
  children: ReactNode;
  target?: string;
}

const LinkButton = ({ href, children, target }: LinkButtonProps) => {
  return (
    <Button asChild variant="link" className="p-0 m-0 text-md text-slate-600">
      <Link
        className="p-0 m-0"
        href={href}
        target={target ? `${target}` : "_blank"}
      >
        {children}
      </Link>
    </Button>
  );
};

export default LinkButton;
