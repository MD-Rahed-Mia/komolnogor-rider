import React from "react";

export default function RiderTitle({ title = "Rider" }) {
  return (
    <div className="w-full p-3 py-1 bg-slate-300">
      <h1 className="text-2xl text-center font-extrabold text-pink-600 uppercase">
        {title}
      </h1>
    </div>
  );
}
