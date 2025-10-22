"use client";
import { Checkbox } from "antd";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { RiOrderPlayFill } from "react-icons/ri";

export const ArrangeDropdown = () => {
  const roles = [
    { key: "1", label: "Mới nhất" },
    { key: "2", label: "Cũ nhất" },
    { key: "3", label: "A-Z" },
  ];

  const items: MenuProps["items"] = roles.map((role) => ({
    key: role.key,
    label: <p>{role.label}</p>,
  }));

  const menuProps = { items };

  return (
    <Dropdown menu={menuProps} trigger={["click"]} placement="bottomLeft">
      <Button
        className="!h-[45px] 
                 !border-[var(--gray-8)] 
                 !text-[var(--page-text)] 
                 !bg-[var(--page-bg)] 
                 hover:!border-[var(--primary-green)]"
      >
        <Space>
          Sắp xếp theo
          <RiOrderPlayFill />
        </Space>
      </Button>
    </Dropdown>
  );
};
