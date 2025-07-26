"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function DocsSidebarNavigation() {
  const pathname = usePathname()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const isDarkMode = theme === "dark"

  const navItems = [
    { name: "Introduction", href: "/about" },
    { name: "Quick Start", href: "/quick-start" },
    { name: "API Reference", href: "/api-reference" },
    { name: "SDK Documentation", href: "/sdk-documentation" },
    { name: "Examples", href: "/examples" },
    { name: "Community", href: "/community" },
  ]

  return (
    <Card
      className={cn(
        "backdrop-blur-xl border rounded-2xl sticky top-32",
        isDarkMode ? "bg-slate-800/90 border-slate-700/60" : "bg-white/90 border-slate-200/60",
      )}
    >
      <CardContent className="p-6">
        <h3 className={cn("text-lg font-semibold mb-4", isDarkMode ? "text-white" : "text-slate-900")}>Navigation</h3>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-lg transition-all",
                  isActive
                    ? isDarkMode
                      ? "bg-blue-500/20 text-blue-300"
                      : "bg-blue-100 text-blue-700"
                    : isDarkMode
                      ? "text-slate-400 hover:text-white hover:bg-slate-700/50"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/50",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      </CardContent>
    </Card>
  )
}
