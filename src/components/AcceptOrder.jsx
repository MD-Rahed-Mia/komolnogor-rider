import React, { useEffect, useState } from "react";
import { Button, Card, Space } from "antd";
import axios from "axios";
import { apiAuthToken, apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import { toast } from "alert";

//
export default function AcceptOrder({ currentOrder, setAcceptOrderData }) {
  const { localRider } = useAuth();

  // useEffect(() => {
  //   async function reAssignRider() {
  //     const apiResponse = await fetch(
  //       `${apiPath}/rider/re-assign-new-rider?orderId=${currentOrder._id}&riderId=${localRider.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "x-auth-token": apiAuthToken,
  //         },
  //       }
  //     );
  //     const result = await apiResponse.json();
  //   }
  // });

  async function handleAccepOrder(orderId) {
    try {
      const apiResponse = await fetch(
        `${apiPath}/rider/assign-rider?orderId=${orderId}&riderId=${localRider.id}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": apiAuthToken,
          },
        }
      );
      const result = await apiResponse.json();

      if (result) {
        toast("order accepted.");
        setAcceptOrderData(null);
      }
    } catch (error) {
      console.log("there is an error: ", error);
    }
  }

  // handle reject order
  async function handleRejectOrder() {
    console.log(localRider);
    try {
      const apiResponse = await fetch(
        `${apiPath}/rider/re-assign-new-rider?orderId=${currentOrder._id}&riderId=${localRider.id}`,
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
      toast("failed to reject order.");
    }
  }

  return (
    <div className="w-full items-center justify-center flex h-[80vh] fixed top-0 left-0 bg-white z-50">
      <div className="px-8 py-2 bg-blue-500 text-white rounded-sm text-3xl absolute top-20 right-8"></div>

      <Space direction="vertical" size={16}>
        <Card
          title="You have new order"
          style={{
            width: "95%",
            margin: "0 auto",
          }}
        >
          <p className=" mt-2 font-bold">
            Order ID:{" "}
            <span className="font-bold text-blue-500 uppercase">
              {currentOrder._id}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Restaurant ID:{" "}
            <span className="font-bold text-blue-500">
              {currentOrder.restaurantId}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Pickup Location:{" "}
            <span className="font-bold text-blue-500">
              {currentOrder.restaurantLocation}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Drop Location:{" "}
            <span className="font-bold text-blue-500">
              {" "}
              {currentOrder.dropLocation}
            </span>
          </p>
          <div>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="border px-2 py-1 text-center">Items Name</th>
                  <th className="border px-2 py-1 text-center">Quanity</th>
                  <th className="border px-2 py-1 text-center">Price</th>
                </tr>
              </thead>
              <tbody>
                {currentOrder.items.map((item, index) => {
                  return (
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
                  );
                })}
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
              onClick={() => handleAccepOrder(currentOrder._id)}
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
