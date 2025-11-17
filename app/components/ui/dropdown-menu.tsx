import * as React from "react";
import { CheckIcon, ChevronRightIcon, CircleIcon } from "lucide-react";
import { cn } from "~/lib/utils";

function DropdownMenu({
  children,
  open: controlledOpen,
  onOpenChange,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange || (() => {}) : setInternalOpen;

  return (
    <div data-slot="dropdown-menu" data-open={open} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === DropdownMenuTrigger) {
            return React.cloneElement(child as React.ReactElement, {
              onClick: () => setOpen(!open),
            });
          }
          if (child.type === DropdownMenuContent) {
            return open
              ? React.cloneElement(child as React.ReactElement, {
                  onClose: () => setOpen(false),
                })
              : null;
          }
        }
        return child;
      })}
    </div>
  );
}

function DropdownMenuPortal({
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div data-slot="dropdown-menu-portal" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
    });
  }

  return (
    <div
      data-slot="dropdown-menu-trigger"
      role="button"
      tabIndex={0}
      {...props}
    >
      {children}
    </div>
  );
}

function DropdownMenuContent({
  className,
  sideOffset = 4,
  onClose,
  children,
  ...props
}: React.ComponentProps<"div"> & {
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
    <DropdownMenuPortal>
      <div
        ref={contentRef}
        data-slot="dropdown-menu-content"
        style={{ marginTop: sideOffset }}
        className={cn(
          "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 p-1 shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </DropdownMenuPortal>
  );
}

function DropdownMenuGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-group"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  );
}

function DropdownMenuItem({
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
      data-slot="dropdown-menu-item"
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

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  ...props
}: React.ComponentProps<"div"> & {
  checked?: boolean;
}) {
  return (
    <div
      data-slot="dropdown-menu-checkbox-item"
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

function DropdownMenuRadioGroup({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-radio-group"
      role="radiogroup"
      className={cn("flex flex-col gap-0", className)}
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-radio-item"
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

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="dropdown-menu-label"
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

function DropdownMenuSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-separator"
      className={cn("bg-gray-200 dark:bg-gray-700 -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-gray-500 dark:text-gray-400 ml-auto text-xs tracking-widest",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dropdown-menu-sub" {...props}>
      {children}
    </div>
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  inset?: boolean;
}) {
  return (
    <div
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "focus:bg-gray-100 dark:focus:bg-gray-800 flex cursor-default items-center rounded-sm px-2 py-1.5 text-sm outline-none select-none",
        inset && "pl-8",
        className
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ml-auto size-4" />
    </div>
  );
}

function DropdownMenuSubContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 z-50 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 p-1 shadow-lg",
        className
      )}
      {...props}
    />
  );
}

export {
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
