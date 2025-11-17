import * as React from "react";
import { cn } from "~/lib/utils";
import { Separator } from "~/components/ui/separator";

type ButtonGroupOrientation = "horizontal" | "vertical";

function ButtonGroup({
  className,
  orientation = "horizontal",
  ...props
}: React.ComponentProps<"div"> & {
  orientation?: ButtonGroupOrientation;
}) {
  const orientationStyles =
    orientation === "horizontal"
      ? "[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none"
      : "flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none";

  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn("flex w-fit items-stretch", orientationStyles, className)}
      {...props}
    />
  );
}

function ButtonGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "bg-gray-100 dark:bg-gray-800 flex items-center gap-2 rounded-md border border-gray-300 dark:border-gray-700 px-4 text-sm font-medium shadow-sm",
        className
      )}
      {...props}
    />
  );
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(
        "bg-gray-300 dark:bg-gray-700 relative !m-0 self-stretch",
        orientation === "vertical" ? "h-auto" : "",
        className
      )}
      {...props}
    />
  );
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText };
