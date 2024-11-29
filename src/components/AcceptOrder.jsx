import React, { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import { apiAuthToken, apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import { toast } from "alert";
import { useNavigate } from "react-router-dom";

export default function AcceptOrder({ currentOrder, setAcceptOrderData }) {
  const { id } = useAuth();
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalId);

          toast("Time is up!");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if ("vibrate" in navigator) {
      navigator.vibrate(1000);
    } else {
      console.log("user browser does not support vibrate.");
    }

    navigator.mediaDevices.getUserMedia({ audio: true, video: true });

    if (currentOrder) {
      const audio = document.querySelector("#newOrderNotification");
      audio.play();
    }
  }, [currentOrder]);

  async function handleAcceptOrder(orderId) {
    try {
      const apiResponse = await fetch(
        `${apiPath}/rider/assign-rider?orderId=${orderId}&riderId=${id}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": apiAuthToken,
          },
        }
      );
      const result = await apiResponse.json();

      if (result) {
        toast("Order accepted.");
        setAcceptOrderData(null);
      }
    } catch (error) {
      console.log("There is an error: ", error);
    }
  }

  async function handleRejectOrder() {
    try {
      const apiResponse = await fetch(
        `${apiPath}/rider/re-assign-new-rider?orderId=${currentOrder._id}&riderId=${id}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": apiAuthToken,
          },
        }
      );
      const result = await apiResponse.json();

      if (result) {
        toast(result?.message);
        setAcceptOrderData(null);
      }
    } catch (error) {
      console.log(error);
      toast("Failed to reject order.");
    }
  }

  useEffect(() => {
    async function reAssignRiderNow() {
      try {
        const apiResponse = await fetch(
          `${apiPath}/rider/re-assign-new-rider?orderId=${currentOrder._id}&riderId=${id}`,
          {
            method: "PUT",
            headers: {
              "x-auth-token": apiAuthToken,
            },
          }
        );
        const result = await apiResponse.json();

        if (result) {
          toast(result?.message);
          setAcceptOrderData(null);
        }
      } catch (error) {
        console.log(error);
        toast("Failed to reject order.");
      }
    }
    if (timer <= 1) {
      reAssignRiderNow();
    }
  }, [timer]);

  return (
    <div className="w-full items-center justify-center flex h-[80vh] flex-col fixed top-0 left-0 bg-white z-50">
      <div className="px-8 py-2 bg-blue-500 text-white rounded-sm text-3xl">
        {timer}
      </div>

      <div>
        <audio src="/new_order_sound.wav" id="newOrderNotification"></audio>
      </div>

      <Space direction="vertical" size={16}>
        <Card
          title="You have a new order"
          style={{
            width: "95%",
            margin: "0 auto",
          }}
        >
          <p className="mt-2 font-bold">
            Order ID:{" "}
            <span className="font-bold text-blue-500 uppercase">
              {currentOrder._id}
            </span>
          </p>
          <p className="mt-2 font-bold">
            Restaurant ID:{" "}
            <span className="font-bold text-blue-500">
              {currentOrder.restaurantId}
            </span>
          </p>
          <p className="mt-2 font-bold">
            Pickup Location:{" "}
            <span className="font-bold text-blue-500">
              {currentOrder.restaurantLocation}
            </span>
          </p>
          <p className="mt-2 font-bold">
            Drop Location:{" "}
            <span className="font-bold text-blue-500">
              {currentOrder.dropLocation}
            </span>
          </p>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-center">Items Name</th>
                  <th className="border px-2 py-1 text-center">Quantity</th>
                  <th className="border px-2 py-1 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.items.map((item, index) => (
                  <tr key={index}>
                    <td className="border px-2 py-1 text-center">
                      {item.name}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.quantity}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h1 className="text-xl my-4 font-bold">
              Total Amount: <span>{currentOrder.totalAmount}</span>
            </h1>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-center text-blue-500">
              BDT <span>45</span>
            </h1>
          </div>
          <div className="flex items-center justify-center gap-4 mt-4">
            <Button
              className="bg-blue-500 text-white"
              onClick={() => handleAcceptOrder(currentOrder._id)}
            >
              Accept
            </Button>
            <Button
              className="text-white bg-red-400"
              onClick={handleRejectOrder}
            >
              Reject
            </Button>
          </div>
        </Card>
      </Space>
    </div>
  );
}
