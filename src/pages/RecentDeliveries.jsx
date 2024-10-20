import React from "react";
import RiderLayout from "./layout/RiderLayout";
import DeliveryCard from "../components/DeliveryCard";
import useFetch from "../customHooks/useFetch";
import Loading from "../components/Loading";
import { useAuth } from "../authContext/authProvider";
import { apiAuthToken } from "../../secret";

export default function RecentDeliveries() {
  const { rider } = useAuth();

  const { data, loading } = useFetch(`/rider/recent-deliveries/${rider?.id}`, {
    method: "GET",
    headers: {
      "content-type": "application/josn",
      "x-auth-token": apiAuthToken,
    },
  });
  return (
    <RiderLayout>
      <h1 className="text-center mt-8 text-2xl font-extrabold">
        recent deliveries
      </h1>

      <div className="w-full h-[80vh] p-b-[200px] overflow-y-scroll">
        {loading ? (
          <Loading />
        ) : data?.orderList.length == 0 ? (
          <div className="mt-8 font-bold text-center w-3/5 mx-auto">
            <img src="/images/no_order.png" alt="no order" className="w-20 h-20 object-cover mx-auto mt-3"/>
            <h3>Sorry. No order found.</h3>
          </div>
        ) : (
          data?.orderList.map((order, index) => {
            return <DeliveryCard order={order} key={index} />;
          })
        )}
      </div>
    </RiderLayout>
  );
}
