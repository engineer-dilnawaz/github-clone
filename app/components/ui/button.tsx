import * as React from "react";
import { cn } from "~/lib/utils";

type ButtonVariant =
  | "default"
  | "destructive"
  | "outline"
  | "secondary"
  | "ghost"
  | "link";
type ButtonSize = "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  default: "bg-blue-600 text-white hover:bg-blue-700",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline:
    "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
  secondary:
    "bg-gray-200 text-gray-900 hover:bg-gray-300 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
  link: "text-blue-600 underline-offset-4 hover:underline dark:text-blue-400",
};

const sizeStyles: Record<ButtonSize, string> = {
  default: "h-9 px-4 py-2",
  sm: "h-8 px-3 gap-1.5 rounded-md",
  lg: "h-10 px-6 rounded-md",
  icon: "size-9",
  "icon-sm": "size-8",
  "icon-lg": "size-10",
};

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

  const styles = cn(
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(props.children)) {
    const child = props.children as React.ReactElement<any>;
    return React.cloneElement(child, {
      ...child.props,
      className: cn(styles, child.props.className),
    });
  }

  return <button data-slot="button" className={styles} {...props} />;
}

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };
