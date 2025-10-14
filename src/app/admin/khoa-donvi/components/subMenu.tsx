"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Trung tâm",
    items: [
      {
        label: "Trung Tâm Đào tạo kỹ năng nghề nghiệp Y khoa",
        slug: "trung-tam-dao-tao-ky-nang-nghe-nghiep-y-khoa",
      },
      {
        label: "Trung Tâm Nghiên cứu và Phát triển sản phẩm chăm sóc sức khỏe",
        slug: "trung-tam-nghien-cuu-va-phat-trien-san-pham-cham-soc-suc-khoe",
      },
      {
        label: "Trung tâm nghiên cứu di truyền và sức khỏe sinh sản",
        slug: "trung-tam-nghien-cuu-di-truyen-va-suc-khoe-sinh-san",
      },
    ],
  },
  {
    title: "Khoa - Bộ môn",
    items: [
      { label: "Khoa Y", slug: "khoa-y" },
      { label: "Khoa Răng - Hàm - Mặt", slug: "khoa-rang-ham-mat" },
      { label: "Khoa Điều dưỡng", slug: "khoa-dieu-duong" },
      { label: "Khoa Y học Cổ truyền", slug: "khoa-y-hoc-co-truyen" },
      { label: "Khoa Dược", slug: "khoa-duoc" },
    ],
  },
  {
    title: "Phòng ban",
    items: [
      { label: "Đào tạo", slug: "phong-dao-tao" },
      { label: "Tổ chức hành chính", slug: "phong-to-chuc-hanh-chinh" },
      { label: "Kế hoạch tài chính", slug: "phong-ke-hoach-tai-chinh" },
      { label: "Công tác sinh viên", slug: "phong-cong-tac-sinh-vien" },
      {
        label: "Khảo thí & Đảm bảo chất lượng",
        slug: "phong-khao-thi-va-dam-bao-chat-luong",
      },
      {
        label: "Khoa học công nghệ & Hợp tác quốc tế",
        slug: "phong-khoa-hoc-cong-nghe-va-hop-tac-quoc-te",
      },
    ],
  },
  {
    title: "Đoàn thể",
    items: [
      { label: "Đảng ủy", slug: "dang-uy" },
      { label: "Công đoàn", slug: "cong-doan" },
      {
        label: "Đoàn thanh niên",
        slug: "doan-thanh-nien",
        subItems: [
          { label: "Lịch sử thành lập", slug: "lich-su-thanh-lap" },
          { label: "Các hoạt động", slug: "cac-hoat-dong" },
          { label: "Tuyên dương", slug: "tuyen-duong" },
        ],
      },
    ],
  },
];

export function KhoaDonViSubMenu() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);
  const activeSlug = segments[segments.length - 1];

  return (
    <div className="flex items-start bg-[var(--sidebar-bg)] border border-[var(--gray-8)] rounded-lg">
      {menu.map((group) => {
        const items: MenuProps["items"] = [
          {
            key: group.title,
            label: group.title,
            children: group.items.map((child) => {
              // Nếu có subItems (như Đoàn thanh niên)
              if (child.subItems) {
                return {
                  key: child.slug,
                  label: child.label,
                  children: child.subItems.map((sub) => ({
                    key: sub.slug,
                    label: (
                      <Link
                        href={`/admin/khoa-donvi/${child.slug}/${sub.slug}`}
                      >
                        {sub.label}
                      </Link>
                    ),
                  })),
                };
              }

              // Menu item thông thường
              return {
                key: child.slug,
                label: (
                  <Link href={`/admin/khoa-donvi/${child.slug}`}>
                    {child.label}
                  </Link>
                ),
              };
            }),
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
