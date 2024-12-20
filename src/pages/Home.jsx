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
        <div className="w-full">
          <div>
            <ActiveStatus />
          </div>

          <div>
            <img
              src="/images/delivery_man.png"
              className="w-2/5 mx-auto block mt-5"
              alt="delivery man"
            />
          </div>

          <div>
            <div className="w-[300px] mx-auto mt-12 h-[380px]">
              <div
                id="google-maps-display"
                className="w-[300px] mx-auto mt-12 h-[380px]"
              >
                {/* <iframe
                  aria-controls="true"
                  src="https://www.google.com/maps/embed/v1/place?q=chattogram&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                ></iframe> */}

                <HomeMap />

                {/* <TrackOrderMap /> */}
              </div>
            </div>
          </div>
        </div>
      </RiderLayout>
    </PrivateRoute>
  );
}
