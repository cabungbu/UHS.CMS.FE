"use client";
import { Checkbox, Flex, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { Button, Dropdown, Space } from "antd";
import type { MenuProps } from "antd";
import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";

import { RoleDropdown } from "./components/roleDropdown";
import { ApartmentDropdown } from "./components/apartmentDropdown";
import { ArrangeDropdown } from "./components/arrangeDropdown";
import UserGridList from "./components/userList";

export default function AccountPage() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Danh sách các tài khoản</h2>
      <Flex gap={10}>
        <Input
          size="large"
          placeholder="Nhập email hoặc username"
          prefix={<FiSearch />}
        />
        <RoleDropdown />

        <ApartmentDropdown />

        <ArrangeDropdown />
      </Flex>
      <UserGridList />
    </div>
  );
}
