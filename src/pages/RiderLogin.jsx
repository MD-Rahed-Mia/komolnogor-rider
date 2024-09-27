import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { apiPath } from "../../secret";

export default function RiderLogin() {
  const navigate = useNavigate();

  async function onFinish(values) {
    
    console.log("values are: ", values);

    try {
      const apiResponse = await fetch(`${apiPath}/rider/login`, {
        method: "POST",
        body: JSON.stringify({
          email: values.email,
          password: values.password
        })
      });

      const result = await apiResponse.json();

      console.log(result?.rider);
      
    } catch (error) {
      console.log(`there is an error: ${error}`);
    }

    // try {
    //   //  const apiResponse =
    //   axios
    //     .post("http://localhost:3000/api/rider/login", {
    //       email: values.email,
    //       password: values.password,
    //     })
    //     .then((response) => {
    //       console.log(response);
    //       const result = response?.data.rider;
    //       localStorage.setItem("rider", JSON.stringify(result));
    //       navigate("/");
    //     })
    //     .catch((error) => console.log(error));
    // } catch (error) {
    //   console.log(error);
    // }
  }

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <div className="w-full h-screen flex items-center justify-center flex-col">
        <h1 className="text-4xl my-4 font-extrabold text-black text-center">
          {" "}
          Login as a Rider
        </h1>
        <Form
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}
