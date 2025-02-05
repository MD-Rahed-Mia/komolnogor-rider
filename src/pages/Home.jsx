import React, { useEffect, useState } from "react";
import PrivateRoute from "../authContext/PrivateRoute";
import RiderLayout from "./layout/RiderLayout";
import { useAuth } from "../authContext/authProvider";

import { Button, Modal } from "antd";
import axios from "axios";
import { apiAuthToken, apiPath } from "../../secret";
import ActiveStatus from "../components/home/ActiveStatus";
import HomeMap from "../components/maps/HomeMap";
import TrackOrderMap from "../components/maps/TrackOrderMap";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rider } = useAuth();
  const [sessionBtn, setSessionBtn] = useState(null);

  useEffect(() => {
    if (
      rider?.session === "available" ||
      rider?.session === "out for delivery"
    ) {
      setSessionBtn(true);
    }
  }, [rider]);

  async function handleOk() {
    setIsModalOpen(false);

    try {
      axios
        .put(
          `${apiPath}/rider/update-session/${rider.id}?session=Available`,
          {},
          {
            headers: {
              "x-auth-token": apiAuthToken,
            },
          }
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      throw new Error(error);
    }
  }

  function handleCancel() {
    setIsModalOpen(false);
  }
  async function handleStartSession() {
    setIsModalOpen(true);
  }

  return (
    <PrivateRoute>
      <RiderLayout>
        <div className="w-full ">
          <div>
            <div
              id="google-maps-display"
              className="w-full mx-auto mt-12 h-[80vh]"
            >
              <HomeMap />
            </div>
          </div>
        </div>
      </RiderLayout>
    </PrivateRoute>
  );
}
