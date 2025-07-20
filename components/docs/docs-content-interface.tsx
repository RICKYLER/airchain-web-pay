"use client"

import { Button } from "@/components/ui/Button/Button"
import type React from "react"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

interface DocsSection {
  id: string
  title: string
  description: string
  icon?: React.ReactNode
}

interface DocsContentInterfaceProps {
  title: string
  introduction: string
  sections: DocsSection[]
}

export default function DocsContentInterface({ title, introduction, sections }: DocsContentInterfaceProps) {
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
    <Card
      className={cn(
        "backdrop-blur-xl border rounded-2xl",
        isDarkMode ? "bg-slate-800/30 border-slate-700/30" : "bg-white/50 border-slate-200/30",
      )}
    >
      <CardContent className="p-8">
        <div className="mb-6">
          <h1 className={cn("text-4xl font-bold mt-2 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{title}</h1>
          <p className={cn("text-xl", isDarkMode ? "text-slate-300" : "text-slate-600")}>{introduction}</p>
        </div>

        <div className="prose prose-invert max-w-none">
          <h2 className={cn("text-2xl font-semibold mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
            Key Features
          </h2>

          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-start space-x-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  {section.icon ? section.icon : <span className="text-white text-sm font-bold">{index + 1}</span>}
                </div>
                <div>
                  <h3 className={cn("text-lg font-semibold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>
                    {section.title}
                  </h3>
                  <p className={cn(isDarkMode ? "text-slate-400" : "text-slate-600")}>{section.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div
            className={cn(
              "mt-8 p-6 rounded-xl border",
              isDarkMode ? "bg-blue-500/10 border-blue-400/20" : "bg-blue-50/80 border-blue-200/50",
            )}
          >
            <h3 className={cn("text-lg font-semibold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>
              Ready to get started?
            </h3>
            <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
              Join thousands of developers building the next generation of payment applications.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg">
                Start Building
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Coming Soon!")}
                className={cn(
                  "rounded-lg bg-transparent",
                  isDarkMode
                    ? "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                    : "border-slate-300 text-slate-700 hover:bg-slate-100/50",
                )}
              >
                View Examples
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
