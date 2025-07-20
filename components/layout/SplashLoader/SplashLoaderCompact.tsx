"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import CompactThreeDimensionalLoader from "@/components/loading/compact-three-dimensional-loader"
import CompactLoadingManager from "@/components/loading/compact-loading-manager"
import { Wifi, WifiOff, Zap, Clock, CheckCircle, Monitor, Smartphone } from "lucide-react"

interface CompactSplashLoadingProps {
  onComplete: () => void
}

export default function CompactSplashLoading({ onComplete }: CompactSplashLoadingProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  if (!mounted) return null

  return (
    <CompactLoadingManager onComplete={onComplete}>
      {({ currentPhase, progress, networkSpeed, timeRemaining, phases, completedCount }) => (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white">
          {/* Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full animate-spin-slow" />
          </div>

          {/* Main Content - Compact Layout */}
          <div className="relative z-10 w-full max-w-2xl mx-auto px-6 space-y-6">
            {/* Logo Section - Compact */}
            <div className="text-center space-y-3">
              <div className="relative inline-flex items-center justify-center">
                <Image
                  src="/images/airchainpay-logo.png"
                  alt="AirChainPay Logo"
                  width={80}
                  height={80}
                  className="relative z-10"
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <CompactThreeDimensionalLoader size="lg" />
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AirChainPay</h1>
              <p className="text-lg md:text-xl text-blue-300">Revolutionizing Payments</p>
            </div>

            {/* Device & Network Status - Compact Row */}
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                {isMobile ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                <span className="text-sm font-medium">{isMobile ? "Mobile" : "Desktop"} Experience</span>
              </div>

              {networkSpeed && (
                <Badge
                  variant={
                    networkSpeed.speed === "fast"
                      ? "default"
                      : networkSpeed.speed === "slow"
                        ? "destructive"
                        : "secondary"
                  }
                  className="flex items-center gap-1.5 px-3 py-1.5"
                >
                  {networkSpeed.speed === "fast" ? (
                    <Zap className="w-3 h-3" />
                  ) : networkSpeed.speed === "slow" ? (
                    <WifiOff className="w-3 h-3" />
                  ) : (
                    <Wifi className="w-3 h-3" />
                  )}
                  {networkSpeed.speed.toUpperCase()} ({networkSpeed.estimatedMbps} Mbps)
                </Badge>
              )}
            </div>

            {/* Current Phase - Compact */}
            <div className="text-center space-y-2">
              <h2 className="text-xl md:text-2xl font-semibold">{currentPhase?.name || "Initializing..."}</h2>
              <div className="flex items-center justify-between text-sm text-blue-200">
                <span>{Math.round(progress)}%</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {timeRemaining}s remaining
                </span>
                <span>
                  {completedCount}/{phases.length} complete
                </span>
              </div>
            </div>

            {/* Progress Bar - Compact */}
            <div className="space-y-3">
              <Progress value={progress} className="h-3 bg-white/20" />

              {/* Current Phase Progress */}
              {currentPhase && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-blue-200">{currentPhase.name}</span>
                  <span className="font-mono">{Math.round(currentPhase.progress)}%</span>
                </div>
              )}
            </div>

            {/* Loading Progress - Compact List */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-center">Loading Progress</h3>
              <div className="space-y-1.5 max-h-48 overflow-y-auto">
                {phases.map((phase) => (
                  <div
                    key={phase.id}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all",
                      phase.status === "active"
                        ? "bg-blue-500/20 border border-blue-500/30"
                        : phase.status === "completed"
                          ? "bg-green-500/20 border border-green-500/30"
                          : "bg-white/5 border border-white/10",
                    )}
                  >
                    <div className="flex-shrink-0">
                      {phase.status === "completed" ? (
                        <CheckCircle className="w-4 h-4 text-green-400" />
                      ) : phase.status === "active" ? (
                        <CompactThreeDimensionalLoader size="xs" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                      )}
                    </div>

                    <span
                      className={cn(
                        "flex-1 truncate",
                        phase.status === "completed"
                          ? "text-green-300"
                          : phase.status === "active"
                            ? "text-blue-300"
                            : "text-gray-400",
                      )}
                    >
                      {phase.name}
                    </span>

                    {phase.status === "active" && (
                      <span className="text-xs font-mono text-blue-200">{Math.round(phase.progress)}%</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Message - Compact */}
            <p className="text-center text-sm text-blue-200/80">Preparing your decentralized payment experience...</p>
          </div>
        </div>
      )}
    </CompactLoadingManager>
  )
}
