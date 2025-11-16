import { Menu } from "lucide-react";

import { ThemeToggler } from "~/components/theme-toggler";
import { Drawer } from "~/components";

export const Navbar = () => {
  return (
    <nav className="flex justify-between px-4 py-4 items-center border-b border-b-gray-700">
      <Drawer />
      <h1 className="text-xl font-semibold text-white">GitHub Clone</h1>
      <ThemeToggler />
    </nav>
  );
};
