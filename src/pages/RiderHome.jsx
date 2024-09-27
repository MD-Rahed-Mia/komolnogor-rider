import React, { useEffect, useState } from "react";
import PrivateRoute from "../authContext/PrivateRoute";
import RiderLayout from "./layout/RiderLayout";
import { useAuth } from "../authContext/authProvider";

import { Button, Modal } from "antd";
import axios from "axios";
import { apiPath } from "../../secret";
import { io } from "socket.io-client";

export default function RiderHome() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { rider } = useAuth();

  async function handleOk() {
    setIsModalOpen(false);

    try {
      axios
        .put(`${apiPath}/rider/update-session/${rider.id}?session=Available`)
        .then((res) => {
          
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



  // useEffect(() => {

  //   const socket = io("http://localhost:3000", {
  //     auth: {
  //       token : rider?.token
  //     }
  //   });

  //   socket.emit("auth", rider?.id);  

  // }, [rider?.id])


  return (
    <PrivateRoute>
      <RiderLayout>
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
      </RiderLayout>
    </PrivateRoute>
  );
}
