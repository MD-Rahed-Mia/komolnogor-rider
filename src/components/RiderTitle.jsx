import React from "react";
import { Switch } from "antd";

export default function RiderTitle({ title = "Rider" }) {
  return (
    <div className="w-full p-3 py-1 bg-white">
      <h1 className="text-2xl text-center font-extrabold text-pink-600 uppercase">
        {title}
      </h1>
    </div>
  );
}
