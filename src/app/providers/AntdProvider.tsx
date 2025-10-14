"use client";

import { ConfigProvider } from "antd";
import { useTheme } from "@/components/layout/ThemeContext";

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentTheme } = useTheme();

  const lightTheme = {
    colorGreenPrimary: "#00A859",
    colorPrimaryHover: "#00914C",
    colorTextLightSolid: "#ffffff",
    colorBgBase: "#F5F5F5",
    menuActiveBg: "#f6fffb",
    menuHoverBg: "#f5f5f5",
  };

  const darkTheme = {
    colorGreenPrimary: "#00FF88",
    colorPrimaryHover: "#00CC6E",
    colorTextLightSolid: "#000000",
    colorBgBase: "#1F1F1F",
    menuActiveBg: "#413f3f",
    menuHoverBg: "#2a2a2a",
  };

  const theme = currentTheme === "light" ? lightTheme : darkTheme;

  return (
    <ConfigProvider
      theme={{
        token: {
          ...theme,
          colorTextBase: currentTheme === "light" ? "#5C5C5C" : "#E0E0E0",
          borderRadius: 8,
          controlHeight: 36,
          lineHeight: 1.5,
          fontFamily: "Inter, sans-serif",
          fontWeightStrong: 600,
        },
        components: {
          // Specific cho từng component
          Menu: {
            // Colors
            itemColor: currentTheme === "light" ? "#5C5C5C" : "#E0E0E0", // --menu-text
            itemHoverColor: theme.colorGreenPrimary,
            itemHoverBg: theme.menuHoverBg,
            itemSelectedColor: theme.colorGreenPrimary,
            itemSelectedBg: theme.menuActiveBg,
            subMenuItemSelectedColor: theme.colorGreenPrimary,
            fontSize: 14, // text-sm
            itemHeight: 40,
          },
          Button: {
            fontWeight: 500, // Font weight cho Button
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
