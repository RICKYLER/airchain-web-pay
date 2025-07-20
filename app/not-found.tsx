// This is the custom 404 Not Found page for your Next.js application.
// It's displayed when a user navigates to a route that doesn't exist.
// This component must be a Client Component.

"use client" // Marks this as a Client Component

import Link from "next/link" // Next.js Link component for client-side navigation
import { Button } from "@/components/ui/Button/Button" // Shadcn UI Button component
import { Card, CardContent } from "@/components/ui/Card/Card" // Shadcn UI Card components
import { Search, Home, ArrowLeft } from "lucide-react" // Icons from Lucide React

export default function NotFound() {
  return (
    // Full-screen container for the 404 message, with a gradient background.
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Card to display the 404 message, with a semi-transparent dark background and blur effect. */}
      <Card className="bg-slate-800/80 backdrop-blur-xl border-blue-500/30 rounded-2xl max-w-md w-full">
        <CardContent className="p-8 text-center">
          {/* Large 404 text */}
          <div className="text-6xl font-bold text-blue-400 mb-4">404</div>
          {/* Search icon */}
          <Search className="h-16 w-16 mx-auto mb-4 text-blue-500" />
          {/* Page title */}
          <h2 className="text-2xl font-bold text-white mb-2">Page Not Found</h2>
          {/* Description */}
          <p className="text-slate-300 mb-6">The page you're looking for doesn't exist or has been moved.</p>
          {/* Action buttons */}
          <div className="space-y-3">
            {/* "Go home" button, uses Next.js Link for client-side navigation to the root. */}
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
              <Link href="/" className="flex items-center justify-center gap-2">
                <Home className="h-4 w-4" />
                Go home
              </Link>
            </Button>
            {/* "Go back" button, uses browser history to navigate back. */}
            <Button
              variant="outline"
              onClick={() => window.history.back()} // Navigates back in browser history
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 rounded-lg bg-transparent flex items-center justify-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Go back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
