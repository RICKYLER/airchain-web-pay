"use client"

import type React from "react"
import DocsSidebarNavigation from "@/components/docs/docs-sidebar-navigation"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface DocsLayoutProps {
  children: React.ReactNode
}

export default function DocsLayout({ children }: DocsLayoutProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const isDarkMode = theme === "dark"

  return (
    <section className="pt-8 px-4 pb-20">
      {" "}
      {/* Adjusted padding as header is now global */}
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <DocsSidebarNavigation /> {/* No longer passing isDarkMode prop */}
          </div>
          <div className="lg:col-span-2">{children}</div>
        </div>
      </div>
    </section>
  )
}
