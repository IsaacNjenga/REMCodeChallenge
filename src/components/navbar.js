import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router-dom";

const { Content } = Layout;
function Navbar() {
  return (
    <>
      <Layout>
        <Content style={{ minHeight: "calc(100vh - 64px - 70px)" }}>
          <Outlet />
        </Content>
      </Layout>
    </>
  );
}

export default Navbar;
