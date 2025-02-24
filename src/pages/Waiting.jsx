import React, { useEffect, useMemo, useState } from "react";
import RiderLayout from "./layout/RiderLayout";
import AcceptOrder from "../components/AcceptOrder";
import Loading from "../components/Loading";
import { apiAuthToken, apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import InTransit from "../components/InTransitOrder";
import { useSocket } from "../authContext/socketProvider";
import ActiveStatus from "../components/home/ActiveStatus";
import AxiosIntances from "../utils/AxiosInstances";
import { toast } from "alert";

export default function Waiting() {
  const [currentOrder, setCurrentOrder] = useState(null);
  const [inTransitOrder, setInTransitOrder] = useState(null);
  const { id, rider } = useAuth();
  const { socket } = useSocket();

  let [timer, setTimer] = useState(15);

  // Fetch the current order for the rider
  useMemo(() => {
    async function fetchRiderCurrentOrder() {
      try {
        const response = await AxiosIntances.get(
          `${apiPath}/rider/current-order/${id}`
        );

        console.log("current order is : ", response.data);

        const data = await response.data;

        if (data.success) {
          if (data.order.status === "Delivered") {
            setInTransitOrder(null);
          } else {
            setInTransitOrder(data.order);
          }
        }
      } catch (error) {
        console.log(error);
        if (error.response) {
          toast.success(error.response.data.result);
        }
      }
    }
    fetchRiderCurrentOrder();
  }, [id]);

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
      {/* <ActiveStatus /> */}

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
