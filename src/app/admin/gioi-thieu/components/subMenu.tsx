"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Tổng quan",
    items: [
      { label: "Sứ mệnh và tầm nhìn", slug: "su-menh-va-tam-nhin" },
      { label: "Lịch sử phát triển", slug: "lich-su-phat-trien" },
      { label: "Bộ nhận diện thương hiệu", slug: "bo-nhan-dien-thuong-hieu" },
    ],
  },
  {
    title: "Ban lãnh đạo",
    items: [
      { label: "Thông điệp từ Hiệu trưởng", slug: "thong-diep-tu-hieu-truong" },
      { label: "Ban giám hiệu", slug: "ban-giam-hieu" },
      { label: "Hội đồng trường", slug: "hoi-dong-truong" },
      {
        label: "Hội đồng Khoa học - Đào tạo",
        slug: "hoi-dong-khoa-hoc-dao-tao",
      },
      { label: "Hội đồng Đạo đức", slug: "hoi-dong-dao-duc" },
    ],
  },
  {
    title: "Cơ cấu và tổ chức",
    items: [
      { label: "Cơ cấu và tổ chức", slug: "co-cau-va-to-chuc" },
      { label: "Nguồn nhân lực", slug: "nguon-nhan-luc" },
      { label: "Chất lượng giáo dục", slug: "chat-luong-giao-duc" },
      { label: "Thông tin quy hoạch", slug: "thong-tin-quy-hoach" },
      {
        label: "Quỹ giáo sư Đặng Văn Chung",
        slug: "quy-giao-su-dang-van-chung",
      },
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
                <Link href={`/admin/gioi-thieu/${child.slug}`}>
                  {child.label}
                </Link>
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
