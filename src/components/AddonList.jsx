import React, { useEffect } from "react";

export default function AddonList({ addons }) {
  useEffect(() => {
    console.log(`addons are :${addons}`);
  }, [addons]);

  return (
    <div>
      <table className="w-full text-center text-[12px]">
        <thead>
          <tr>
            <td className="font-semibold border ">SL</td>
            <td className="font-semibold border ">Name</td>
            <td className="font-semibold border ">Quantity</td>
          </tr>
        </thead>

        <tbody>
          {addons?.map((add, index) => {
            return (
              <tr>
                <td className="text-center border">{index + 1}</td>
                <td className="text-center border">{add.title}</td>
                <td className="text-center border">{add.quantity}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
