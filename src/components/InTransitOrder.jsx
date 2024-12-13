import React, { useEffect } from "react";

import { Button, Card, Space } from "antd";
import { apiAuthToken, apiPath, socketServer } from "../../secret";
import { toast } from "alert";
import { useAuth } from "../authContext/authProvider";
import { message, Popconfirm } from "antd";
import TrackOrder from "./TrackOrder";
import AxiosIntances from "../utils/AxiosInstances";
import { Link } from "react-router-dom";
import { BsFillChatLeftTextFill } from "react-icons/bs";
import { useSocket } from "../authContext/socketProvider";

export default function InTransit({ inTransitOrder, setInTransitOrder }) {
  const { socket } = useSocket();

  //handle pickup parcel
  async function handlePickupParcel(orderId) {
    try {
      const response = await AxiosIntances.put(
        `/delivery/picked-up?order-id=${orderId}`,
      );

      console.log(await response.data);

      const data = await response.data;

      if (data.success) {
        toast.success(data.message);

        socket.on("parcelPickUpByRider", data.order);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      // console.log(`there is an error: ${error}`);
      console.log(error.response);
      if (error.response) {
        const data = await error.response.data;
        toast.error(data.message);
      }
    }
  }

  // handle drop parcel
  async function handleDropParcel(orderId) {
    try {
      const apiResponse = await fetch(
        `${apiPath}/delivery/drop-parcel/${orderId}`,
        {
          method: "PUT",
          headers: {
            "x-auth-token": apiAuthToken,
          },
        },
      );
      const result = await apiResponse.json();

      console.log(result?.success);

      if (result?.success) {
        toast("Drop parcel successful");
        location.reload();
      }
    } catch (error) {
      console.log(`there is an error: ${error}`);
    }
  }

  const confirm = (e) => {
    console.log(e);
    message.success("Click on Yes");
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  return (
    <div className="w-full items-center justify-center flex min-h-[80vh] flex-col overflow-y-scroll">
      <Space direction="vertical" size={16}>
        <Card
          title="You have new order"
          style={{
            width: "95%",
            margin: "40px auto",
          }}
          className="border px-2 shadow-lg relative rounded-lg my-12"
        >
          <Link
            to={`/live-chat/${inTransitOrder._id}/${inTransitOrder.userId}`}
            className="absolute top-3 right-3 flex items-center justify-center gap-2"
          >
            <BsFillChatLeftTextFill /> chat
          </Link>

          <p className=" mt-2 font-bold">
            Order ID:{" "}
            <span className="font-bold text-blue-500 uppercase">
              {inTransitOrder._id}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Restaurant ID:{" "}
            <span className="font-bold text-blue-500">
              {inTransitOrder.restaurantId}
            </span>
          </p>

          <p className="font-bold">
            Status:{" "}
            <span className="text-white px-4 py-1 bg-blue-500">
              {inTransitOrder?.status}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Pickup Location:{" "}
            <span className="font-bold text-blue-500">
              {inTransitOrder.restaurantLocation}
            </span>
          </p>
          <p className=" mt-2 font-bold">
            Drop Location:{" "}
            <span className="font-bold text-blue-500">
              {" "}
              {inTransitOrder.dropLocation}
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
                {inTransitOrder.items.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="border px-2 py-1 text-center">
                        {item.name}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.quantity}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.offerPrice}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div>
            <h1 className="text-xl my-4 font-bold">
              Total Amount: <span>{inTransitOrder.totalAmount}</span>
            </h1>
          </div>
          {/* <div>
            <h1 className="text-3xl font-bold text-center text-blue-500">
              BDT <span>45</span>
            </h1>
          </div> */}

          <div className="flex items-center justify-center gap-4 mt-4">
            <div></div>

            {inTransitOrder.status === "ready for pickup" ? (
              <Popconfirm
                title="Picked up parcel"
                description="Are you sure to picked up this?"
                onConfirm={() => handlePickupParcel(inTransitOrder._id)}
                onCancel={cancel}
              >
                <Button>Pick up</Button>
              </Popconfirm>
            ) : inTransitOrder.status === "picked up" ? (
              <Popconfirm
                title="Picked up parcel"
                description="Are you sure to picked up this?"
                onConfirm={() => handleDropParcel(inTransitOrder._id)}
                onCancel={cancel}
              >
                <Button>Drop Parcel</Button>
              </Popconfirm>
            ) : null}
          </div>
        </Card>
      </Space>

      <div>
        <TrackOrder />
      </div>
    </div>
  );
}
