import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/actions/userActions";
import { AppState } from "../store";
import { Redirect } from "react-router";

export default function Logout() {
  const { data } = useSelector((state: AppState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(logout());
  }, []);
  if (!data.username) return <Redirect to="/login"></Redirect>;
  return <div>Logging out...</div>;
}
