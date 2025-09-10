"use client";

import Image from "next/image";
import { Menu, LogOut } from "lucide-react";
import { useState } from "react";

export function UserNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
      >
        <Image
          src="/images/avatar.png"
          alt="User Avatar"
          width={32}
          height={32}
          className="rounded-full"
        />
        <span className="hidden md:inline">John Doe</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            <Menu size={16} /> Profile
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            <LogOut size={16} /> Logout
          </button>
        </div>
      )}
    </div>
  );
}
