import {
  BookMarked,
  BookUp,
  Building2,
  CircleDot,
  Code,
  Computer,
  FolderKanban,
} from "lucide-react";
import { Separator } from "../ui/separator";

const createNewItems = [
  {
    label: "New issue",
    to: "/issues",
    icon: CircleDot,
  },
  {
    label: "New repository",
    to: "/repositories",
    icon: BookMarked,
  },
  {
    label: "Import repository",
    to: "/import-repository",
    icon: BookUp,
  },
  {
    label: "separator",
    to: "",
    icon: Separator,
  },
  {
    label: "New codespace",
    to: "/codespaces",
    icon: Computer,
  },
  {
    label: "New gist",
    to: "/gists",
    icon: Code,
  },
  {
    label: "separator",
    to: "",
    icon: Separator,
  },
  {
    label: "New organization",
    to: "/organizations",
    icon: Building2,
  },
  {
    label: "New project",
    to: "/projects",
    icon: FolderKanban,
  },
];

export const useNavbar = () => {
  return {
    createNewItems,
  };
};
