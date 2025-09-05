import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import Icon from "./icon";

interface ChipProps extends React.HTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "selected" | "outline";
  size?: "sm" | "md" | "lg";
  removable?: boolean;
  onRemove?: () => void;
  children: React.ReactNode;
}

const Chip = forwardRef<HTMLButtonElement, ChipProps>(
  ({ className, variant = "default", size = "md", removable, onRemove, children, ...props }, ref) => {
    const baseClasses = "inline-flex items-center gap-1.5 rounded-full font-medium transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    
    const variantClasses = {
      default: "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200",
      selected: "bg-game-blue text-white hover:bg-game-blue/90",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300"
    };

    const sizeClasses = {
      sm: "px-2 py-1 text-xs",
      md: "px-3 py-1.5 text-sm",
      lg: "px-4 py-2 text-base"
    };

    return (
      <button
        ref={ref}
        className={cn(
          baseClasses,
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
        {removable && onRemove && (
          <Icon 
            name="X" 
            size={size === "sm" ? 12 : size === "md" ? 14 : 16}
            className="hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          />
        )}
      </button>
    );
  }
);

Chip.displayName = "Chip";

export { Chip };