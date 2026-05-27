import { cn } from "@/lib/utils/cn";
interface ShellProps { children: React.ReactNode; className?: string; variant?: "default" | "wide" | "narrow" | "full"; }
export function Shell({ children, className, variant = "default" }: ShellProps) {
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", variant === "default" && "max-w-5xl", variant === "wide" && "max-w-7xl", variant === "narrow" && "max-w-2xl", className)}>
      {children}
    </div>
  );
}
