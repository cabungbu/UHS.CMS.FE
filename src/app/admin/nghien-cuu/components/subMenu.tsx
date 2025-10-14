"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Tạp chí Phát triển Khoa học và Công nghệ",
    slug: "tap-chi-phat-trien-khoa-hoc-va-cong-nghe",
  },
  {
    title: "Hội nghị hội thảo",
    slug: "hoi-nghi-hoi-thao",
  },
  {
    title: "Tập huấn",
    slug: "tap-huan",
  },
  {
    title: "Các công bố khoa học",
    slug: "cac-cong-bo-khoa-hoc",
  },
];

export function AboutSubMenu() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeSlug = segments[segments.length - 1];

  return (
    <div className="flex items-start bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg">
      {menu.map((group) => {
        const items: MenuProps["items"] = [
          {
            key: group.slug || group.title,
            label: (
              <Link href={`/admin/nghien-cuu/${group.slug}`}>
                {group.title}
              </Link>
            ),
          },
        ];

        return (
          <Menu
            key={group.title}
            mode="inline"
            selectedKeys={[activeSlug || ""]}
            items={items}
            style={{
              background: "transparent",
              minWidth: 200,
            }}
          />
        );
      })}
    </div>
  );
}
