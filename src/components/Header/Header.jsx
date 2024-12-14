import React from "react";
import { MainNav } from "@/components/ui/main-nav";

import ModeToggle from "@/components/ModeToggle";

export default function Header() {
  return (
    <>
      <MainNav className="mx-4" />
      <div className="ml-auto">
        <ModeToggle />
      </div>
    </>
  );
}
