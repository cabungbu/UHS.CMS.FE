"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "antd";
import type { MenuProps } from "antd";

const menu = [
  {
    title: "Thông tin tuyển sinh",
    items: [
      { label: "Giới thiệu chung", slug: "gioi-thieu-chung" },
      { label: "Điểm chuẩn hàng năm", slug: "diem-chuan-hang-nam" },
      { label: "Phương thức tuyển sinh", slug: "phuong-thuc-tuyen-sinh" },
      { label: "Tư vấn tuyển sinh", slug: "tu-van-tuyen-sinh" },
    ],
  },
  {
    title: "Đại học",
    items: [
      { label: "Giới thiệu", slug: "dai-hoc/gioi-thieu" },
      { label: "Văn bản pháp quy", slug: "dai-hoc/van-ban-phap-quy" },
      { label: "Thủ tục - biểu mẫu", slug: "dai-hoc/thu-tuc-bieu-mau" },
      {
        label: "Chương trình đào tạo",
        slug: "dai-hoc/chuong-trinh-dao-tao",
        subItems: [
          { label: "Y Khoa", slug: "y-khoa" },
          { label: "Dược Học", slug: "duoc-hoc" },
          { label: "Răng Hàm Mặt", slug: "rang-ham-mat" },
          { label: "Y Học Cổ Truyền", slug: "y-hoc-co-truyen" },
          { label: "Điều Dưỡng", slug: "dieu-duong" },
        ],
      },
      { label: "Kế hoạch học phí", slug: "dai-hoc/ke-hoach-hoc-phi" },
      { label: "Kế hoạch học tập", slug: "dai-hoc/ke-hoach-hoc-tap" },
    ],
  },
  {
    title: "Sau đại học",
    items: [
      { label: "Giới thiệu", slug: "sau-dai-hoc/gioi-thieu" },
      { label: "Văn bản pháp quy", slug: "sau-dai-hoc/van-ban-phap-quy" },
      { label: "Thủ tục - biểu mẫu", slug: "sau-dai-hoc/thu-tuc-bieu-mau" },
      { label: "Bác sĩ nội trú", slug: "sau-dai-hoc/bac-si-noi-tru" },
      { label: "Chuyên khoa cấp I", slug: "sau-dai-hoc/chuyen-khoa-cap-1" },
      { label: "Chuyên khoa cấp II", slug: "sau-dai-hoc/chuyen-khoa-cap-2" },
      { label: "Thạc sĩ", slug: "sau-dai-hoc/thac-si" },
      { label: "Tiến sĩ", slug: "sau-dai-hoc/tien-si" },
    ],
  },
  {
    title: "Mở rộng",
    items: [
      {
        label: "Chương trình liên kết quốc tế",
        slug: "mo-rong/chuong-trinh-lien-ket-quoc-te",
      },
      {
        label: "Đào tạo theo nhu cầu",
        slug: "mo-rong/dao-tao-theo-nhu-cau",
        subItems: [
          {
            label: "Đào tạo liên tục",
            slug: "dao-tao-theo-nhu-cau/dao-tao-lien-tuc",
          },
          {
            label: "Đào tạo ngắn hạn",
            slug: "dao-tao-theo-nhu-cau/dao-tao-ngan-han",
          },
          { label: "PBL", slug: "dao-tao-theo-nhu-cau/pbl" },
          {
            label: "Anh văn học thuật",
            slug: "dao-tao-theo-nhu-cau/anh-van-hoc-thuat",
          },
        ],
      },
    ],
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
                        href={`/tuyen-sinh-dao-tao/${child.slug}/${sub.slug}`}
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
                  <Link href={`/tuyen-sinh-dao-tao/${child.slug}`}>
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
