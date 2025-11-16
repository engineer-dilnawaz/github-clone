import { Menu } from "lucide-react";

import { DrawerItem, DrawerTitleInputItem } from "~/components/drawer-item";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { githubLogoWhite } from "public/logos";
import { useDrawer } from "./useDrawer";

export const Drawer = () => {
  const { mainItems, productItems, topRepositoriesItems } = useDrawer();
  return (
    <Sheet modal>
      <SheetTrigger asChild>
        <div className="flex items-center gap-2 border border-gray-700 rounded-md p-2 cursor-pointer">
          <Menu className="size-5 text-gray-300 " />
        </div>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[320px] border-r border-slate-700 bg-background rounded-r-2xl gap-1"
      >
        <SheetHeader>
          <SheetTitle>
            <img src={githubLogoWhite} alt="github logo" className="size-7" />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-2">
          {mainItems.map((item) => (
            <DrawerItem
              key={item.label}
              label={item.label}
              to={item.to}
              Icon={item.icon}
            />
          ))}
        </nav>
        <Separator />

        <nav className="flex flex-col gap-1 px-2 py-1">
          {productItems.map((item) => (
            <DrawerItem
              key={item.label}
              label={item.label}
              to={item.to}
              Icon={item.icon}
            />
          ))}
        </nav>

        <Separator />
        <nav className="flex flex-col gap-1 px-2 py-1">
          {topRepositoriesItems.map((item) => (
            <DrawerTitleInputItem
              key={item.label}
              label={item.label}
              Icon={item.icon}
            />
          ))}
        </nav>
      </SheetContent>
      <SheetClose />
    </Sheet>
  );
};
