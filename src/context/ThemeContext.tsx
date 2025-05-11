"use client";

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";

type ThemeContextDataType = {
  isDark: boolean;
  handleSetTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextDataType>({
  isDark: false,
  handleSetTheme: () => {},
});

function ThemeContextProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme && theme === "light") {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  function handleSetTheme() {
    if (isDark === true) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark, handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeContextProvider;
