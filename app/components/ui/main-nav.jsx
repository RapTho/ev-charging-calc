"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({ className, ...props }) {
  const path = usePathname();

  const defaultClasses =
    "text-muted-foreground text-lg font-medium transition-colors hover:text-primary";
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className={path === "/" ? defaultClasses.slice(21, -1) : defaultClasses}
      >
        Home
      </Link>
      <Link
        href="/settings"
        className={
          path === "/settings" ? defaultClasses.slice(21, -1) : defaultClasses
        }
      >
        Settings
      </Link>
    </nav>
  );
}
