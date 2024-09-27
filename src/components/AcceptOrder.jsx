import React from "react";
import { Button, Card, Space } from "antd";
import axios from "axios";
import { apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import { toast } from "alert";
import { useNavigate } from "react-router-dom";

export default function AcceptOrder({
  currentOrder,
}) {
  const { localRider } = useAuth();

  const Navigate = useNavigate();

  async function handleAccepOrder(orderId) {
    try {
      axios
        .put(`${apiPath}/rider//assign-rider/${orderId}/${localRider?.id}`)
        .then((res) => {
          console.log("rider assign successful.");
          toast("You have accept an order.");
          location.reload();
        });
    } catch (error) {
      console.log("there is an error: ", error);
    }
  }

  return (
    <div className="w-full items-center justify-center flex h-[80vh]">
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
              <tr>
                <th className="border px-2 py-1 text-center">Items Name</th>
                <th className="border px-2 py-1 text-center">Quanity</th>
                <th className="border px-2 py-1 text-center">Price</th>
              </tr>
              <tbody>
                {currentOrder.items.map((item, index) => {
                  return (
                    <tr>
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
            <Button className="text-white bg-red-400">Decline</Button>
          </div>
        </Card>
      </Space>
    </div>
  );
}
