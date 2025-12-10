import React from "react";
import Topheader from "../components/topheader/Topheader";
import Header from "../header/Header";
import MarqueeTag from "../components/marqueetag/MarqueeTag";
import { Outlet } from "react-router";

const RootLayout = () => {
  return (
    <div>
      <Topheader></Topheader>
      <Header></Header>
      <MarqueeTag></MarqueeTag>
      <Outlet></Outlet>
    </div>
  );
};

export default RootLayout;
