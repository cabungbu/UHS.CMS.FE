"use client";
import { Checkbox } from "antd";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

export const ApartmentDropdown = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [open, setOpen] = useState(false);

  const roles = [
    { key: "1", label: "Tài chình" },
    { key: "2", label: "Nhân sự" },
    { key: "3", label: "Tài sản" },
  ];

  const handleCheck = (key: string, checked: boolean) => {
    setSelected((prev) =>
      checked ? [...prev, key] : prev.filter((k) => k !== key)
    );
  };

  const items: MenuProps["items"] = roles.map((role) => ({
    key: role.key,
    label: (
      <Checkbox
        checked={selected.includes(role.key)}
        onChange={(e) => handleCheck(role.key, e.target.checked)}
        onClick={(e) => e.stopPropagation()}
      >
        {role.label}
      </Checkbox>
    ),
  }));

  const menuProps = { items };

  return (
    <Dropdown
      menu={menuProps}
      trigger={["click"]}
      open={open}
      onOpenChange={setOpen}
      placement="bottomLeft"
    >
      <Button
        className="!h-[45px] 
             !border-[var(--gray-8)] 
             !text-[var(--page-text)] 
             !bg-[var(--page-bg)] 
             hover:!border-[var(--primary-green)]"
      >
        <Space>
          Tất cả phòng ban
          <HiChevronDown />
        </Space>
      </Button>
    </Dropdown>
  );
};
