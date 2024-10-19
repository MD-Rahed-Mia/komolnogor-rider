import React from "react";
import RiderTitle from "../../components/RiderTitle";
import RiderNavigation from "../../components/RiderNavigation";

export default function Layout({ children }) {
  return (
    <div className="w-full h-screen overflow-y-scroll">
      <RiderTitle />
      {children}
      <RiderNavigation />
    </div>
  );
}
