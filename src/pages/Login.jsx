import React, { useState, useEffect } from "react";
import { Button, Form, Input, Spin } from "antd";
import { apiAuthToken, apiPath } from "../../secret";
import { useNavigate } from "react-router-dom";
import { toast } from "alert";
import Cookies from "js-cookie";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  async function onFinish(values) {
    setLoading(true);
    try {
      const apiResponse = await fetch(`${apiPath}/rider/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": apiAuthToken,
        },
        body: JSON.stringify({
          email: values.email.trim(),
          password: values.password.trim(),
        }),
        credentials: "include",
      });

      const result = await apiResponse.json();

      console.log(result);

      if (result?.success) {
        localStorage.setItem("rider", JSON.stringify(result?.rider));

        console.log(result?.rider.token);
        Cookies.set("token", result?.rider.id, {
          secure: true,
          sameSite: "Lax",
        });

        navigate("/");
      } else {
        toast(result?.message || "Login failed.");
      }
    } catch (error) {
      console.error(`Error during login: ${error}`);
      toast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="w-full overflow-x-hidden h-screen flex items-center justify-center flex-col">
      <h1 className="text-4xl my-4 font-extrabold text-black text-center">
        Login as a Rider
      </h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div className="my-4">
          <h1>
            Not a rider?{" "}
            <a className="text-blue-500" href="/Register">
              Register now!
            </a>
          </h1>
        </div>

        <div className="flex items-center justify-center my-4 gap-4">
          {loading && <Spin tip="Loading" size="large" />}
        </div>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
