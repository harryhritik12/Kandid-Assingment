import { cn } from "@/lib/utils";

export function Badge({ children, className, variant }: { children: React.ReactNode, className?: string, variant?: "success" | "outline" }) {
  const base = "px-2 py-0.5 rounded text-xs font-medium";
  const styles = {
    success: "bg-green-100 text-green-800",
    outline: "border border-gray-300 text-gray-700",
  };
  return <span className={cn(base, styles[variant || "outline"], className)}>{children}</span>;
}
