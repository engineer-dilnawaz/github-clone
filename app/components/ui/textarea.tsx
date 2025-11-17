import * as React from "react";
import { cn } from "~/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-16 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-transparent px-3 py-2 text-base text-sm shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 placeholder:text-gray-500 dark:bg-gray-900/50",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
