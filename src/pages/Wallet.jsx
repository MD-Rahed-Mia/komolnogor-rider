import React, { useEffect, useState } from "react";
import Layout from "./layout/RiderLayout";
import RecentTransactionCard from "../components/RecentTransactionCard";
import useFetch from "../customHooks/useFetch";
import { useAuth } from "../authContext/authProvider";
import Loading from "../components/Loading";

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const { rider } = useAuth();
  const { loading, data } = useFetch(`/wallet/rider-wallet/${rider.id}`);

  useEffect(() => {
    setWallet(data?.result);
  }, [data]);

  return (
    <Layout>
      {loading ? (
        <Loading />
      ) : (
        <div>
          <div className="w-4/5 mx-auto min-h-32 border-2 p-4 rounded-md mt-8">
            <h1 className="text-5xl text-gray-700 text-center font-extrabold mt-4">
              BDT {wallet?.walletBalance}
            </h1>
          </div>

          <div>
            {wallet &&
              wallet?.transactionHistory.map((history, index) => {
                return <RecentTransactionCard key={index} history={history}/>;
              })}

            {wallet && wallet?.transactionHistory.length == 0 ? (
              <h1 className="text-3xl text-gray-500 text-center font-extrabold  mt-12">
                Currently no history found.
              </h1>
            ) : null}
          </div>
        </div>
      )}
    </Layout>
  );
}
