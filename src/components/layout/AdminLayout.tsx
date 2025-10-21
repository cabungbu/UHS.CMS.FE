"use client";

import { Layout } from "antd";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AdminSidebar } from "./AdminSidebar";
import ThemeToggle from "./Header";

const { Sider, Content } = Layout;

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  // ✅ xác định route hiện tại
  const publicPaths = ["/login", "/callback"];
  const isPublic = publicPaths.some((p) => pathname.startsWith(p));

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      {!isPublic && (
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
      )}

      {/* Main layout */}
      <Layout style={{ backgroundColor: "var(--background)", padding: "15px" }}>
        {!isPublic && <ThemeToggle />}

        {/* Content */}
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
