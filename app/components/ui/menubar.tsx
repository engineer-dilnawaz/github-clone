import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "~/lib/utils";

function Menubar({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar"
      className={cn(
        "bg-white dark:bg-gray-950 flex h-9 items-center gap-1 rounded-md border border-gray-200 dark:border-gray-800 p-1 shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function MenubarMenu({ children, ...props }: React.ComponentProps<"div">) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div data-slot="menubar-menu" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === MenubarTrigger) {
            return React.cloneElement(child as React.ReactElement, {
              onClick: () => setIsOpen(!isOpen),
              isOpen,
            });
          }
          if (child.type === MenubarContent) {
            return isOpen
              ? React.cloneElement(child as React.ReactElement, {
                  onClose: () => setIsOpen(false),
                })
              : null;
          }
        }
        return child;
      })}
    </div>
  );
}

function MenubarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-group"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  );
}

function MenubarPortal({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="menubar-portal" {...props}>
      {children}
    </div>
  );
}

function MenubarRadioGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-radio-group"
      role="radiogroup"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  );
}

function MenubarTrigger({
  className,
  onClick,
  isOpen,
  ...props
}: React.ComponentProps<"div"> & {
  isOpen?: boolean;
}) {
  return (
    <div
      data-slot="menubar-trigger"
      role="button"
      tabIndex={0}
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 flex items-center rounded-sm px-2 py-1 text-sm font-medium outline-none select-none cursor-pointer",
        isOpen && "bg-gray-100 dark:bg-gray-800",
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onClick) onClick(e as any);
        }
      }}
      {...props}
    />
  );
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  onClose,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "start" | "center" | "end";
  alignOffset?: number;
  sideOffset?: number;
  onClose?: () => void;
}) {
  const contentRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        if (onClose) onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  return (
    <MenubarPortal>
      <div
        ref={contentRef}
        data-slot="menubar-content"
        style={{ marginTop: sideOffset, marginLeft: alignOffset }}
        className={cn(
          "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 z-50 min-w-[12rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 p-1 shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </MenubarPortal>
  );
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const variantStyles = {
    default: "",
    destructive:
      "text-red-600 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/20",
  };

  return (
    <div
      data-slot="menubar-item"
      data-inset={inset}
      data-variant={variant}
      role="menuitem"
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        inset && "pl-8",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<"div"> & {
  checked?: boolean;
}) {
  return (
    <div
      data-slot="menubar-checkbox-item"
      role="menuitemcheckbox"
      aria-checked={checked}
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        {checked && <CheckIcon className="size-4" />}
      </span>
      {children}
    </div>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-radio-item"
      role="menuitemradio"
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
        <CircleIcon className="size-2 fill-current" />
      </span>
      {children}
    </div>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="menubar-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-medium",
        inset && "pl-8",
        className
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-separator"
      className={cn("bg-gray-200 dark:bg-gray-700 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menubar-shortcut"
      className={cn(
        "text-gray-500 dark:text-gray-400 ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function MenubarSub({ children, ...props }: React.ComponentProps<"div">) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div data-slot="menubar-sub" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === MenubarSubTrigger) {
            return React.cloneElement(child as React.ReactElement, {
              onClick: () => setIsOpen(!isOpen),
              isOpen,
            });
          }
          if (child.type === MenubarSubContent) {
            return isOpen ? child : null;
          }
        }
        return child;
      })}
    </div>
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  onClick,
  isOpen,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
  isOpen?: boolean;
}) {
  return (
    <div
      data-slot="menubar-sub-trigger"
      data-inset={inset}
      role="button"
      tabIndex={0}
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 data-[state=open]:bg-gray-100 dark:data-[state=open]:bg-gray-800 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        inset && "pl-8",
        isOpen && "bg-gray-100 dark:bg-gray-800",
        className
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (onClick) onClick(e as any);
        }
      }}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto h-4 w-4" />
    </div>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="menubar-sub-content"
      className={cn(
        "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarPortal,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
};
