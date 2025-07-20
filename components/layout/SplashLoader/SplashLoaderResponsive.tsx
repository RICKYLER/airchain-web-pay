"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import ResponsiveThreeDimensionalLoader from "@/components/loading/responsive-three-dimensional-loader"
import ResponsiveLoadingManager from "@/components/loading/responsive-loading-manager"
import { Wifi, WifiOff, Zap, Clock, CheckCircle, Smartphone, Monitor } from "lucide-react"

interface ResponsiveSplashLoadingProps {
  onLoadingComplete?: () => void
}

export default function ResponsiveSplashLoading({ onLoadingComplete }: ResponsiveSplashLoadingProps) {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    setMounted(true)

    // Detect mobile device and zoom level
    const checkDeviceAndZoom = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const mobileKeywords = ["mobile", "android", "iphone", "ipad", "tablet"]
      const isMobileDevice = mobileKeywords.some((keyword) => userAgent.includes(keyword)) || window.innerWidth < 768
      setIsMobile(isMobileDevice)

      // Detect zoom level for better scaling
      const zoom = window.devicePixelRatio || 1
      setZoomLevel(zoom)
    }

    checkDeviceAndZoom()
    window.addEventListener("resize", checkDeviceAndZoom)

    const timer = setTimeout(() => setShowDetails(true), isMobile ? 1500 : 2000)

    return () => {
      clearTimeout(timer)
      window.removeEventListener("resize", checkDeviceAndZoom)
    }
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

  // Zoom-aware sizing with viewport units and constraints
  const getZoomAwareSize = (baseSize: string) => {
    const sizeMap: Record<string, string> = {
      "text-xs": "text-[clamp(0.75rem,2vw,0.875rem)]",
      "text-sm": "text-[clamp(0.875rem,2.5vw,1rem)]",
      "text-base": "text-[clamp(1rem,3vw,1.125rem)]",
      "text-lg": "text-[clamp(1.125rem,3.5vw,1.25rem)]",
      "text-xl": "text-[clamp(1.25rem,4vw,1.5rem)]",
      "text-2xl": "text-[clamp(1.5rem,5vw,2rem)]",
      "text-3xl": "text-[clamp(1.875rem,6vw,2.5rem)]",
      "text-4xl": "text-[clamp(2.25rem,8vw,3rem)]",
      "text-5xl": "text-[clamp(3rem,10vw,4rem)]",
      "text-6xl": "text-[clamp(3.75rem,12vw,5rem)]",
      "text-7xl": "text-[clamp(4.5rem,14vw,6rem)]",
      "text-8xl": "text-[clamp(6rem,16vw,8rem)]",
      "text-9xl": "text-[clamp(8rem,20vw,12rem)]",
    }
    return sizeMap[baseSize] || baseSize
  }

  return (
    <ResponsiveLoadingManager onLoadingComplete={handleLoadingComplete} isMobile={isMobile}>
      {({ currentPhase, overallProgress, networkSpeed, timeRemaining, phases }) => (
        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col items-center justify-center transition-all duration-1000",
            "min-h-screen w-full px-[4vw] py-[2vh]",
            isDarkMode
              ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
              : "bg-gradient-to-br from-blue-50 via-white to-blue-50",
          )}
        >
          {/* Zoom-aware Background Animation */}
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={cn(
                "absolute -top-1/2 -left-1/2 w-[300%] h-[300%] rounded-full opacity-10 animate-spin",
                isDarkMode ? "bg-blue-500" : "bg-blue-300",
              )}
              style={{
                animationDuration: isMobile ? "30s" : "25s",
                willChange: "transform",
              }}
            />
            <div
              className={cn(
                "absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] rounded-full opacity-5 animate-spin",
                isDarkMode ? "bg-purple-500" : "bg-purple-300",
              )}
              style={{
                animationDuration: isMobile ? "25s" : "20s",
                animationDirection: "reverse",
                willChange: "transform",
              }}
            />
          </div>

          {/* Main Content Container - Zoom responsive */}
          <div className="relative z-10 flex flex-col items-center w-full max-w-[90vw] mx-auto space-y-[4vh]">
            {/* Logo and 3D Loader - Zoom aware */}
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/airchainpay-logo.png"
                alt="AirChainPay Logo"
                width={isMobile ? 120 : 240}
                height={isMobile ? 120 : 240}
                priority
                className="relative z-10 animate-pulse"
                style={{
                  width: `clamp(80px, ${isMobile ? "20vw" : "15vw"}, 320px)`,
                  height: `clamp(80px, ${isMobile ? "20vw" : "15vw"}, 320px)`,
                }}
              />
              <div className="absolute flex items-center justify-center inset-[-20%]">
                <ResponsiveThreeDimensionalLoader size={isMobile ? "xl" : "3xl"} color="primary" isMobile={isMobile} />
              </div>
            </div>

            {/* Title - Zoom responsive */}
            <div className="text-center space-y-[2vh]">
              <h1
                className={cn(
                  "font-bold tracking-tight leading-none",
                  getZoomAwareSize(isMobile ? "text-6xl" : "text-9xl"),
                  isDarkMode ? "text-white" : "text-gray-900",
                )}
              >
                AirChainPay
              </h1>
              <p
                className={cn(
                  "font-medium",
                  getZoomAwareSize(isMobile ? "text-2xl" : "text-5xl"),
                  isDarkMode ? "text-blue-300" : "text-blue-600",
                )}
              >
                Revolutionizing Payments
              </p>
            </div>

            {/* Device Type Indicator - Zoom aware */}
            <div className="flex items-center space-x-[2vw]">
              {isMobile ? (
                <Smartphone className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-blue-500" />
              ) : (
                <Monitor className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-blue-500" />
              )}
              <span
                className={cn(
                  "font-medium",
                  getZoomAwareSize(isMobile ? "text-base" : "text-2xl"),
                  isDarkMode ? "text-gray-400" : "text-gray-600",
                )}
              >
                {isMobile ? "Mobile Optimized" : "Desktop Experience"}
              </span>
            </div>

            {/* Network Speed Indicator - Zoom aware */}
            {networkSpeed && (
              <div className="flex items-center space-x-[2vw]">
                {networkSpeed.speed === "fast" ? (
                  <Zap className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-green-500" />
                ) : networkSpeed.speed === "slow" ? (
                  <WifiOff className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-red-500" />
                ) : (
                  <Wifi className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-yellow-500" />
                )}
                <Badge
                  variant={
                    networkSpeed.speed === "fast"
                      ? "default"
                      : networkSpeed.speed === "slow"
                        ? "destructive"
                        : "secondary"
                  }
                  className={cn(getZoomAwareSize("text-base"), "px-[2vw] py-[1vh]")}
                >
                  {networkSpeed.speed.toUpperCase()} ({networkSpeed.estimatedMbps} Mbps)
                </Badge>
              </div>
            )}

            {/* Main Progress Bar - Zoom responsive */}
            <div className="w-full space-y-[2vh] max-w-[80vw]">
              <div className="flex justify-between items-center">
                <span
                  className={cn(
                    "font-medium truncate pr-[2vw]",
                    getZoomAwareSize(isMobile ? "text-sm" : "text-2xl"),
                    isDarkMode ? "text-gray-300" : "text-gray-600",
                  )}
                >
                  {isMobile && currentPhase?.mobileShortName
                    ? currentPhase.mobileShortName
                    : currentPhase?.name || "Initializing..."}
                </span>
                <span
                  className={cn(
                    "font-mono flex-shrink-0",
                    getZoomAwareSize(isMobile ? "text-sm" : "text-xl"),
                    isDarkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  {Math.round(overallProgress)}%
                </span>
              </div>
              <Progress
                value={overallProgress}
                className="w-full rounded-full"
                style={{
                  height: `clamp(8px, ${isMobile ? "1vh" : "2vh"}, 32px)`,
                }}
              />
              <div className="flex justify-between items-center">
                <span
                  className={cn(
                    getZoomAwareSize(isMobile ? "text-xs" : "text-lg"),
                    isDarkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  <Clock className="w-[clamp(12px,3vw,24px)] h-[clamp(12px,3vw,24px)] inline mr-[1vw]" />
                  {Math.ceil(timeRemaining / 1000)}s remaining
                </span>
                <span
                  className={cn(
                    getZoomAwareSize(isMobile ? "text-xs" : "text-lg"),
                    isDarkMode ? "text-gray-400" : "text-gray-500",
                  )}
                >
                  {phases.filter((p) => p.status === "completed").length}/{phases.length} complete
                </span>
              </div>
            </div>

            {/* Detailed Phase Progress - Zoom responsive */}
            {showDetails && (
              <div className="w-full space-y-[2vh] animate-fade-in max-w-[80vw]">
                <h3
                  className={cn(
                    "font-semibold mb-[2vh]",
                    getZoomAwareSize(isMobile ? "text-sm" : "text-2xl"),
                    isDarkMode ? "text-gray-300" : "text-gray-700",
                  )}
                >
                  Loading Progress
                </h3>
                <div
                  className="space-y-[1vh] overflow-y-auto"
                  style={{
                    maxHeight: `clamp(200px, ${isMobile ? "30vh" : "40vh"}, 600px)`,
                  }}
                >
                  {phases.map((phase) => (
                    <div
                      key={phase.id}
                      className={cn(
                        "flex items-center justify-between rounded-lg transition-all",
                        "p-[2vw]",
                        getZoomAwareSize(isMobile ? "text-xs" : "text-lg"),
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
                      <div className="flex items-center space-x-[2vw] min-w-0 flex-1">
                        {phase.status === "completed" ? (
                          <CheckCircle className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] text-green-500 flex-shrink-0" />
                        ) : phase.status === "active" ? (
                          <div className="w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] flex-shrink-0">
                            <ResponsiveThreeDimensionalLoader size="xs" color="primary" isMobile={isMobile} />
                          </div>
                        ) : (
                          <div
                            className={cn(
                              "w-[clamp(16px,4vw,32px)] h-[clamp(16px,4vw,32px)] rounded-full border-2 flex-shrink-0",
                              isDarkMode ? "border-gray-600" : "border-gray-300",
                            )}
                          />
                        )}
                        <span
                          className={cn(
                            "font-medium truncate",
                            phase.status === "completed"
                              ? "text-green-600"
                              : phase.status === "active"
                                ? "text-blue-600"
                                : isDarkMode
                                  ? "text-gray-400"
                                  : "text-gray-500",
                          )}
                        >
                          {isMobile ? phase.mobileShortName : phase.name}
                        </span>
                      </div>
                      {phase.status === "active" && (
                        <span
                          className={cn(
                            "font-mono flex-shrink-0 ml-[2vw]",
                            getZoomAwareSize(isMobile ? "text-xs" : "text-base"),
                            isDarkMode ? "text-gray-400" : "text-gray-500",
                          )}
                        >
                          {Math.round(phase.progress)}%
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Loading Message - Zoom responsive */}
            <p
              className={cn(
                "text-center leading-relaxed max-w-[70vw]",
                getZoomAwareSize(isMobile ? "text-sm" : "text-xl"),
                isDarkMode ? "text-gray-300" : "text-gray-600",
              )}
            >
              Preparing your decentralized payment experience...
              <br />
              <span className={cn("opacity-75", getZoomAwareSize(isMobile ? "text-xs" : "text-base"))}>
                Optimized for your {networkSpeed?.speed || "current"} connection
              </span>
            </p>
          </div>
        </div>
      )}
    </ResponsiveLoadingManager>
  )
}
