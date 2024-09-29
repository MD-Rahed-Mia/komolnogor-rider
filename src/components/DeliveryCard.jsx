import React from "react";
import { Card } from "antd";

export default function DeliveryCard({ order }) {
  return (
    <Card
      title=""
      bordered={true}
      style={{ width: "90%", margin: "32px auto" }}
    >
      <p className="font-bold text-gray-600">
        Order ID: <span>{order?._id}</span>
      </p>
      <p className="font-bold text-gray-600">
        Restaurant ID: <span>{order?.restaurantId}</span>
      </p>
      <p className="font-bold text-gray-600">
        Pickup Location: <span>{order?.restaurantLocation}</span>
      </p>
      <p className="font-bold text-gray-600">
        Drop Location: <span>{order?.dropLocation}</span>
      </p>
      <p className="font-bold text-gray-600">
        Total amount:{" "}
        <span className="text-lg font-bold">BDT {order?.totalAmount}</span>
      </p>
      <p className="font-bold text-gray-600">
        Delivery amount:{" "}
        <span className="text-lg font-bold">BDT {order?.deliveryAmount}</span>
      </p>
      <p className="font-bold text-gray-600">
        Last update: <span>{order?.orderDate}</span>
      </p>
      <p className="font-bold text-gray-600 mt-4">
        Status:{" "}
        <span className="text-white bg-blue-500 px-8 py-2 rounded-md mt-3">
          {order?.status}
        </span>
      </p>
    </Card>
  );
}
