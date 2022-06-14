import React, { useEffect } from "react";
import { Menu } from "antd";
import { isLoggedIn } from "../store/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "../store";
import { Link, useLocation } from "react-router-dom";
import {
  FundOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  UserAddOutlined,
  LoginOutlined,
} from "@ant-design/icons";

export default function AppHeader() {
  const { data, loading, error } = useSelector((state: AppState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
  }, []);

  const { pathname } = useLocation();

  return data.username ? (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      selectedKeys={[pathname]}
      style={{ justifyContent: "flex-end" }}
    >
      <Menu.Item key="/records">
        <Link to="/records">
          <FundOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="/categories">
        <Link to="/categories">
          <UnorderedListOutlined />
        </Link>
      </Menu.Item>
      <Menu.Item key="/logout">
        <Link to="/logout">
          <LogoutOutlined />
        </Link>
      </Menu.Item>
    </Menu>
  ) : pathname === "/login" ? (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      selectedKeys={[pathname]}
      style={{ justifyContent: "flex-end" }}
    >
      <Menu.Item key="/register">
        <Link to="/register">
          <UserAddOutlined />
        </Link>
      </Menu.Item>
    </Menu>
  ) : pathname === "/register" ? (
    <Menu
      theme="dark"
      mode="horizontal"
      defaultSelectedKeys={["1"]}
      selectedKeys={[pathname]}
      style={{ justifyContent: "flex-end" }}
    >
      <Menu.Item key="/login">
        <Link to="/login">
          <LoginOutlined />
        </Link>
      </Menu.Item>
    </Menu>
  ) : null;
}
