import React from "react";

import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Mosaic, ThreeDot } from "react-loading-indicators";
export default function Loading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center flex-col">
      <div>
        <h1 className="text-xl my-8 font-extrabold text-blue-500 ">
          Please wait
        </h1>
      </div>
      <Flex align="center" gap="middle">
        {/* <Spin
          indicator={
            <LoadingOutlined
              spin
              style={{
                fontSize: 50,
              }}
            />
          }
          size="large"
        /> */}

        <ThreeDot color="#32cd32" size="small" text="" textColor="" />
      </Flex>
    </div>
  );
}
