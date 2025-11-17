import * as React from "react";
import { cn } from "~/lib/utils";

function TooltipProvider({
  delayDuration = 0,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  delayDuration?: number;
}) {
  return (
    <div data-slot="tooltip-provider" {...props}>
      {children}
    </div>
  );
}

function Tooltip({ children, ...props }: React.ComponentProps<"div">) {
  return (
    <TooltipProvider>
      <div data-slot="tooltip" {...props}>
        {children}
      </div>
    </TooltipProvider>
  );
}

function TooltipTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  const [isOpen, setIsOpen] = React.useState(false);

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
      onMouseEnter: () => setIsOpen(true),
      onMouseLeave: () => setIsOpen(false),
      onFocus: () => setIsOpen(true),
      onBlur: () => setIsOpen(false),
    });
  }

  return (
    <div
      data-slot="tooltip-trigger"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      {...props}
    >
      {children}
      {isOpen &&
        React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            (child as React.ReactElement).type === TooltipContent
        )}
    </div>
  );
}

function TooltipContent({
  className,
  sideOffset = 0,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  sideOffset?: number;
}) {
  return (
    <div
      data-slot="tooltip-content"
      style={{ marginTop: sideOffset }}
      className={cn(
        "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 z-50 w-fit rounded-md px-3 py-1.5 text-xs",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
