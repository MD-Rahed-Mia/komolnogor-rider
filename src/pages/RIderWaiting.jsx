import React, { useEffect, useState } from "react";
import RiderLayout from "./layout/RiderLayout";

import AcceptOrder from "../components/AcceptOrder";
import Loading from "../components/Loading";
import { apiPath, socketServer } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import axios from "axios";
import InTransit from "../components/InTransitOrder";
import { io } from "socket.io-client";

export default function RIderWaiting() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [inTransitOrder, setInTransitOrder] = useState(null);

  const { localRider, rider } = useAuth();

  useEffect(() => {
    async function fetchRiderCurrentOrder() {
      try {
        const apiResponse = await fetch(
          `${apiPath}/rider/current-order/${localRider?.id}`,
          {
            method: "GET",
          }
        );

        const result = await apiResponse.json();
        console.log(result)
        if(result?.success){
          setInTransitOrder(result?.order);
        }
        else {
          setInTransitOrder(null)
        }
      } catch (error) {
        console.log("there is an error.", error);
      }
    }
    fetchRiderCurrentOrder();
  }, []);

  useEffect(() => {
    const socket = io(socketServer, {
      auth: {
        token: localRider?.token,
      },
    });

    socket.emit("auth", localRider?.id);

    //recieve current or from customer directly
    socket.on("riderRecievedNewOrder", (data) => {
      console.log(data);
      setCurrentOrder(data);
    });
  }, []);

  return (
    <RiderLayout>
      {currentOrder && currentOrder !== null ? (
        <AcceptOrder currentOrder={currentOrder} />
      ) : inTransitOrder !== null ? (
        <InTransit inTransitOrder={inTransitOrder} setInTransitOrder={setInTransitOrder}/>
      ) : (
        <Loading />
      )}
    </RiderLayout>
  );
}
