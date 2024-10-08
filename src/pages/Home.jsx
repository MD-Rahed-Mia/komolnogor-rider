import React, { useEffect, useState } from "react";
import PrivateRoute from "../authContext/PrivateRoute";
import RiderLayout from "./layout/RiderLayout";
import { useAuth } from "../authContext/authProvider";

import { Button, Modal } from "antd";
import axios from "axios";
import { apiAuthToken, apiPath } from "../../secret";
import useFetch from "../customHooks/useFetch";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rider } = useAuth();

  console.log("Home");

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
          <h1 className="text-3xl font-extrabold text-center my-32">
            Are you ready for delivery?
          </h1>

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
        </div>
      </RiderLayout>
    </PrivateRoute>
  );
}
