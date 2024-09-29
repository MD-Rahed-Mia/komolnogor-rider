import React, { useState } from "react";
import RiderLayout from "./layout/RiderLayout";
import { Input, Button } from "antd";
import { apiPath } from "../../secret";
import { useAuth } from "../authContext/authProvider";
import { toast } from "alert";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const { rider } = useAuth();

  // handle password change
  async function handleChangePassword() {
    if (
      formData?.password.length < 6 ||
      formData?.confirmPassword.length < 6 ||
      formData?.newPassword.length < 6
    ) {
      return toast("Password is more than 6 digits.");
    }

    if(formData?.newPassword !== formData?.confirmPassword){
      return toast("confirm password not match.");
    }

    try {
      const apiResponse = await fetch(`${apiPath}/rider/change-password`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          riderId: rider?.id,
        }),
      });

      const result = await apiResponse.json();

      if (result) {
        toast(result?.message);
      }
    } catch (error) {
      console.log(`there is an erro: `, error);
    }
  }

  return (
    <RiderLayout>
      <div className="w-full flex items-center justify-center gap-8 flex-col min-h-[80vh]">
        <h1 className="text-center font-bold text-blue-500 text-2xl">
          Change Password
        </h1>

        <form className="w-full">
          <Input
            placeholder="Current Password"
            className="w-4/5 block mt-4 mx-auto"
            type="password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          <Input
            placeholder="New Password"
            className="w-4/5 block mt-4 mx-auto"
            type="password"
            value={formData.newPassword}
            onChange={(e) => {
              setFormData({ ...formData, newPassword: e.target.value });
            }}
          />
          <Input
            placeholder="Confirm Password"
            className="w-4/5 block mt-4 mx-auto"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) => {
              setFormData({ ...formData, confirmPassword: e.target.value });
            }}
          />
          <div className="w-3/5 mx-auto mt-4 flex items-center justify-center">
            <Button
              type="button"
              onClick={handleChangePassword}
              className="text-white bg-blue-500 px-8 py-2"
            >
              Change Password
            </Button>
          </div>
        </form>
      </div>
    </RiderLayout>
  );
}
