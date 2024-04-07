import React from "react";
import { MainNav } from "@/components/ui/main-nav";
import { Search } from "@/components/ui/search";

import ModeToggle from "@/components/ModeToggle";

export default function Header() {
  return (
    <>
      <MainNav className="mx-6" />
      <div className="ml-auto flex items-center space-x-4">
        <Search />
        <ModeToggle />
      </div>
    </>
  );
}
