"use client";

import React from "react";
import Cookies from "js-cookie";

import { LIGHT_TOKENS, DARK_TOKENS } from "@/constants";

export const ThemeContext = React.createContext(null);

export function useTheme() {
  return React.useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = React.useState(undefined);

  React.useEffect(function () {
    const storedTheme = Cookies.get("theme");
    setTheme(typeof storedTheme === "undefined" ? "light" : storedTheme);
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "light" ? "dark" : "light";

    const rootDocument = document.documentElement;
    const nextThemeToken = theme === "light" ? DARK_TOKENS : LIGHT_TOKENS;

    for (const property in nextThemeToken) {
      rootDocument.style.setProperty(property, nextThemeToken[property]);
    }

    rootDocument.setAttribute("data-color-theme", nextTheme);

    setTheme(nextTheme);
    Cookies.set("theme", nextTheme);
  }

  const themeContextValue = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
