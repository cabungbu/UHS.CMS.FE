"use client";

import { Button, Checkbox, Flex } from "antd";
import { useEffect, useState } from "react";
import { Space } from "antd";
import { useParams, usePathname } from "next/navigation";
import type { CheckboxProps } from "antd";

export default function LanguageDisplay() {
  const onChange: CheckboxProps["onChange"] = (e) => {
    console.log(`checked = ${e.target.checked}`);
  };
  return (
    <Flex
      vertical={true}
      style={{ padding: "20px" }}
      className="w-full bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg p-5 gap-3"
    >
      <p
        className="text-lg font-semibold"
        style={{ color: "var(--primary-blue)" }}
      >
        Hiển thị
      </p>
      <Flex align="center" justify="space-between" className="w-full">
        <div className="flex flex-col gap-3">
          <Flex>
            <Checkbox onChange={onChange} style={{ marginRight: "10px" }} />
            <p>Hiển thị phiên bản tiếng Việt</p>
          </Flex>
          <Flex>
            <Checkbox onChange={onChange} style={{ marginRight: "10px" }} />
            <p>Hiển thị phiên bản tiếng Anh</p>
          </Flex>
        </div>
        <Button variant="outlined">Dịch sang tiếng Anh</Button>
      </Flex>
    </Flex>
  );
}
