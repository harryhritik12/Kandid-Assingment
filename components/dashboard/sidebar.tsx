"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  FlaskConical,
  Mail,
  Linkedin,
  Settings,
  FileText,
  UserCog,
} from "lucide-react"
import { cn } from "@/lib/utils"

const mainNav = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Leads", href: "/dashboard/leads", icon: Users },
  { name: "Campaign", href: "/dashboard/campaigns", icon: FlaskConical },
  { name: "Messages", href: "/dashboard/messages", icon: Mail, badge: "10+" },
  { name: "Linkedin Accounts", href: "/dashboard/accounts", icon: Linkedin },
]

const settingsNav = [
  { name: "Setting & Billing", href: "/dashboard/settings", icon: Settings },
]

const adminNav = [
  { name: "Activity logs", href: "/dashboard/activity", icon: FileText },
  { name: "User logs", href: "/dashboard/users", icon: UserCog },
]

export function Sidebar() {
  const pathname = usePathname()

  const renderNav = (items: typeof mainNav) =>
    items.map(({ name, href, icon: Icon, badge }) => (
      <Link
        key={name}
        href={href}
        className={cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
          pathname === href
            ? "bg-blue-50 text-blue-600"
            : "text-gray-700 hover:bg-gray-100"
        )}
      >
        <Icon className="h-4 w-4" />
        <span className="flex-1">{name}</span>
        {badge && (
          <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white">
            {badge}
          </span>
        )}
      </Link>
    ))

  return (
    <aside className="flex h-screen w-64 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center px-4 text-lg font-bold">
        <span className="text-blue-600">Link</span>Bird
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto px-2 py-4">
        <div>
          <p className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase">
            Overview
          </p>
          <div className="space-y-1">{renderNav(mainNav)}</div>
        </div>

        <div>
          <p className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase">
            Settings
          </p>
          <div className="space-y-1">{renderNav(settingsNav)}</div>
        </div>

        <div>
          <p className="mb-2 px-2 text-xs font-semibold text-gray-500 uppercase">
            Admin Panel
          </p>
          <div className="space-y-1">{renderNav(adminNav)}</div>
        </div>
      </nav>

      {/* Footer (profile / actions) */}
      <div className="border-t px-4 py-3 text-sm">
        <div className="font-medium">Bhavya From Kandid</div>
        <div className="text-gray-500">bhavya@kandid.ai</div>
      </div>
    </aside>
  )
}
