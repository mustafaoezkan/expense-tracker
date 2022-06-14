import { Form, Input, Button, Col } from "antd";
import { useHistory } from "react-router";
import api from "../utils/api";
import React from "react";
import showError from "../utils/showError";

function SignUp() {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  /* eslint-enable no-template-curly-in-string */

  const history = useHistory();

  const onFinish = async (values: any) => {
    try {
      await api().post("/users/register", values);
      history.push("/login", { newSignUp: true });
    } catch (error) {
      console.log({ error });
      showError(error as any);
    }
  };
  return (
    <Col span={24}>
      <div style={{ padding: "5rem", background: "white" }}>
        <Form
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
          validateMessages={validateMessages}
        >
          <h2 style={{ textAlign: "center", marginBottom: 20 }}>
            Register for an acoount
          </h2>
          <Form.Item
            name="username"
            label="Username"
            rules={[{ required: true }]}
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
                min: 6,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ type: "email", required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="full_name" label="Full Name">
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Col>
  );
}

export default SignUp;
