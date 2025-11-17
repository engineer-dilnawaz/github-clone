import * as React from "react";
import { XIcon } from "lucide-react";
import { cn } from "~/lib/utils";

type SheetSide = "top" | "right" | "bottom" | "left";

function Sheet({
  children,
  open: controlledOpen,
  onOpenChange,
  modal = true,
  ...props
}: React.ComponentProps<"div"> & {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
}) {
  const [internalOpen, setInternalOpen] = React.useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const setOpen = isControlled ? onOpenChange || (() => {}) : setInternalOpen;

  React.useEffect(() => {
    if (React.isValidElement(children)) {
      React.Children.forEach(children, (child) => {
        if (React.isValidElement(child) && child.type === SheetTrigger) {
          const triggerElement = React.cloneElement(
            child as React.ReactElement,
            {
              onClick: (e: React.MouseEvent) => {
                setOpen(!open);
                if ((child as React.ReactElement).props.onClick) {
                  (child as React.ReactElement).props.onClick(e);
                }
              },
            }
          );
        }
      });
    }
  }, [children, open, setOpen]);

  const contextValue = React.useMemo(
    () => ({ open, setOpen, modal }),
    [open, setOpen, modal]
  );

  return (
    <div data-slot="sheet" data-open={open} {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (child.type === SheetTrigger) {
            return React.cloneElement(child as React.ReactElement, {
              onClick: () => setOpen(!open),
            });
          }
          if (child.type === SheetContent) {
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

function SheetTrigger({
  asChild,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  asChild?: boolean;
}) {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement, {
      ...props,
      onClick: (e: React.MouseEvent) => {
        if (props.onClick) props.onClick(e);
        if ((children as React.ReactElement).props.onClick) {
          (children as React.ReactElement).props.onClick(e);
        }
      },
    });
  }

  return (
    <div
      data-slot="sheet-trigger"
      role="button"
      tabIndex={0}
      onClick={props.onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if (props.onClick) props.onClick(e as any);
        }
      }}
      {...props}
    >
      {children}
    </div>
  );
}

function SheetClose({ children, ...props }: React.ComponentProps<"button">) {
  return (
    <button data-slot="sheet-close" type="button" {...props}>
      {children}
    </button>
  );
}

function SheetOverlay({
  className,
  onClick,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50 transition-opacity",
        className
      )}
      onClick={onClick}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  onClose,
  ...props
}: React.ComponentProps<"div"> & {
  side?: SheetSide;
  onClose?: () => void;
}) {
  const sideStyles = {
    right: "inset-y-0 right-0 h-full w-3/4 border-l sm:max-w-sm",
    left: "inset-y-0 left-0 h-full w-3/4 border-r sm:max-w-sm",
    top: "inset-x-0 top-0 h-auto border-b",
    bottom: "inset-x-0 bottom-0 h-auto border-t",
  };

  return (
    <>
      <SheetOverlay onClick={onClose} />
      <div
        data-slot="sheet-content"
        className={cn(
          "bg-white dark:bg-gray-950 fixed z-50 flex flex-col gap-4 shadow-lg transition-transform border border-gray-200 dark:border-gray-800",
          sideStyles[side],
          className
        )}
        {...props}
      >
        {children}
        <SheetClose
          className="ring-offset-white focus:ring-gray-950 absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none"
          onClick={onClose}
        >
          <XIcon className="size-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </div>
    </>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-1.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-title"
      className={cn("text-gray-900 dark:text-gray-50 font-semibold", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-description"
      className={cn("text-gray-600 dark:text-gray-400 text-sm", className)}
      {...props}
    />
  );
}

export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
