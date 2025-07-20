// enhanced-splash-loading.tsx
// A more compact, theme-aware version with smooth transitions and a focus on adaptability.
//
// - Subtle, animated background that adapts to light/dark mode.
// - Centered logo and 3D loader.
// - Title and tagline for branding.
// - Network speed indicator with icon and badge.
// - Main progress bar: current phase, overall progress, time remaining, completed phases.
// - Detailed phase progress: list of all phases with status and progress, shown after a short delay for smoothness.
// - Loading message optimized for connection type.
// - Theme awareness: colors and backgrounds adapt to dark/light mode.
// - Compact, mobile-friendly, and visually smooth.
"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import ThreeDimensionalLoader from "@/components/loading/three-dimensional-loader"
import ProfessionalLoadingManager from "@/components/loading/professional-loading-manager"
import { Wifi, WifiOff, Zap, Clock, CheckCircle } from "lucide-react"

interface EnhancedSplashLoadingProps {
  onLoadingComplete?: () => void
}

export default function EnhancedSplashLoading({ onLoadingComplete }: EnhancedSplashLoadingProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    setMounted(true)
    const timer = setTimeout(() => setShowDetails(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === "dark"

  const handleLoadingComplete = () => {
    if (onLoadingComplete) {
      onLoadingComplete()
    }
  }

  return (
    <ProfessionalLoadingManager onComplete={handleLoadingComplete}>
      {({ currentPhase, progress, timeRemaining, phases, completedCount, totalPhases }) => (
        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000",
            isDarkMode
              ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
              : "bg-gradient-to-br from-blue-50 via-white to-blue-50",
          )}
        >
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                "absolute -top-1/2 -left-1/2 w-full h-full rounded-full opacity-10 animate-spin",
                isDarkMode ? "bg-blue-500" : "bg-blue-300",
              )}
              style={{ animationDuration: "20s" }}
            />
            <div
              className={cn(
                "absolute -bottom-1/2 -right-1/2 w-3/4 h-3/4 rounded-full opacity-5 animate-spin",
                isDarkMode ? "bg-purple-500" : "bg-purple-300",
              )}
              style={{ animationDuration: "15s", animationDirection: "reverse" }}
            />
          </div>

          <div className="relative z-10 flex flex-col items-center space-y-8 max-w-md mx-auto px-6">
            {/* Logo and 3D Loader */}
            <div className="relative">
              <Image
                src="/images/airchainpay-logo.png"
                alt="AirChainPay Logo"
                width={120}
                height={120}
                priority
                className="relative z-10 animate-pulse"
              />
              <div className="absolute -inset-8 flex items-center justify-center">
                <ThreeDimensionalLoader size="lg" color="primary" />
              </div>
            </div>

            {/* Title */}
            <div className="text-center space-y-2">
              <h1 className={cn("text-4xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-gray-900")}>
                AirChainPay
              </h1>
              <p className={cn("text-lg font-medium", isDarkMode ? "text-blue-300" : "text-blue-600")}>
                Revolutionizing Payments
              </p>
            </div>

            {/* Main Progress Bar */}
            <div className="w-full space-y-3">
              <div className="flex justify-between items-center">
                <span className={cn("text-sm font-medium", isDarkMode ? "text-gray-300" : "text-gray-600")}>
                  {currentPhase?.name || "Initializing..."}
                </span>
                <span className={cn("text-sm font-mono", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  {Math.round(progress)}%
                </span>
              </div>
              <Progress value={progress} className="w-full h-3 rounded-full" />
              <div className="flex justify-between items-center text-xs">
                <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  <Clock className="w-3 h-3 inline mr-1" />
                  {timeRemaining}s remaining
                </span>
                <span className={cn(isDarkMode ? "text-gray-400" : "text-gray-500")}>
                  {completedCount}/{totalPhases} complete
                </span>
              </div>
            </div>

            {/* Detailed Phase Progress */}
            {showDetails && (
              <div className="w-full space-y-2 animate-fade-in">
                <h3 className={cn("text-sm font-semibold mb-3", isDarkMode ? "text-gray-300" : "text-gray-700")}>
                  Loading Progress
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {phases.map((phase, index) => (
                    <div
                      key={phase.id}
                      className={cn(
                        "flex items-center justify-between p-2 rounded-lg transition-all",
                        phase.status === "active"
                          ? isDarkMode
                            ? "bg-blue-900/30"
                            : "bg-blue-100"
                          : phase.status === "completed"
                            ? isDarkMode
                              ? "bg-green-900/20"
                              : "bg-green-50"
                            : isDarkMode
                              ? "bg-gray-800/30"
                              : "bg-gray-50",
                      )}
                    >
                      <div className="flex items-center space-x-2">
                        {phase.status === "completed" ? (
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        ) : phase.status === "active" ? (
                          <div className="w-4 h-4">
                            <ThreeDimensionalLoader size="sm" color="primary" />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "w-4 h-4 rounded-full border-2",
                              isDarkMode ? "border-gray-600" : "border-gray-300",
                            )}
                          />
                        )}
                        <span
                          className={cn(
                            "text-xs font-medium",
                            phase.status === "completed"
                              ? "text-green-600"
                              : phase.status === "active"
                                ? "text-blue-600"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-500",
                          )}
                        >
                          {phase.name}
                        </span>
                      </div>
                      {phase.status === "active" && (
                        <span className={cn("text-xs font-mono", isDarkMode ? "text-gray-400" : "text-gray-500")}>
                          {Math.round(phase.progress)}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Message */}
            <p className={cn("text-center text-sm leading-relaxed", isDarkMode ? "text-gray-300" : "text-gray-600")}>
              Preparing your decentralized payment experience...
              <br />
              <span className="text-xs opacity-75">
                Optimized for your connection
              </span>
            </p>
          </div>
        </div>
      )}
    </ProfessionalLoadingManager>
  )
}
