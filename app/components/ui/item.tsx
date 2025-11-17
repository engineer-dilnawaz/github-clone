import * as React from "react";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

type ItemVariant = "default" | "outline" | "muted";
type ItemSize = "default" | "sm";

function ItemGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn("group/item-group flex flex-col", className)}
      {...props}
    />
  );
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn("my-0", className)}
      {...props}
    />
  );
}

function Item({
  className,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: ItemVariant;
  size?: ItemSize;
}) {
  const variantStyles = {
    default: "bg-transparent",
    outline: "border border-gray-300 dark:border-gray-700",
    muted: "bg-gray-50 dark:bg-gray-900/50",
  };

  const sizeStyles = {
    default: "p-4 gap-4",
    sm: "py-3 px-4 gap-2.5",
  };

  return (
    <div
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(
        "group/item flex items-center border border-transparent text-sm rounded-md transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 flex-wrap",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    />
  );
}

function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & {
  variant?: "default" | "icon" | "image";
}) {
  const variantStyles = {
    default: "bg-transparent",
    icon: "size-8 border border-gray-300 dark:border-gray-700 rounded-sm bg-gray-100 dark:bg-gray-800",
    image:
      "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
  };

  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(
        "flex shrink-0 items-center justify-center gap-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-content"
      className={cn("flex flex-1 flex-col gap-1", className)}
      {...props}
    />
  );
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-title"
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  );
}

function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="item-description"
      className={cn(
        "text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-normal font-normal",
        className
      )}
      {...props}
    />
  );
}

function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-actions"
      className={cn("flex items-center gap-2", className)}
      {...props}
    />
  );
}

function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-header"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  );
}

function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="item-footer"
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  );
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
};
