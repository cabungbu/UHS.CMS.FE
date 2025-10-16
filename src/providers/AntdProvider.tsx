"use client";

import { ConfigProvider, App } from "antd";
import { useTheme } from "@/providers/ThemeContext";

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
          colorTextBase: currentTheme === "light" ? "#3f3f3f" : "#E0E0E0",
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
            itemColor: currentTheme === "light" ? "#3f3f3f" : "#E0E0E0", // --menu-text
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
            // Primary Button
            colorPrimary: theme.colorGreenPrimary,
            colorPrimaryHover: theme.colorPrimaryHover,
            colorPrimaryActive: theme.colorPrimaryHover,
            primaryColor: theme.colorTextLightSolid, // Text color của primary button

            // Default Button (Outlined)
            defaultBorderColor: theme.colorGreenPrimary,
            defaultColor: theme.colorGreenPrimary,
            defaultBg: "transparent",
            defaultHoverBorderColor: theme.colorPrimaryHover,
            defaultHoverColor: theme.colorPrimaryHover,
            defaultActiveBorderColor: theme.colorPrimaryHover,
            defaultActiveColor: theme.colorPrimaryHover,

            // Text Button
            textTextColor: theme.colorGreenPrimary,
            textTextHoverColor: theme.colorPrimaryHover,
            textTextActiveColor: theme.colorPrimaryHover,

            // Danger Button
            colorError: "#ff4d4f",
            colorErrorHover: "#ff7875",
            colorErrorActive: "#d9363e",
          },
          Checkbox: {
            colorPrimary: theme.colorGreenPrimary,
            colorPrimaryHover: theme.colorPrimaryHover,
            colorPrimaryBorder: theme.colorGreenPrimary,
            colorBorder: currentTheme === "light" ? "#d9d9d9" : "#434343",
            colorBgContainer: currentTheme === "light" ? "#ffffff" : "#1F1F1F",
          },
          // Input
          Input: {
            colorBorder: currentTheme === "light" ? "#d9d9d9" : "#434343",
            colorBgContainer: currentTheme === "light" ? "#ffffff" : "#141414",
            colorTextPlaceholder:
              currentTheme === "light" ? "#bfbfbf" : "#595959",
            activeBorderColor: theme.colorGreenPrimary,
            hoverBorderColor: theme.colorGreenPrimary,
          },

          // Select
          Select: {
            colorBorder: currentTheme === "light" ? "#d9d9d9" : "#434343",
            colorBgContainer: currentTheme === "light" ? "#ffffff" : "#141414",
            colorPrimary: theme.colorGreenPrimary,
            colorPrimaryHover: theme.colorPrimaryHover,
            optionSelectedBg: currentTheme === "light" ? "#f6fffb" : "#1a3a2e",
          },

          // Switch
          Switch: {
            colorPrimary: theme.colorGreenPrimary,
            colorPrimaryHover: theme.colorPrimaryHover,
          },

          // Radio
          Radio: {
            colorPrimary: theme.colorGreenPrimary,
            colorPrimaryHover: theme.colorPrimaryHover,
          },

          Tabs: {
            itemSelectedColor: theme.colorGreenPrimary, // màu chữ khi tab được chọn
            inkBarColor: theme.colorGreenPrimary, // màu gạch dưới (indicator)
          },
        },
      }}
    >
      <App>{children}</App>
    </ConfigProvider>
  );
}
