import {
  Bell,
  Bot,
  ChevronDown,
  CircleDot,
  GitPullRequestArrow,
  Menu,
  Plus,
  Search,
} from "lucide-react";

import { ThemeToggler } from "~/components/theme-toggler";
import { Drawer, WithTooltip } from "~/components";
import { githubLogoWhite } from "public/logos";
import { Label } from "../ui/label";
import { Link } from "react-router";
import { ButtonGroup } from "../ui/button-group";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Kbd } from "../ui/kbd";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useNavbar } from "./useNavbar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export const Navbar = () => {
  const { createNewItems } = useNavbar();
  return (
    <nav className="flex  px-4 py-4 items-center border-b border-b-gray-700">
      <div className="flex items-center gap-2 flex-1">
        <Drawer />
        <img src={githubLogoWhite} alt="github logo" className="size-7" />
        <Link to="/">
          <Label className="text-sm font-semibold text-neutral-200 ml-2 cursor-pointer">
            engineer-dilnawaz
          </Label>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 border border-gray-700 rounded-md py-2 px-3 cursor-pointer">
          <Search className="size-4 text-neutral-400" />
          <p className="text-sm text-neutral-400">
            Type
            <Kbd className="text-neutral-400 mx-1">/</Kbd>
            to search
          </p>
        </div>
        <ButtonGroup
          orientation="horizontal"
          aria-label="Media controls"
          className="h-fit"
        >
          <WithTooltip tooltip="Chat with copilot">
            <Button variant="outline" size="icon" className="w-12">
              <Bot className="size-5" />
            </Button>
          </WithTooltip>
          <WithTooltip tooltip="Open copilot">
            <Button variant="outline" size="icon" className="w-8">
              <ChevronDown className="size-4" />
            </Button>
          </WithTooltip>
        </ButtonGroup>
        <Separator orientation="vertical" />

        <Select>
          <WithTooltip tooltip="Create new">
            <SelectTrigger className="w-15" hideSelectPrimitiveIcon>
              <Plus className="size-4" />
              <ChevronDown className="size-4" />
            </SelectTrigger>
          </WithTooltip>
          <SelectContent>
            <SelectGroup className="gap-0">
              {createNewItems.map((item, index) => {
                if (item.label === "separator") {
                  return <SelectSeparator key={`separator-${index}`} />;
                }
                return (
                  <SelectItem key={item.label} value={item.label}>
                    <item.icon className="size-4" />
                    {item.label}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>

        <WithTooltip tooltip="Your issues">
          <Button variant="outline" size="icon" className="cursor-pointer">
            <CircleDot className="size-4 text-neutral-400" />
          </Button>
        </WithTooltip>

        <WithTooltip tooltip="Your pull requests">
          <Button variant="outline" size="icon" className="cursor-pointer">
            <GitPullRequestArrow className="size-4 text-neutral-400" />
          </Button>
        </WithTooltip>

        <WithTooltip tooltip="Your notifications">
          <Button
            variant="outline"
            size="icon"
            className="cursor-pointer relative"
          >
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-sky-500 rounded-full" />
            <Bell className="size-4 text-neutral-400" />
          </Button>
        </WithTooltip>
        <ThemeToggler />
      </div>
    </nav>
  );
};
