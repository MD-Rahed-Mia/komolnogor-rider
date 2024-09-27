import React from "react";

import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";

const items = [
  {
    key: "sub1",
    label: "Choose your option",
    icon: <AppstoreOutlined />,
    children: [
      {
        key: "5",
        label: "Profile",
      },
      {
        key: "6",
        label: "Recent Delivery",
      },
      {
        key: "7",
        label: "Change password",
      },

      {
        key: "8",
        label: "Contact Support",
      },
      {
        key: "9",
        label: "Wallet",
      },
      {
        key: "10",
        label: "Log out",
      },
    
    ],
  },
  
];

export default function MenuContainer() {

  const onClick = (e) => {
    console.log("click ", e);

    console.log(e.key)
    if(e.key == 10){
        localStorage.removeItem("rider");
    }
  };

  return (
    <>
      <div className="w-full min-h-screen absolute left-0 bottom-[60px] bg-black bg-opacity-40">
        <div className="w-4/5 min-h-[90vh] bg-white absolute bottom-0 right-0">
          <Menu
            onClick={onClick}
            style={{
              width: 256,
            }}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            items={items}
          />
        </div>
      </div>
    </>
  );
}
