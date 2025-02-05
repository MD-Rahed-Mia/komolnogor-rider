import React from "react";
import RiderTitle from "../../components/RiderTitle";
import RiderNavigation from "../../components/RiderNavigation";

export default function Layout({ children }) {
  return (
    <div className="w-full overflow-hidden">
      {/* <RiderTitle /> */}
      {children}
      <RiderNavigation />
    </div>
  );
}
