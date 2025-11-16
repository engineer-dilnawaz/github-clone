import {
  Bot,
  CircleDot,
  Computer,
  Gift,
  GitPullRequestArrow,
  House,
  MessagesSquare,
  PanelsTopLeft,
  Search,
  ServerCrash,
  Telescope,
} from "lucide-react";

const mainItems = [
  {
    label: "Home",
    to: "/",
    icon: House,
  },
  {
    label: "Issues",
    to: "/issues",
    icon: CircleDot,
  },
  {
    label: "Pull Requests",
    to: "/pull-requests",
    icon: GitPullRequestArrow,
  },
  {
    label: "Projects",
    to: "/projects",
    icon: PanelsTopLeft,
  },
  {
    label: "Discussion",
    to: "/discussion",
    icon: MessagesSquare,
  },
  {
    label: "Codespaces",
    to: "/codespaces",
    icon: Computer,
  },
  {
    label: "Copilot",
    to: "/copilot",
    icon: Bot,
  },
];

const productItems = [
  {
    label: "Explore",
    to: "/explore",
    icon: Telescope,
  },
  {
    label: "Marketplace",
    to: "/marketplace",
    icon: Gift,
  },
  {
    label: "MCP registry",
    to: "/mcp-registry",
    icon: ServerCrash,
  },
];

const topRepositoriesItems = [
  {
    label: "Top Repositories",
    icon: Search,
    to: "",
  },
];
export const useDrawer = () => {
  return {
    mainItems,
    productItems,
    topRepositoriesItems,
  };
};
