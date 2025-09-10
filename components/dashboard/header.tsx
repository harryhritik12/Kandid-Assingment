"use client";

import { UserNav } from "./user-nav";
import { Breadcrumb } from "./breadcrumb";

export default function Header() {
  return (
    <header className="h-16 border-b bg-white dark:bg-gray-900 dark:border-gray-800 flex items-center justify-between px-6">
      <Breadcrumb />
      <UserNav />
    </header>
  );
}
