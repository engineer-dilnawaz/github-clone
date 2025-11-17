import * as React from "react";
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { cn } from "~/lib/utils";

function Select({
  children,
  value: controlledValue,
  onValueChange,
  defaultValue,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}) {
  const [internalValue, setInternalValue] = React.useState(defaultValue || "");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const setValue = isControlled
    ? onValueChange || (() => {})
    : setInternalValue;

  return (
    <div data-slot="select" {...props}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childElement = child as React.ReactElement<any>;
          return React.cloneElement(childElement, {
            ...childElement.props,
            value,
            setValue,
          });
        }
        return child;
      })}
    </div>
  );
}

function SelectGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-group"
      className={cn("flex flex-col gap-0 p-1", className)}
      {...props}
    />
  );
}

function SelectValue({
  placeholder,
  ...props
}: React.ComponentProps<"span"> & {
  placeholder?: string;
}) {
  return (
    <span
      data-slot="select-value"
      className="line-clamp-1 flex items-center gap-2"
      {...props}
    >
      {placeholder}
    </span>
  );
}

function SelectTrigger({
  className,
  size = "default",
  children,
  hideSelectPrimitiveIcon = false,
  value,
  setValue,
  ...props
}: React.ComponentProps<"button"> & {
  size?: "sm" | "default";
  hideSelectPrimitiveIcon?: boolean;
  value?: string;
  setValue?: (value: string) => void;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <button
        ref={triggerRef}
        data-slot="select-trigger"
        data-size={size}
        type="button"
        className={cn(
          "border border-gray-300 dark:border-gray-700 flex w-fit items-center justify-between gap-2 rounded-md bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-900/50 dark:hover:bg-gray-800/50",
          size === "default" ? "h-9" : "h-8",
          className
        )}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        {!hideSelectPrimitiveIcon && (
          <ChevronDownIcon className="size-4 opacity-50" />
        )}
      </button>
      {isOpen &&
        React.Children.toArray(children).find(
          (child) =>
            React.isValidElement(child) &&
            (child as React.ReactElement).type === SelectContent
        )}
    </>
  );
}

function SelectContent({
  className,
  children,
  value,
  setValue,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  setValue?: (value: string) => void;
}) {
  return (
    <div
      data-slot="select-content"
      className={cn(
        "bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-gray-200 dark:border-gray-800 shadow-md",
        className
      )}
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const childElement = child as React.ReactElement<any>;
            if (childElement.type === SelectItem) {
              return React.cloneElement(childElement, {
                ...childElement.props,
                value: value,
                setValue,
                itemValue:
                  childElement.props.value || childElement.props.itemValue,
              });
            }
            return React.cloneElement(childElement, {
              ...childElement.props,
              value,
              setValue,
            });
          }
          return child;
        })}
      </div>
    </div>
  );
}

function SelectLabel({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-label"
      className={cn(
        "text-gray-600 dark:text-gray-400 px-2 py-1.5 text-xs",
        className
      )}
      {...props}
    />
  );
}

function SelectItem({
  className,
  children,
  value: selectedValue,
  setValue,
  itemValue,
  ...props
}: React.ComponentProps<"div"> & {
  value?: string;
  setValue?: (value: string) => void;
  itemValue?: string;
}) {
  const isSelected = selectedValue === itemValue;

  return (
    <div
      data-slot="select-item"
      role="option"
      className={cn(
        "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none hover:bg-gray-100 dark:hover:bg-gray-800 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-gray-100 dark:bg-gray-800",
        className
      )}
      onClick={() => {
        if (setValue && itemValue) {
          setValue(itemValue);
        }
      }}
      {...props}
    >
      {children}
      {isSelected && (
        <span className="absolute right-2 flex size-3.5 items-center justify-center">
          <CheckIcon className="size-4" />
        </span>
      )}
    </div>
  );
}

function SelectSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-separator"
      className={cn(
        "bg-gray-200 dark:bg-gray-700 pointer-events-none -mx-1 my-1 h-px",
        className
      )}
      {...props}
    />
  );
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-up-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </div>
  );
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="select-scroll-down-button"
      className={cn(
        "flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </div>
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
