"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Tin tức chung",
    slug: "tin-tuc-chung",
  },
  {
    title: "Thông tin - thông báo",
    slug: "thong-tin-thong-bao",
  },
  {
    title: "Tin tức y tế",
    slug: "tin-tuc-y-te",
  },
  {
    title: "Sự kiện",
    slug: "su-kien",
  },
  {
    title: "Tin học tập - nghiên cứu",
    slug: "tin-hoc-tap-nghien-cuu",
  },
  {
    title: "Tin hoạt động sinh viên",
    slug: "tin-hoat-dong-sinh-vien",
  },
  {
    title: "Tin xét chức danh GS, PGS",
    slug: "tin-xet-chuc-danh-gs-pgs",
  },
];

export function NewsSubMenu() {
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
