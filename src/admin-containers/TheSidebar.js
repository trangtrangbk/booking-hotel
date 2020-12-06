import React from "react";
import { NavLink } from "react-router-dom";
import { Feather } from "../components";
const TheSidebar = () => {
  return (
    <div className="sidebar">
      <NavLink exact={true} to="/admin">
        <Feather name="Grid" />
        <span>Dashboard</span>
      </NavLink>
      <NavLink to="/admin/accounts">
        <Feather name="User" />
        <span>Accounts</span>
      </NavLink>
      <NavLink to="/admin/admins">
        <Feather name="Users" />
        <span>Admins</span>
      </NavLink>
    </div>
  );
};

export default TheSidebar;
