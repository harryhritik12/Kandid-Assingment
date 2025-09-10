import * as React from "react"
import { cn } from "@/lib/utils"

type Variant = "default" | "ghost" | "outline" | "destructive"
type Size = "default" | "sm" | "lg" | "icon"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantClasses: Record<Variant, string> = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      ghost: "bg-transparent hover:bg-gray-100 text-gray-700",
      outline: "border border-gray-300 text-gray-700 hover:bg-gray-50",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    }

    const sizeClasses: Record<Size, string> = {
      default: "px-4 py-2",
      sm: "px-3 py-1 text-sm",
      lg: "px-6 py-3 text-lg",
      icon: "h-10 w-10 flex items-center justify-center p-0",
    }

    return (
      <button
        ref={ref}
        className={cn(
          "rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed transition",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
