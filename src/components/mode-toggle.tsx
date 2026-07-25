import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function ModeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const iconClassName =
    "absolute inset-0 h-full w-full stroke-[2] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

  if (!mounted) {
    return (
      <Button
        type="button"
        variant="link"
        size="icon"
        aria-label="Switch theme"
        className={cn("relative overflow-hidden", className)}
      >
        <span className="relative block h-full w-full">
          <Sun className="absolute inset-0 h-full w-full stroke-[2]" aria-hidden />
        </span>
      </Button>
    );
  }

  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="link"
      size="icon"
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn("group relative overflow-hidden", className)}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span
        className="pointer-events-none absolute inset-1 rounded-full bg-current opacity-0 blur-md transition-opacity duration-500 group-active:opacity-15 motion-reduce:transition-none"
        aria-hidden
      />
      <span className="relative block h-full w-full">
        <Sun
          className={cn(
            iconClassName,
            isDark
              ? "rotate-90 scale-50 opacity-0"
              : "rotate-0 scale-100 opacity-100"
          )}
          aria-hidden
        />
        <Moon
          className={cn(
            iconClassName,
            isDark
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-50 opacity-0"
          )}
          aria-hidden
        />
      </span>
    </Button>
  );
}
