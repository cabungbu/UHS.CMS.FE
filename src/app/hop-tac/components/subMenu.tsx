"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Health Promotion",
    items: [
      { label: "AUN-HPN", slug: "aun-hpn" },
      { label: "HURS", slug: "hurs" },
      { label: "Hoạt động", slug: "hoat-dong" },
      { label: "Tin tức", slug: "tin-tuc" },
      { label: "Liên hệ", slug: "lien-he" },
    ],
  },
  {
    title: "Đối ngoại",
    items: [
      { label: "Trong nước", slug: "trong-nuoc" },
      { label: "Quốc tế", slug: "quoc-te" },
      { label: "Nguồn tài trợ", slug: "nguon-tai-tro" },
    ],
  },
  {
    title: "Viện - Trường",
    items: [
      { label: "1", slug: "1" },
      { label: "2", slug: "2" },
      { label: "3", slug: "3" },
      { label: "4", slug: "4" },
    ],
  },
];

export function AboutSubMenu() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop();

  return (
    <div className="flex items-start bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg">
      {menu.map((group) => {
        const items: MenuProps["items"] = [
          {
            key: group.title,
            label: group.title,
            children: group.items.map((child) => ({
              key: child.slug,
              label: (
                <Link href={`/gioi-thieu/${child.slug}`}>{child.label}</Link>
              ),
            })),
          },
        ];

        return (
          <Menu
            key={group.title}
            mode="inline"
            defaultOpenKeys={[group.title]}
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
