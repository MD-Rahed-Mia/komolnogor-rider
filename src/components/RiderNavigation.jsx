import React, { useState } from "react";
import { CiHome } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { TbTruckDelivery } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import MenuContainer from "./Menu";

export default function RiderNavigation() {
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div>
      <div className="absolute bottom-0 left-0 min-h-[60px] bg-pink-600 w-full grid grid-cols-4 place-content-center justify-items-center">
        <NavLink
          to={"/"}
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#1677ff" : "gray",
            };
          }}
          className="text-xl cursor-pointer text-white w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <CiHome />
        </NavLink>
        <NavLink
          to={"/rider/order-waiting"}
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#1677ff" : "gray",
            };
          }}
          className="text-xl cursor-pointer text-white w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <CiDeliveryTruck />
        </NavLink>
        <NavLink
          to={"/rider/current-order"}
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#1677ff" : "gray",
            };
          }}
          className="text-xl cursor-pointer text-white w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <TbTruckDelivery />
        </NavLink>
        <NavLink
          onClick={() => setIsMenu(!isMenu)}
          style={({ isActive }) => {
            return {
              backgroundColor: isActive ? "#1677ff" : "gray",
            };
          }}
          className="text-xl cursor-pointer text-white w-10 h-10 rounded-full bg-white flex items-center justify-center"
        >
          <FaRegUser />
        </NavLink>
      </div>

      {isMenu ? (
        <MenuContainer />
      ) : null}
    </div>
  );
}
