import React, { useEffect, useState } from "react";
import RiderLayout from "./layout/RiderLayout";
import AcceptOrder from "../components/AcceptOrder";
import Loading from "../components/Loading";
import { apiAuthToken, apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import InTransit from "../components/InTransitOrder";
import { useSocket } from "../authContext/socketProvider";

export default function Waiting() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [inTransitOrder, setInTransitOrder] = useState(null);
  const { localRider, rider } = useAuth();
  const socket = useSocket();

  let [timer, setTimer] = useState(15);

  // Fetch the current order for the rider
  useEffect(() => {
    async function fetchRiderCurrentOrder() {
      try {
        const apiResponse = await fetch(
          `${apiPath}/rider/current-order/${localRider?.id}`,
          {
            method: "GET",
            headers: {
              "x-auth-token": apiAuthToken,
            },
          }
        );
        const result = await apiResponse.json();

        if (result?.success) {
          setInTransitOrder(result?.order);
        } else {
          setInTransitOrder(null);
        }
      } catch (error) {
        console.error("Error fetching current order:", error);
      }
    }
    fetchRiderCurrentOrder();
  }, [localRider]);



  if (socket) {
    // Listener for new orders
    const handleNewOrder = (data) => {
      console.log("Received new order:", data);
      setCurrentOrder(data);
      activeTimer();
    };

    socket.on("riderRecievedNewOrder", handleNewOrder);
  }
  
  function activeTimer() {
    let intervalId = setInterval(() => {
      timer--;
      setTimer(timer);
    }, 1000);
  }

  return (
    <RiderLayout>
      <div className="text-white w-fit px-12 py-2 rounded-sm bg-blue-500 mx-auto mt-12">
        session: {rider.session}
      </div>

      {currentOrder ? (
        <AcceptOrder
          currentOrder={currentOrder}
          timer={timer}
          setTimer={setTimer}
          setCurrentOrder={setCurrentOrder}
        />
      ) : inTransitOrder ? (
        <InTransit
          inTransitOrder={inTransitOrder}
          setInTransitOrder={setInTransitOrder}
        />
      ) : (
        <Loading />
      )}
    </RiderLayout>
  );
}
