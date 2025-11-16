import { create } from "zustand";
import { persist } from "zustand/middleware";

import { THEME_DARK, THEME_KEY, THEME_LIGHT, THEME_SYSTEM } from "~/constants";

type Theme = typeof THEME_LIGHT | typeof THEME_DARK | typeof THEME_SYSTEM;

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: THEME_LIGHT,

      toggleTheme: () =>
        set({
          theme: get().theme === THEME_LIGHT ? THEME_DARK : THEME_LIGHT,
        }),

      setTheme: (theme: Theme) => set({ theme }),
    }),
    {
      name: THEME_KEY,
    }
  )
);
