// This is the global error boundary component for your Next.js application.
// It catches unexpected errors that occur during rendering, in data fetching, or in event handlers.
// This component must be a Client Component.

"use client" // Marks this as a Client Component

import { useEffect } from "react"
import { Button } from "@/components/ui/Button/Button" // Shadcn UI Button component
import { Card, CardContent } from "@/components/ui/Card/Card" // Shadcn UI Card components
import { AlertTriangle, RefreshCw, Home } from "lucide-react" // Icons from Lucide React

// The Error component receives `error` and `reset` props from Next.js.
// `error`: The error object that was caught.
// `reset`: A function to attempt to recover from the error by re-rendering the segment.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string } // Error object with an optional digest property
  reset: () => void // Function to reset the error boundary
}) {
  // `useEffect` is used to log the error to the console for debugging purposes.
  // This runs only when the `error` object changes.
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    // Full-screen container for the error message, with a gradient background.
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
      {/* Card to display the error message, with a semi-transparent dark background and blur effect. */}
      <Card className="bg-slate-800/80 backdrop-blur-xl border-red-500/30 rounded-2xl max-w-md w-full">
        <CardContent className="p-8 text-center">
          {/* Error icon */}
          <AlertTriangle className="h-16 w-16 mx-auto mb-4 text-red-500" />
          {/* Error title */}
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong!</h2>
          {/* Error description */}
          <p className="text-slate-300 mb-6">We encountered an unexpected error. This could be a temporary issue.</p>
          {/* Action buttons */}
          <div className="space-y-3">
            {/* "Try again" button, calls the `reset` function to re-attempt rendering. */}
            <Button
              onClick={reset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </Button>
            {/* "Go home" button, reloads the page and navigates to the root. */}
            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")} // Forces a full page reload to clear state
              className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50 rounded-lg bg-transparent flex items-center justify-center gap-2"
            >
              <Home className="h-4 w-4" />
              Go home
            </Button>
          </div>
          {/* Optional error digest for debugging. */}
          {error.digest && <p className="text-xs text-slate-500 mt-4">Error ID: {error.digest}</p>}
        </CardContent>
      </Card>
    </div>
  )
}
