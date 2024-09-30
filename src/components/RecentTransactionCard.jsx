import React from "react";
import { Card } from "antd";

export default function RecentTransactionCard({ history }) {
  return (
    <div>
      <Card
       
        style={{
          width: "80%",
          margin: "32px auto",
        }}
      >
        <h1>Transaction ID: <span>{history?._id}</span></h1>
        <h1>
          Total Amount: <span>BDT {history?.amount}</span>
        </h1>
        <h1>
          Delivery Type: <span>{history?.type}</span>
        </h1>
        <h1>
          Date & Time: <span>{history?.timestamp}</span>
        </h1>
      </Card>
    </div>
  );
}
