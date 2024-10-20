import React, { useEffect, useState } from "react";
import PrivateRoute from "../authContext/PrivateRoute";
import RiderLayout from "./layout/RiderLayout";
import { useAuth } from "../authContext/authProvider";

import { Button, Modal } from "antd";
import axios from "axios";
import { apiAuthToken, apiPath } from "../../secret";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rider } = useAuth();
  const [sessionBtn, setSessionBtn] = useState(null);

  useEffect(() => {
    if (
      rider?.session === "Available" ||
      rider?.session === "Out For Delivery"
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
            <img
              src="/images/delivery_man.png"
              className="w-2/5 mx-auto block mt-5"
              alt="delivery man"
            />
          </div>

          <div>
            <div className="mx-auto text-center my-4">
              session:{" "}
              <span className="px-4 py-1 text-white bg-blue-500 rounded-md">
                {rider?.session}
              </span>
            </div>
            <Button
              type="primary"
              className="mx-auto block"
              disabled={sessionBtn}
              onClick={handleStartSession}
            >
              Start Session
            </Button>
            <Modal
              title="Start session"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
            >
              <p>Are you sure to start your session?</p>
            </Modal>
          </div>

          <div>
            <div className="w-[300px] mx-auto mt-12 h-[380px]">
              <div id="google-maps-display" className="w-[300px] mx-auto mt-12 h-[380px]">
                <iframe
                aria-controls="true"
                  src="https://www.google.com/maps/embed/v1/place?q=chattogram&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </RiderLayout>
    </PrivateRoute>
  );
}
