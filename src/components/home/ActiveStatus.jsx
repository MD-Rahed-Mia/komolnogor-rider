import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext/authProvider";
import { ThreeDot } from "react-loading-indicators";
import ThreeDots from "../loading/ThreeDots";
import { useSocket } from "../../authContext/socketProvider";

export default function ActiveStatus() {
  const { rider } = useAuth();
  const { isActive } = useSocket();

  // console.log(rider);
  const [session, setSession] = useState(null);

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  useEffect(() => {
    setSession(rider?.session);
    console.log(session);
  }, [rider]);

  return (
    <div className="w-full border shadow-md px-4 py-2 flex items-center justify-between">
      <div>
        <h1 className="font-extrabold ">
          Status:{" "}
          <span className="px-2 p-1 bg-blue-400 text-white rounded-md shadow-md text-sm">
            {session}
          </span>
        </h1>
        <h1 className="text-sm">Open to take order</h1>
      </div>
      <div>
        <Switch checked={isActive} onChange={onChange} />
      </div>
    </div>
  );
}
