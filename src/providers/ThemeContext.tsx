"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  currentTheme: Theme;
  setCurrentTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
  setCurrentTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<Theme>("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark" || saved === "light") {
      setCurrentTheme(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", currentTheme);
    document.body.classList.toggle("dark", currentTheme === "dark");
    if (typeof window !== "undefined") {
      document.documentElement.setAttribute("data-theme", currentTheme);
    }
  }, [currentTheme]);

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{ currentTheme, setCurrentTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

export function ThemeBody({ children }: { children: React.ReactNode }) {
  const { currentTheme } = useTheme();

  useEffect(() => {
    document.body.classList.toggle("dark", currentTheme === "dark");
  }, [currentTheme]);

  return <>{children}</>;
}
