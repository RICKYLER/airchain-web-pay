// This component provides a standardized interface for displaying documentation content.
// It takes a title, introduction, and an array of sections as props,
// allowing for flexible and reusable documentation page creation.

"use client" // Marks this as a Client Component, as it uses React hooks and client-side interactions.

import { Button } from "@/components/ui/Button/Button" // Shadcn UI Button component
import type React from "react" // Import React for JSX and types
import { Card, CardContent } from "@/components/ui/Card/Card" // Shadcn UI Card components
import { cn } from "@/lib/utils" // Utility function for conditionally joining Tailwind classes

// Define the shape of a single documentation section.
interface DocsSection {
  id: string // Unique identifier for the section
  title: string // Title of the section
  description: string // Detailed description of the section
  icon?: React.ReactNode // Optional icon to display next to the section title
}

// Define the props for the DocsInterface component.
interface DocsInterfaceProps {
  title: string // Main title of the documentation page
  introduction: string // Introductory paragraph for the page
  sections: DocsSection[] // Array of documentation sections to display
  isDarkMode: boolean // Boolean to control styling based on dark mode
}

// DocsInterface component definition.
export default function DocsInterface({ title, introduction, sections, isDarkMode }: DocsInterfaceProps) {
  return (
    // Card component wraps the entire documentation interface.
    // Styling changes based on `isDarkMode` prop for background, border, and blur effects.
    <Card
      className={cn(
        "backdrop-blur-xl border rounded-2xl",
        isDarkMode ? "bg-slate-800/30 border-slate-700/30" : "bg-white/50 border-slate-200/30",
      )}
    >
      <CardContent className="p-8">
        {/* Header section for the documentation page */}
        <div className="mb-6">
          {/* Main title of the page */}
          <h1 className={cn("text-4xl font-bold mt-2 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{title}</h1>
          {/* Introduction text */}
          <p className={cn("text-xl", isDarkMode ? "text-slate-300" : "text-slate-600")}>{introduction}</p>
        </div>

        {/* Main content area for sections */}
        {/* `prose` classes from @tailwindcss/typography plugin (if installed) would style markdown content.
            `prose-invert` inverts colors for dark mode. `max-w-none` removes max-width constraint. */}
        <div className="prose prose-invert max-w-none">
          {/* Section title for "Key Features" */}
          <h2 className={cn("text-2xl font-semibold mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
            Key Features
          </h2>

          {/* Container for individual documentation sections */}
          <div className="space-y-6">
            {/* Map through the `sections` array to render each section */}
            {sections.map((section, index) => (
              <div key={section.id} className="flex items-start space-x-4">
                {/* Icon or number indicator for each section */}
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center flex-shrink-0 mt-1">
                  {/* Render custom icon if provided, otherwise render section number */}
                  {section.icon ? section.icon : <span className="text-white text-sm font-bold">{index + 1}</span>}
                </div>
                {/* Section title and description */}
                <div>
                  <h3 className={cn("text-lg font-semibold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>
                    {section.title}
                  </h3>
                  <p className={cn(isDarkMode ? "text-slate-400" : "text-slate-600")}>{section.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Call to action section */}
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
            {/* Action buttons */}
            <div className="flex flex-wrap gap-3">
              <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg">
                Start Building
              </Button>
              <Button
                variant="outline"
                onClick={() => alert("Coming Soon!")} // Placeholder for a "Coming Soon" handler
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
