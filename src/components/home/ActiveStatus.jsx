import { Switch } from "antd";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../authContext/authProvider";
import { ThreeDot } from "react-loading-indicators";
import ThreeDots from "../loading/ThreeDots";
import { useSocket } from "../../authContext/socketProvider";
import AxiosIntances from "../../utils/AxiosInstances";
import { apiPath } from "../../../secret";
import Cookies from "js-cookie";

export default function ActiveStatus() {
  const { rider } = useAuth();
  const { socket, isActive } = useSocket();

  // console.log(rider);
  const [session, setSession] = useState(null);
  const [online, setOnline] = useState();

  // loading
  const [loading, setLoading] = useState(true);

  const onChange = async (checked) => {
    console.log(checked);
    setLoading(true);
    const id = Cookies.get("token");
    if (!id) {
      console.log("no rider id found.");
      return;
    }
    const { data } = await AxiosIntances.put(
      `${apiPath}/rider/update-session/${id}?session=${
        session === "available" ? "busy" : "available"
      }`
    );

    console.log(data);
    if (data.success) {
      setSession(data.session);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (rider) {
      setLoading(false);
      setSession(rider.session);
    }

    // console.log(session);
  }, [rider]);

  useEffect(() => {
    if (isActive) {
      setOnline(true);
    } else {
      setOnline(false);
    }
  }, [isActive]);

  return (
    <div className="w-full border shadow-md relative overflow-hidden px-4 py-2 flex items-center justify-between">
      <div className="absolute bg-white -top-2 left-1/2 -translate-x-1/2 px-3 py-2 border shadow-lg">
        <span>online</span>
        {online ? (
          <span className="w-1 h-1 rounded-full mx-3 inline-block bg-green-600 p-1"></span>
        ) : (
          <span className="w-1 h-1 rounded-full mx-3 inline-block bg-red-600 p-1"></span>
        )}
      </div>
      <div>
        <h1 className="font-extrabold ">
          session:
          <span className="px-2 p-1 bg-blue-400 text-white rounded-md shadow-md text-sm">
            {session}
          </span>
        </h1>
        <h1 className="text-sm">
          {session === "out for delivery"
            ? "currently not available"
            : "Open to take order"}
        </h1>
      </div>

      <div>
        {loading ? (
          <h1>loading</h1>
        ) : (
          <Switch
            disabled={session === "out for delivery" ? true : false}
            checked={
              session === "available" || "out for delivery" ? true : false
            }
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
}
