"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuLayoutDashboard, LuFlaskConical } from "react-icons/lu";
import { FaUsers, FaUserLock, FaRegHandshake } from "react-icons/fa";
import {
  HiOutlineBookOpen,
  HiOutlineNewspaper,
  HiOutlineBuildingOffice2,
} from "react-icons/hi2";
import { HiOutlineEmojiHappy, HiOutlineBriefcase } from "react-icons/hi";
import { useTheme } from "@/providers/ThemeContext";
import { RxHamburgerMenu } from "react-icons/rx";

export const adminMenu = [
  { title: "Dashboard", href: "/dashboard", icon: LuLayoutDashboard },
  { title: "Account", href: "/account", icon: FaUsers },
  { title: "Phân quyền", href: "/roles", icon: FaUserLock },
];

export const sitemapMenu = [
  { title: "Giới thiệu", href: "/gioi-thieu", icon: HiOutlineBookOpen },
  { title: "Tin tức", href: "/tin-tuc", icon: HiOutlineNewspaper },
  {
    title: "Tuyển sinh - đào tạo",
    href: "/tuyen-sinh-dao-tao",
    icon: HiOutlineBuildingOffice2,
  },
  {
    title: "Khoa - Đơn vị",
    href: "/khoa-donvi",
    icon: HiOutlineBuildingOffice2,
  },
  {
    title: "Đời sống sinh viên",
    href: "/doi-song-sinh-vien",
    icon: HiOutlineEmojiHappy,
  },
  { title: "Nghiên cứu", href: "/nghien-cuu", icon: LuFlaskConical },
  { title: "Hợp tác", href: "/hop-tac", icon: FaRegHandshake },
  { title: "Tuyển dụng", href: "/tuyen-dung", icon: HiOutlineBriefcase },
];

export function AdminSidebar({
  collapsed,
  setCollapse,
}: {
  collapsed: boolean;
  setCollapse: () => void;
}) {
  const pathname = usePathname();
  const { currentTheme } = useTheme();

  const logoSrc = collapsed
    ? currentTheme === "dark"
      ? "/Logo_mini_dark.png"
      : "/Logo_mini_light.png"
    : currentTheme === "dark"
    ? "/Logo_full_dark.png"
    : "/Logo_full_light.png";

  const renderLink = (item: any) => {
    const Icon = item.icon;
    const active = pathname.includes(item.href);

    return (
      <Link
        key={item.href}
        href={item.href}
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors`}
        style={{
          backgroundColor: active ? "var(--menu-active-bg)" : "transparent",
          color: active ? "var(--menu-active-text)" : "var(--menu-text)",
          borderRight: active
            ? "10px solid var(--menu-active-text)"
            : "10px solid transparent",
        }}
        onMouseEnter={(e) => {
          if (!active)
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "var(--menu-hover-bg)";
        }}
        onMouseLeave={(e) => {
          if (!active)
            (e.currentTarget as HTMLElement).style.backgroundColor =
              "transparent";
        }}
      >
        <Icon size={18} />
        {!collapsed && <span>{item.title}</span>}
      </Link>
    );
  };

  return (
    <aside
      key={currentTheme}
      className="h-full flex flex-col"
      style={{
        backgroundColor: "var(--sidebar-bg)",
        transition: "all 0.3s ease",
      }}
    >
      {/* Logo */}
      <div
        className={`flex p-4 gap-2 ${
          collapsed
            ? "flex-col-reverse items-center"
            : "flex-row items-center justify-between"
        }`}
      >
        <div className="flex-shrink-0 w-fit">
          <img src={logoSrc} alt="Logo" className="h-13 object-contain" />
        </div>

        <RxHamburgerMenu
          onClick={setCollapse}
          className="text-xl shrink-0 leading-none cursor-pointer text-[var(--menu-text)]"
        />
      </div>

      {!collapsed && (
        <h3
          className="text-xs font-semibold px-4 mb-2"
          style={{ color: "var(--outline-color)" }}
        >
          Admin Menu
        </h3>
      )}
      <nav className="space-y-1 mb-4 px-4">{adminMenu.map(renderLink)}</nav>

      {!collapsed && (
        <h3
          className="text-xs font-semibold px-4 mt-4 mb-2"
          style={{ color: "var(--outline-color)" }}
        >
          Sitemap Menu
        </h3>
      )}
      <nav className="space-y-1 px-4">{sitemapMenu.map(renderLink)}</nav>
    </aside>
  );
}
