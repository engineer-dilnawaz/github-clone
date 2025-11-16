import {
  useState,
  type ForwardRefExoticComponent,
  type RefAttributes,
} from "react";
import type { LucideProps } from "lucide-react";
import { NavLink } from "react-router";
import { Label } from "~/components/ui/label";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemHeader,
  ItemTitle,
} from "~/components/ui/item";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";

type DrawerItemProps = {
  label: string;
  to: string;
  Icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
};

export const DrawerItem = ({ label, to, Icon }: DrawerItemProps) => {
  return (
    <NavLink
      to={to}
      className="flex items-center gap-3 px-3 py-2 rounded-md text-sm text-neutral-50 hover:bg-neutral-800 transition"
    >
      <Icon className="size-4 text-neutral-400" />
      <Label className="text-sm">{label}</Label>
    </NavLink>
  );
};

export const DrawerTitleInputItem = ({
  label,
  Icon,
}: Pick<DrawerItemProps, "label" | "Icon">) => {
  const [showInput, setShowInput] = useState(false);

  const handleShowInput = () => {
    setShowInput(!showInput);
  };
  return (
    <Item variant="default" className="py-1 px-2 gap-0">
      <ItemHeader>
        <ItemContent>
          <ItemTitle className="text-xs text-neutral-500">{label}</ItemTitle>
        </ItemContent>
        <ItemActions className="cursor-pointer py-0 my-0">
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={handleShowInput}
          >
            <Icon className="size-4 text-neutral-400" />
          </Button>
        </ItemActions>
      </ItemHeader>
      {showInput && (
        <ItemContent className="flex items-center gap-2 py-1 w-full my-0 ">
          <InputGroup className="border-blue-500 outline-blue-500 has-[[data-slot=input-group-control]:focus-visible]:border-blue-500 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-500/50 my-0 py-0 ">
            <InputGroupInput
              className="focus-visible:outline-blue-500"
              placeholder="Search for repositories"
            />
            <InputGroupAddon>
              <Icon className="size-4 text-neutral-400" />
            </InputGroupAddon>
          </InputGroup>
        </ItemContent>
      )}
    </Item>
  );
};
