import { useEffect } from "react";

import { useThemeStore } from "~/store/useThemeStore";
import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "~/constants";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    const root = document.documentElement;

    if (theme === THEME_SYSTEM) {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? THEME_DARK
        : THEME_LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    if (theme === THEME_DARK) {
      root.classList.add(THEME_DARK);
    } else {
      root.classList.remove(THEME_DARK);
    }
  }, [theme]);

  return <>{children}</>;
};
