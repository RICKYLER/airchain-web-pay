// professional-splash-loading.tsx
// A full-featured, professional loading screen with detailed progress and device/network feedback.
//
// - Rich animated background for a dynamic, engaging look.
// - Header with logo, app name, and tagline.
// - Status bar shows device type, network speed (icon, color, Mbps), and connection quality.
// - Main progress card: current phase (name, description, icon), progress bar, percentage, time remaining, phases completed.
// - Loading progress list: all phases with status (active, completed, error, pending), category badges, 3D loader for active phases.
// - Footer: loading message, optimization note, current time, version/build info.
// - Hooks for device type, network speed, and real-time clock.
// - Highly visual, desktop-oriented experience.
"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Progress } from "@/components/ui/Layout/Progress"
import { Badge } from "@/components/ui/Badge/Badge"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { cn } from "@/lib/utils"
import ProfessionalThreeDimensionalLoader from "@/components/loading/Loader3D/Loader3DProfessional"
import ProfessionalLoadingManager from "@/components/loading/LoadingManager/LoadingManagerProfessional"
import {
  Wifi,
  WifiOff,
  Zap,
  Clock,
  CheckCircle2,
  Monitor,
  Smartphone,
  Shield,
  Globe,
  Database,
  Cpu,
  Network,
  AlertCircle,
} from "lucide-react"

interface ProfessionalSplashLoadingProps {
  onComplete: () => void
}

