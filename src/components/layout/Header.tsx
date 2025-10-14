"use client";

import { Flex, Switch, Avatar } from "antd";
import { useTheme } from "./ThemeContext";
import { useEffect, useState } from "react";
import { Space } from "antd";
import { useParams, usePathname } from "next/navigation";
import { sitemapMenu, adminMenu } from "./AdminSidebar";

export default function ThemeToggle() {
  const { currentTheme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const currentPage = sitemapMenu.find((item) =>
    pathname.startsWith(item.href)
  );

  const currentPageAdmin = adminMenu.find((item) =>
    pathname.startsWith(item.href)
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Flex
      align="center"
      justify="space-between"
      vertical={false}
      className="!mb-4"
    >
      {currentPage && <h2>{currentPage.title}</h2>}
      {currentPageAdmin && <h2>{currentPageAdmin.title}</h2>}
      <Flex
        gap="middle"
        align="center"
        justify="space-between"
        vertical={false}
      >
        <p>Hello Nga, Welcome back to Portal sysem !</p>
        <Space
          wrap
          size={16}
          className="bg-[var(--sidebar-bg)] px-4 py-2  rounded-4xl shadow-md"
        >
          <Switch
            checked={mounted ? currentTheme === "dark" : false}
            onChange={toggleTheme}
            checkedChildren="🌙"
            unCheckedChildren="🔅"
          />
          <p>Thiên Nga</p>
          <p>Administrator</p>
          <Avatar
            size={32}
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbODdhLiKymNx_SRs_EhG1oAbqpO0XOLhzA&s"
          />
        </Space>
      </Flex>
    </Flex>
  );
}
