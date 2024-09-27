import React from 'react'

import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
export default function Loading() {
  return (
    <div className="w-full h-[80vh] flex items-center justify-center flex-col">
          <div>
            <h1 className="text-xl my-8 font-extrabold text-blue-500 ">
              Please wait for new order
            </h1>
          </div>
          <Flex align="center" gap="middle">
            <Spin
              indicator={
                <LoadingOutlined
                  spin
                  style={{
                    fontSize: 80,
                  }}
                />
              }
              size="large"
            />
          </Flex>
        </div>
  )
}
