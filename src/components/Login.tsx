import React, { useEffect } from "react";
import { Form, Input, Button, Result, Col } from "antd";
import showError from "../utils/showError";
import { useHistory, useLocation } from "react-router";
import { LoginForm } from "../types/user";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/actions/userActions";
import { AppState } from "../store";
import showSuccess from "../utils/showSuccess";

function Login() {
  const history = useHistory();
  const location = useLocation<{ newSignUp?: boolean }>();
  const dispatch = useDispatch();

  const { data, error } = useSelector((state: AppState) => state.user);

  const onFinish = (values: LoginForm) => {
    dispatch(login(values));
  };

  useEffect(() => {
    error && showError(error as string);
  }, [error]);

  useEffect(() => {
    data.username &&
      showSuccess("You have successfully logged in! " + data.username);
  }, [data.username]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      history.push("/");
    }
  }, [data]);

  return (
    <>
      <Col span={24}>
        <div style={{ padding: "5rem", background: "white" }}>
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Please Login
            </h2>
            {location.state?.newSignUp && (
              <Result
                status="success"
                title="You successfully signed up. Please login using your credentials."
              />
            )}
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </>
  );
}

export default Login;
