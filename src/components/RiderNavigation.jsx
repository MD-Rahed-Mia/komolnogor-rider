import React, { useState } from "react";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import MenuContainer from "./Menu";
import { IoMdNotifications } from "react-icons/io";

export default function RiderNavigation() {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div>
      <div className="fixed bg-white bottom-0 left-0 min-h-[60px] shadow-lg border w-full grid grid-cols-4 place-content-center justify-items-center">
        <NavLink
          to={"/"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#1677ff" : "#89A8B2",
            };
          }}
          className="text-xl cursor-pointer text-[#89A8B2] w-10 h-10  flex items-center justify-center"
        >
          <CiHome />
        </NavLink>
        <NavLink
          to={"/rider/order-waiting"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#1677ff" : "#89A8B2",
            };
          }}
          className="text-xl cursor-pointer text-[#89A8B2] w-10 h-10  flex items-center justify-center"
        >
          <CiDeliveryTruck />
        </NavLink>
        <NavLink
          to={"/recent-deliveries"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#1677ff" : "#89A8B2",
            };
          }}
          className="text-xl cursor-pointer text-[#89A8B2] w-10 h-10   flex items-center justify-center"
        >
          <TbTruckDelivery />
        </NavLink>

        {/* <NavLink
        to={"/notification"}
          style={({ isActive }) => {
            return {
              color: isActive ? "#1677ff" : "#89A8B2",
            };
          }}
          className="text-xl cursor-pointer text-[#89A8B2] w-10 h-10  flex items-center justify-center"
        >
          <IoMdNotifications />
        </NavLink> */}

        <NavLink
          onClick={() => setIsMenu(!isMenu)}
          style={({ isActive }) => {
            return {
              color: isActive ? "#1677ff" : "#89A8B2",
            };
          }}
          className="text-xl cursor-pointer text-[#89A8B2] w-10 h-10  flex items-center justify-center"
        >
          <FaRegUser />
        </NavLink>
      </div>

      {isMenu ? <MenuContainer setIsMenu={setIsMenu} isMenu={isMenu} /> : null}
    </div>
  );
}
