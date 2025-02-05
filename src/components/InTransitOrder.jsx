import React, { useEffect, useState } from "react";

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
import AddonList from "./AddonList";
import TrackOrderMap from "./maps/TrackOrderMap";
import TrackDropLocation from "./maps/TrackDropLocation";
import DottedBorder from "./DottedBorder";

export default function InTransit({ inTransitOrder, setInTransitOrder }) {
  const { socket } = useSocket();

  // addons
  const [addons, setAddons] = useState([]);

  useEffect(() => {
    if (inTransitOrder) {
      inTransitOrder?.items?.some((item) => {
        setAddons((prev) => [...prev, ...item.addons]);
      });
    }
  }, [inTransitOrder]);

  //handle pickup parcel
  async function handlePickupParcel(orderId) {
    try {
      const response = await AxiosIntances.put(
        `/delivery/picked-up?order-id=${orderId}`
      );

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
        }
      );
      const result = await apiResponse.json();

      console.log(result?.success);

      if (result?.success) {
        toast("Drop parcel successful");

        socket.emit("parcelDropOffByRider", result.result);

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
    <div className="w-full px-4 py-2 overflow-y-scroll h-[80vh]  items-center pt-8 justify-center flex   flex-col ">
      <Space direction="vertical" size={16}>
        {/* <p className=" mt-2 font-bold">
          R.ID:{" "}
          <span className="font-bold ">{inTransitOrder.restaurantId}</span>
        </p> */}
        <div className="grid grid-cols-2 gap-1 px-2">
          <div>
            <h1 className="text-center px-3 py-1 border border-purple-600 rounded-md text-purple-600 font-bold text-opacity-85">
              Pickup
            </h1>
            <p className="px-3 py-2 text-center">
              {inTransitOrder.restaurantLocation}
            </p>
          </div>
          <div>
            <h1 className="text-center px-3 py-1 border border-purple-600 rounded-md text-purple-600 font-bold text-opacity-85">
              Drop
            </h1>
            <p className="px-3 py-2 text-center">
              {inTransitOrder.dropLocation}
            </p>
          </div>
        </div>
        <DottedBorder />
        <div className="grid grid-cols-2 gap-1 px-2">
          <div>
            <h1 className="text-center px-3 py-1 border border-purple-600 rounded-md text-purple-600 font-bold text-opacity-85">
              Payment
            </h1>
            <p className="px-3 py-2 text-center">
              {inTransitOrder.riderFee.toFixed()} TK
            </p>
          </div>
          <div>
            <h1 className="text-center px-3 py-1 border border-purple-600 rounded-md text-purple-600 font-bold text-opacity-85">
              Tip
            </h1>
            <p className="px-3 py-2 text-center"> {inTransitOrder.tip} TK</p>
          </div>
        </div>

        <DottedBorder />

        <div className="grid grid-cols-2 gap-2">
          <p className="font-bold">
            <span className=" text-[13px] px-4 border py-1 text-orange-700">
              {inTransitOrder?.status}
            </span>
          </p>{" "}
          <p className="font-bold">
            <span className=" text-[13px] px-4 border py-1 text-blue-700">
              {inTransitOrder?.peymentMethod}
            </span>
          </p>
        </div>

        <div>
          <table className="w-full text-sm">
            <thead>
              <tr>
                <th className="border px-2 py-1 text-center">SL</th>
                <th className="border px-2 py-1 text-center">Item</th>
                <th className="border px-2 py-1 text-center">Quantity</th>
                {/* <th className="border px-2 py-1 text-center">Price</th>
                  <th className="border px-2 py-1 text-center">Sub Total</th> */}
              </tr>
            </thead>
            <tbody>
              {inTransitOrder.items.map((item, index) => {
                return (
                  <tr key={index}>
                    <td className="border px-2 py-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.name}
                    </td>
                    <td className="border px-2 py-1 text-center">
                      {item.quantity}
                    </td>
                    {/* <td className="border px-2 py-1 text-center">
                        {item.offerPrice}
                      </td>
                      <td className="border px-2 py-1 text-center">
                        {item.quantity * item.offerPrice}
                      </td> */}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {addons.length > 0 ? (
          <div>
            <h1>addons list</h1>
            <AddonList addons={addons} />
          </div>
        ) : null}

        <div>
          <h1 className="text-xl font-bold px-4 py-2 text-purple-600">
            Payable: <span>{inTransitOrder.totalAmount.toFixed()}</span>
          </h1>
        </div>
        {/* <div>
            <h1 className="text-3xl font-bold text-center text-blue-500">
              BDT <span>45</span>
            </h1>
          </div> */}
        <div className="flex items-center justify-center gap-4 ">
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
        <div className="flex items-center justify-evenly gap-3">
          <TrackDropLocation dropLocation={inTransitOrder.coords} />
          <Link
            to={`/live-chat/${inTransitOrder._id}/${inTransitOrder.userId}`}
            className="text-purple-600 border border-purple-600 px-4 py-1 rounded-md flex items-center justify-center gap-2"
          >
            <BsFillChatLeftTextFill /> chat
          </Link>
          <div>
            <a
              className="px-4 py-2 text-purple-600 border border-purple-600 rounded-md "
              href={`tel:${inTransitOrder.customerPhone}`}
            >
              Call now
            </a>
          </div>
        </div>
      </Space>
    </div>
  );
}
