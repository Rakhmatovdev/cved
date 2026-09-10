import { MoonOutlined, SunOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  ThemeAnimationType,
  useModeAnimation
} from "react-theme-switch-animation";

export const ThemeChanger = () => {
  // Helpers
  const { ref, toggleSwitchTheme } = useModeAnimation({
    duration: 500,
    animationType: ThemeAnimationType.BLUR_CIRCLE
  });

  // States
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark" || storedTheme === "light") return storedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  // Effects
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    document.documentElement.style.colorScheme = newTheme;
  };

  return (
    <button
      className="size-[39px] transition bg-[#F8FAFC] dark:text-white rounded-lg flex items-center justify-center dark:bg-[#343950]"
      ref={ref}
      onClick={() => {
        toggleTheme();
        toggleSwitchTheme();
      }}
    >
      {theme === "dark" ? (
        <SunOutlined />
      ) : (
        <MoonOutlined className="*:*:fill-[#141B34]" />
      )}
    </button>
  );
};
