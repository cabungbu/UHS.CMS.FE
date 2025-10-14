"use client";

import { Layout } from "antd";
import { useState } from "react";
import { AdminSidebar } from "./AdminSidebar";
import ThemeToggle from "./Header";

const { Sider, Header, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={240}
        style={{
          backgroundColor: "var(--sidebar-bg)",
          borderRight: "1px solid var(--border-color)",
          transition: "all 0.3s ease",
        }}
      >
        <AdminSidebar
          collapsed={collapsed}
          setCollapse={() => setCollapsed(!collapsed)}
        />
      </Sider>

      {/* Main layout */}
      <Layout style={{ backgroundColor: "var(--background)", padding: "15px" }}>
        <ThemeToggle />

        {/* Content */}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
