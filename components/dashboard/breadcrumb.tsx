"use client";

import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex items-center text-sm text-gray-500 space-x-2">
      {parts.map((part, i) => {
        const href = "/" + parts.slice(0, i + 1).join("/");
        return (
          <span key={href}>
            {i > 0 && " / "}
            <a href={href} className="hover:underline capitalize">
              {part}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
