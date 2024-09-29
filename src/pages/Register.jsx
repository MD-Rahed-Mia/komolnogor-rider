import React, { useEffect, useState } from "react";
import RiderLayout from "./layout/RiderLayout";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { toast } from "alert";
import { apiPath } from "../../secret";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    riderType: "Bicycle", // Default value
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (value) => {
    setFormData((prevData) => ({ ...prevData, riderType: value }));
  };

  async function handleRegisterForm(e) {
    e.preventDefault(); 

    if (
      formData.name.length < 3 ||
      formData.email.length < 8 ||
      formData.phoneNumber.length < 11 ||
      formData.address.length === 0 || 
      formData.riderType.length === 0 || 
      formData.password.length < 6
    ) {
      toast("Invalid rider details. Please input properly.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast("Password and confirm password do not match.");
      return;
    }

    try {
      const apiResponse = await fetch(`${apiPath}/rider/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await apiResponse.json();

      if (result) {
        if(result?.error.code === 11000){
          toast("Phone number or email already registered.");
          return;
        }
        toast(result.message);
        if (result.success) {
          navigate("/login");
        }
      }
    } catch (error) {
      console.error(`There is an error: ${error}`);

      console.log(result)
      toast("An error occurred. Please try again.");
    }
  }

  return (
    <RiderLayout>
      <div>
        <h1 className="text-2xl text-center my-8">Register as a Rider.</h1>
      </div>

      <div className="w-[80%] mx-auto">
        <form onSubmit={handleRegisterForm}>
          <div className="mt-4">
            <Input
              placeholder="Full Name"
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, name: e.target.value.trim() }))
              }
            />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Email"
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, email: e.target.value.trim() }))
              }
            />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Mobile Number"
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, phoneNumber: e.target.value.trim() }))
              }
            />
          </div>
          <div className="mt-4">
            <Input
              placeholder="Permanent Address"
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, address: e.target.value.trim() }))
              }
            />
          </div>

          <div className="mt-4">
            <h1 className="text-sm text-gray-500">Select Your Delivery Type</h1>
            <Select
              defaultValue="Bicycle"
              style={{ width: "100%", color: "gray" }}
              onChange={handleChange}
              options={[
                { value: "Bicycle", label: "Bicycle" },
                { value: "Bike", label: "Bike" },
              ]}
            />
          </div>

          <div className="mt-4">
            <Input.Password
              placeholder="Input Password"
              onChange={(e) =>
                setFormData((prevData) => ({ ...prevData, password: e.target.value.trim() }))
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="mt-4">
            <Input.Password
              placeholder="Confirm Password"
              onChange={(e) =>
                setFormData((prevData) => ({
                  ...prevData,
                  confirmPassword: e.target.value.trim(),
                }))
              }
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </div>
          <div className="mt-4">
            <Button
              type="primary"
              className="mx-auto block"
              htmlType="submit"
            >
              Register Account
            </Button>
          </div>
        </form>
      </div>
    </RiderLayout>
  );
}
