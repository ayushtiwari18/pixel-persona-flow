
import { useCallback, useEffect, useState } from "react";

export default function useDarkMode() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Detect and set the theme on first load
  useEffect(() => {
    const root = window.document.documentElement;
    // Prefer user setting, then system, else fallback 'light'
    const stored = localStorage.getItem("theme");
    let initial = "light";
    if (stored === "dark" || stored === "light") {
      initial = stored;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      initial = "dark";
    }
    setTheme(initial as "light" | "dark");
    root.classList.toggle("dark", initial === "dark");
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      localStorage.setItem("theme", next);
      document.documentElement.classList.toggle("dark", next === "dark");
      return next;
    });
  }, []);

  return { theme, toggleTheme };
}
