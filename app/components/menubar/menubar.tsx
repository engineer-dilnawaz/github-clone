import {
  Bot,
  ChevronDown,
  Download,
  FolderCode,
  MessageSquare,
  SquareChevronRight,
  SquareCode,
} from "lucide-react";
import {
  Menubar as _Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "~/components/ui/menubar";
import { Button } from "../ui/button";

const downloadForSubItems = [
  {
    id: 1,
    label: "Visual Studio Code",
    icon: SquareCode,
  },
  {
    id: 2,
    label: "Visual Studio",
    icon: SquareCode,
  },
  {
    id: 3,
    label: "Xcode",
    icon: SquareCode,
  },
  {
    id: 4,
    label: "JetBrains",
    icon: SquareCode,
  },
  {
    id: 5,
    label: "Neovim",
    icon: SquareCode,
  },
  {
    id: 6,
    label: "Separator",
  },
  {
    id: 7,
    label: "CLI",
    icon: SquareChevronRight,
  },
];

export const Menubar = () => {
  return (
    <_Menubar>
      <MenubarMenu>
        <MenubarTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent border-none focus:border-none hover:border-none px-0 py-0 mx-0">
          <Button
            variant="outline"
            size="icon"
            className="w-8 border-0 bg-transparent shadow-none rounded-none hover:bg-transparent dark:bg-transparent dark:border-0 dark:hover:bg-transparent"
          >
            <ChevronDown className="size-4" />
          </Button>
        </MenubarTrigger>

        <MenubarContent>
          <MenubarLabel className="text-xs text-neutral-400">
            New conversation in
          </MenubarLabel>
          <MenubarItem>
            <MessageSquare className="size-3.5 text-neutral-400" />
            Assisitive
          </MenubarItem>
          <MenubarItem>
            <FolderCode className="size-3.5 text-neutral-400" />
            Spaces
          </MenubarItem>
          <MenubarSeparator />
          <MenubarSub>
            <MenubarSubTrigger className="gap-2">
              <Download className="size-3.5 text-neutral-400" />
              Download for
            </MenubarSubTrigger>
            <MenubarSubContent>
              {downloadForSubItems.map((item) => {
                if (item.label === "Separator" && item.icon === undefined) {
                  return <MenubarSeparator key={item.id} />;
                }
                return (
                  <MenubarItem key={item.id}>
                    {item.icon && (
                      <item.icon className="size-3.5 text-neutral-400" />
                    )}
                    {item.label}
                  </MenubarItem>
                );
              })}
            </MenubarSubContent>
          </MenubarSub>
          <MenubarItem>
            <Bot className="size-3.5 text-neutral-400" />
            Your Copilot
            <MenubarLabel className="ml-auto text-xs text-neutral-50 bg-neutral-950 rounded-full px-2 py-0.5 border border-gray-700">
              Free
            </MenubarLabel>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </_Menubar>
  );
};
