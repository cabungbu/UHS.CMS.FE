"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Học bổng",
    items: [
      {
        label: "Học bổng khuyến khích học tập",
        slug: "hoc-bong-khuyen-khich-hoc-tap",
      },
      {
        label: "Học bổng trong nước, doanh nghiệp",
        slug: "hoc-bong-trong-nuoc-doanh-nghiep",
      },
      {
        label: "Học bổng nước ngoài, trao đổi sinh viên",
        slug: "hoc-bong-nuoc-ngoai-trao-doi-sinh-vien",
      },
    ],
  },
  {
    title: "CLB - Đội nhóm",
    items: [
      { label: "Clb đội nhóm 1", slug: "clb-doi-nhom-1" },
      { label: "clb đội nhóm 2", slug: "clb-doi-nhom-2" },
    ],
  },
  {
    title: "Cẩm nang sinh viên",
    items: [
      { label: "Sổ tay sinh viên", slug: "so-tay-sinh-vien" },
      { label: "Đăng ký KTX", slug: "dang-ky-ktx" },
      { label: "Chất lượng giáo dục", slug: "chat-luong-giao-duc" },
      { label: "Thông tin quy hoạch", slug: "thong-tin-quy-hoach" },
      {
        label: "Quỹ giáo sư Đặng Văn Chung",
        slug: "quy-giao-su-dang-van-chung",
      },
    ],
  },
  {
    title: "Các hoạt động sinh viên thường niên",
    slug: "cac-hoat-dong-sinh-vien-thuong-nien",
  },
  {
    title: "Ban liên lạc cựu sinh viên",
    items: [
      {
        label: "Quyết định thành lập & danh sách",
        slug: "quyet-dinh-thanh-lap-danh-sach",
      },
      { label: "Tin tức - sự kiện", slug: "tin-tuc-su-kien" },
    ],
  },
];

export function AboutSubMenu() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/").pop();

  return (
    <div className="flex items-start bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg">
      {menu.map((group) => {
        if (!group.items) {
          const items: MenuProps["items"] = [
            {
              key: group.slug || group.title,
              label: (
                <Link href={`/doi-song-sinh-vien/${group.slug}`}>
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
        }

        // Nếu có items, tạo menu với children
        const items: MenuProps["items"] = [
          {
            key: group.title,
            label: group.title,
            children: group.items.map((child) => ({
              key: child.slug,
              label: (
                <Link href={`/doi-song-sinh-vien/${child.slug}`}>
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
