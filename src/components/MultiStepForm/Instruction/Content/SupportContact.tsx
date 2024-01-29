import React from "react";
import Link from "next/link";

const SupportContact = () => {
  const supportEmail = "conversion@tradersedge.ca";

  return (
    <div className=" mx-auto py-3 px-5 bg-slate-200 rounded-lg">
      <strong>Support:</strong> For any issues or questions, consult the
      tool&apos;s documentation or reach out to our support team at:
      <Link href={`mailto:${supportEmail}`}>
        <p className="text-slate-500 font-semibold hover:text-slate-400">
          {supportEmail}
        </p>
      </Link>
    </div>
  );
};

export default SupportContact;