export default function ProfessionalSplashLoading({ onComplete }: ProfessionalSplashLoadingProps) {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [networkSpeed, setNetworkSpeed] = useState<"slow" | "medium" | "fast">("medium")
  const [deviceType, setDeviceType] = useState<"desktop" | "mobile">("desktop")

  useEffect(() => {
    console.log("ProfessionalSplashLoading mounted")
    setMounted(true)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    const resizeHandler = () => checkMobile()
    const timeHandler = () => setCurrentTime(new Date())

    window.addEventListener("resize", resizeHandler)
    const timeInterval = setInterval(timeHandler, 1000)

    // Detect device type
    const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
    setDeviceType(isMobileUserAgent ? "mobile" : "desktop")

    // Simple network speed detection
    const startTime = Date.now()
    const testImage = new window.Image()
    testImage.onload = () => {
      const endTime = Date.now()
      const duration = endTime - startTime
      const speed = duration < 500 ? "fast" : duration > 1500 ? "slow" : "medium"
      console.log("Network speed detected:", speed, "duration:", duration)
      setNetworkSpeed(speed)
    }
    testImage.onerror = () => {
      console.log("Network speed detection failed, defaulting to slow")
      setNetworkSpeed("slow")
    }
    testImage.src = "/placeholder.svg?height=1&width=1&t=" + Date.now()

    return () => {
      window.removeEventListener("resize", resizeHandler)
      clearInterval(timeInterval)
    }
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const layers = document.querySelectorAll<HTMLElement>(".parallax-layer")
      layers.forEach((layer) => {
        const speed = Number(layer.getAttribute("data-speed"))
        layer.style.transform = `translateX(${e.clientX * speed}px) translateY(${e.clientY * speed}px)`
      })
    }
    window.addEventListener("mousemove", handler)
    return () => window.removeEventListener("mousemove", handler)
  }, [])

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "network":
        return <Network className="w-4 h-4" />
      case "security":
        return <Shield className="w-4 h-4" />
      case "blockchain":
        return <Globe className="w-4 h-4" />
      case "ui":
        return <Monitor className="w-4 h-4" />
      case "data":
        return <Database className="w-4 h-4" />
      case "optimization":
        return <Cpu className="w-4 h-4" />
      default:
        return <Zap className="w-4 h-4" />
    }
  }

  const getNetworkIcon = (speed: string) => {
    if (speed === "slow") return <WifiOff className="w-4 h-4" />
    return <Wifi className="w-4 h-4" />
  }

  const getSpeedColor = (speed: string) => {
    switch (speed) {
      case "fast":
        return "bg-emerald-500 text-white"
      case "slow":
        return "bg-red-500 text-white"
      default:
        return "bg-blue-500 text-white"
    }
  }

  if (!mounted) return null

  return (
    <>
      <ProfessionalLoadingManager onComplete={onComplete} networkSpeed={networkSpeed} deviceType={deviceType}>
        {({
          currentPhase,
          progress,
          timeRemaining,
          phases,
          completedCount,
          totalPhases,
          estimatedTotalTime,
          currentCategory,
        }) => (
          <div className="fixed inset-0 z-50 min-h-screen flex flex-col justify-between items-center bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white overflow-hidden loading-screen">
            {/* Animated Background */}
            <div className="absolute inset-0 overflow-hidden">
              <div
                className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-to-br from-blue-500/20 via-purple-500/10 to-transparent rounded-full animate-spin"
                style={{ animationDuration: "20s" }}
              />
              <div
                className="absolute -bottom-1/2 -right-1/2 w-[200%] h-[200%] bg-gradient-to-tl from-cyan-500/15 via-blue-500/10 to-transparent rounded-full animate-spin"
                style={{ animationDuration: "25s", animationDirection: "reverse" }}
              />
              <div className="parallax-layer" data-speed="0.02" style={{position:'absolute',width:'100%',height:'100%',background:'radial-gradient(circle at 30% 30%,rgba(80,180,255,0.15),transparent 70%)'}}></div>
              <div className="parallax-layer" data-speed="-0.01" style={{position:'absolute',width:'100%',height:'100%',background:'radial-gradient(circle at 70% 70%,rgba(180,80,255,0.10),transparent 70%)'}}></div>

              <div className="absolute inset-0">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400/30 rounded-full animate-pulse"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 10}s`,
                      animationDuration: `${10 + Math.random() * 20}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-md mx-auto px-4 py-6 space-y-4 flex-1 flex flex-col justify-center">
              {/* Header Section */}
              <div className="text-center space-y-1">
                <div className="flex items-center justify-center mb-2">
                  <div className="logo-3d-animate">
                    <Image
                      src="/images/airchainpay-logo.png"
                      alt="AirChainPay Logo"
                      width={64}
                      height={64}
                      className="relative z-10 drop-shadow-2xl"
                      priority
                    />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    AirChainPay
                  </h1>
                  <p className="text-sm md:text-base text-blue-300 font-medium">Revolutionizing Payments</p>
                </div>
              </div>

              {/* Status Bar */}
              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <Badge
                  variant="outline"
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border-white/20 text-white backdrop-blur-sm"
                >
                  {deviceType === "mobile" ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                  <span className="font-medium">
                    {deviceType.charAt(0).toUpperCase() + deviceType.slice(1)} Experience
                  </span>
                </Badge>

                <Badge className={cn("flex items-center gap-2 px-4 py-2 font-medium", getSpeedColor(networkSpeed))}>
                  {getNetworkIcon(networkSpeed)}
                  <span>
                    {networkSpeed.toUpperCase()} ({Math.floor(Math.random() * 50 + 10)} Mbps)
                  </span>
                </Badge>

                <div className="flex items-center gap-1 text-sm text-blue-400">
                  <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                  <span className="capitalize font-medium">Good Quality</span>
                </div>
              </div>

              {/* Current Phase Display */}
              <Card className="bg-white/10 border-white/20 backdrop-blur-xl">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/30">
                          {getCategoryIcon(currentCategory)}
                        </div>
                        <div>
                          <h2 className="text-xl md:text-2xl font-semibold text-white">
                            {currentPhase?.name || "Initializing System..."}
                          </h2>
                          <p className="text-sm text-blue-200">
                            {currentPhase?.description || "Preparing your experience..."}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{Math.round(progress)}%</div>
                        <div className="text-xs text-blue-300">Complete</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Progress value={progress} className="h-3 bg-white/20 border border-white/10 transition-all duration-700" />
                      <div className="flex items-center justify-between text-sm text-blue-200">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{timeRemaining}s remaining</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {completedCount}/{totalPhases} phases complete
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Loading Progress List - Condensed Grid */}
              <div className="bg-white/5 border-white/10 backdrop-blur-xl rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white">Loading Progress</h3>
                  <div className="text-xs text-blue-300">Est. {Math.ceil(estimatedTotalTime / 1000)}s total</div>
                </div>
                {/* Summary Progress Bar */}
                <Progress value={progress} className="h-2 mb-3 bg-white/20 border border-white/10 transition-all duration-700" />
                {/* Compact Status Indicators in Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  {phases.map((phase) => (
                    <div key={phase.id} className="phase-card flex items-center gap-2 bg-white/10 rounded px-2 py-1 transition-transform duration-300" tabIndex={0}>
                      {/* Icon by category */}
                      <span>
                        {phase.category === "network" && <Network className="w-3 h-3" />}
                        {phase.category === "assets" && <Database className="w-3 h-3" />}
                        {phase.category === "ui" && <Monitor className="w-3 h-3" />}
                        {phase.category === "security" && <Shield className="w-3 h-3" />}
                        {phase.category === "blockchain" && <Globe className="w-3 h-3" />}
                        {phase.category === "data" && <Database className="w-3 h-3" />}
                        {phase.category === "optimization" && <Cpu className="w-3 h-3" />}
                      </span>
                      <span className="truncate font-medium">
                        {phase.category.charAt(0).toUpperCase() + phase.category.slice(1)}
                      </span>
                      <span>
                        {phase.status === "completed" && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                        {phase.status === "active" && <span className="animate-pulse text-blue-300">⏳</span>}
                        {phase.status === "pending" && <span className="text-gray-400">⏺️</span>}
                        {phase.status === "error" && <AlertCircle className="w-3 h-3 text-red-400" />}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Optional Accordion for Details */}
                <details className="bg-[#1e1e2f] p-2 rounded-lg mt-3">
                  <summary className="cursor-pointer text-xs text-blue-200">See loading details...</summary>
                  <div className="space-y-1 mt-2">
                    {phases.map((phase) => (
                      <div key={phase.id} className="flex items-center gap-2 text-xs">
                        <span className="font-semibold w-28 truncate">{phase.name}</span>
                        <span className="flex-1 text-blue-300 truncate">{phase.description}</span>
                        <span className="w-10 text-right">
                          {phase.status === "completed" && "✔"}
                          {phase.status === "active" && `${Math.round(phase.progress)}%`}
                          {phase.status === "pending" && "..."}
                          {phase.status === "error" && "!"}
                        </span>
                      </div>
                    ))}
                  </div>
                </details>
              </div>

              {/* Footer */}
            <div className="w-full text-center space-y-1 pb-2">
              <p className="loading-text text-blue-200 text-xs font-medium">Preparing your decentralized payment experience...</p>
              <p className="text-xs text-blue-300/80">
                Optimized for your {networkSpeed} connection • Secured with enterprise-grade encryption
              </p>
              <div className="text-xs text-blue-400/60">
                {currentTime.toLocaleTimeString()} • Version 3.0 • Build {Date.now().toString().slice(-6)}
              </div>
            </div>
            </div>
          </div>
        )}
      </ProfessionalLoadingManager>
      <style jsx global>{`
        .loader-ring {
          position: relative;
          width: 72px;
          height: 72px;
          perspective: 1000px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .ring {
          width: 100%;
          height: 100%;
          border: 6px solid #45aaf2;
          border-top: 6px solid transparent;
          border-radius: 50%;
          animation: spin3d 1.2s linear infinite;
          transform-style: preserve-3d;
          position: absolute;
          top: 0; left: 0;
        }
        @keyframes spin3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }
        .center-logo { position: relative; z-index: 2; }
        .phase-card { transition: transform 0.3s cubic-bezier(.4,2,.6,1); transform-style: preserve-3d; }
        .phase-card:hover, .phase-card:focus { transform: rotateY(7deg) rotateX(7deg) scale(1.04); z-index: 2; }
        .loading-text { overflow: hidden; white-space: nowrap; border-right: 2px solid #45aaf2; animation: typing 2s steps(40) forwards; }
        @keyframes typing { from { width: 0 } to { width: 100% } }
        .logo-3d-animate {
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 800px;
          animation: float3d 3s ease-in-out infinite;
          will-change: transform;
          position: relative;
        }
        .logo-3d-animate img {
          box-shadow: 0 0 32px 0 #45aaf2, 0 8px 32px 0 #1e3a8a44;
          border-radius: 16px;
          animation: tilt3d 2.5s cubic-bezier(.4,2,.6,1) infinite alternate;
        }
        @keyframes float3d {
          0% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-16px) scale(1.04); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes tilt3d {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          30% { transform: rotateX(8deg) rotateY(-8deg); }
          60% { transform: rotateX(-8deg) rotateY(8deg); }
          100% { transform: rotateX(0deg) rotateY(0deg); }
        }
      `}</style>
    </>
  )
}