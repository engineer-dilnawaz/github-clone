import { Moon, Sun } from "lucide-react";

import { THEME_DARK, THEME_LIGHT, THEME_SYSTEM } from "~/constants";
import { useThemeStore } from "~/store";

export const ThemeToggler = () => {
  const { setTheme } = useThemeStore();

  return (
    <div>
      <b>
        <button>
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          <span className="sr-only">Toggle theme</span>
        </button>
      </b>
      <div>
        <div onClick={() => setTheme(THEME_LIGHT)}>Light</div>
        <div onClick={() => setTheme(THEME_DARK)}>Dark</div>
        <div onClick={() => setTheme(THEME_SYSTEM)}>System</div>
      </div>
    </div>
  );
};
