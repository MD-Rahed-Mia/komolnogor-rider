import React from "react";
import RiderLayout from "./layout/RiderLayout";
import DeliveryCard from "../components/DeliveryCard";
import useFetch from "../customHooks/useFetch";
import Loading from "../components/Loading";
import { useAuth } from "../authContext/authProvider";

export default function RecentDeliveries() {
  const { rider } = useAuth();

  const { data, loading } = useFetch(`/rider/recent-deliveries/${rider?.id}`, {
    method: "GET",
    headers: {
      "content-type": "application/josn",
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
          <h1 className="mt-8 font-bold text-center text-3xl w-3/5 mx-auto">
            Currently no order found.
          </h1>
        ) : (
          data?.orderList.map((order, index) => {
            return <DeliveryCard order={order} key={index} />;
          })
        )}
      </div>
    </RiderLayout>
  );
}
