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
  const { localRider } = useAuth();
  const socket = useSocket();

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

        console.log(result)

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

  // Authenticate with the socket and set up event listeners
  useEffect(() => {
    if (!socket || !localRider?.id) return;
    // Emit the authentication event
    socket.emit("auth", localRider.id);
  }, [socket, localRider]);

  if (socket) {
    // Listener for new orders
    const handleNewOrder = (data) => {
      console.log("Received new order:", data);
      setCurrentOrder(data);
    };

    socket.on("riderRecievedNewOrder", handleNewOrder);
  }

  return (
    <RiderLayout>
      {currentOrder ? (
        <AcceptOrder currentOrder={currentOrder} />
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
