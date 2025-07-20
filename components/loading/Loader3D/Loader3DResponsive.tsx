"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ResponsiveThreeDimensionalLoaderProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl"
  color?: "primary" | "secondary" | "accent"
  className?: string
  isMobile?: boolean
}

export default function ResponsiveThreeDimensionalLoader({
  size = "md",
  color = "primary",
  className,
  isMobile = false,
}: ResponsiveThreeDimensionalLoaderProps) {
  const [rotationPhase, setRotationPhase] = useState(0)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [zoomLevel, setZoomLevel] = useState(1)

  useEffect(() => {
    // Detect zoom level for better scaling
    const detectZoom = () => {
      const zoom = window.devicePixelRatio || 1
      setZoomLevel(zoom)
    }

    detectZoom()
    window.addEventListener("resize", detectZoom)

    // Adjust animation speed for mobile performance and zoom
    setAnimationSpeed(isMobile ? 0.7 : 1)

    const interval = setInterval(() => {
      setRotationPhase((prev) => (prev + 1) % 4)
    }, 800 / animationSpeed)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", detectZoom)
    }
  }, [isMobile, animationSpeed])

  // Zoom-aware size classes with viewport units for better scaling
  const sizeClasses = {
    xs: "w-[8vw] h-[8vw] min-w-[32px] min-h-[32px] max-w-[64px] max-h-[64px]",
    sm: "w-[12vw] h-[12vw] min-w-[48px] min-h-[48px] max-w-[96px] max-h-[96px]",
    md: "w-[16vw] h-[16vw] min-w-[64px] min-h-[64px] max-w-[128px] max-h-[128px]",
    lg: "w-[20vw] h-[20vw] min-w-[80px] min-h-[80px] max-w-[160px] max-h-[160px]",
    xl: "w-[24vw] h-[24vw] min-w-[96px] min-h-[96px] max-w-[192px] max-h-[192px]",
    "2xl": "w-[28vw] h-[28vw] min-w-[112px] min-h-[112px] max-w-[224px] max-h-[224px]",
    "3xl": "w-[32vw] h-[32vw] min-w-[128px] min-h-[128px] max-w-[256px] max-h-[256px]",
  }

  const colorClasses = {
    primary: "border-blue-500",
    secondary: "border-purple-500",
    accent: "border-cyan-500",
  }

  const particleColors = {
    primary: "bg-blue-400",
    secondary: "bg-purple-400",
    accent: "bg-cyan-400",
  }

  // Zoom-aware border widths
  const getBorderWidth = () => {
    const baseWidth = size === "3xl" ? 8 : size === "2xl" ? 6 : size === "xl" ? 4 : 3
    return `border-[${Math.max(2, Math.round(baseWidth / zoomLevel))}px]`
  }

  const particleCount = isMobile ? 4 : size === "3xl" ? 16 : size === "2xl" ? 12 : size === "xl" ? 8 : 6

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer rotating ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-t-transparent animate-spin",
          colorClasses[color],
          getBorderWidth(),
        )}
        style={{
          animationDuration: `${2 / animationSpeed}s`,
          transform: `rotateX(${rotationPhase * 90}deg)`,
          willChange: "transform",
        }}
      />

      {/* Middle pulsing ring */}
      <div
        className={cn(
          "absolute inset-[8%] rounded-full border-opacity-60 animate-pulse",
          colorClasses[color],
          `border-[${Math.max(1, Math.round(2 / zoomLevel))}px]`,
        )}
        style={{
          transform: `rotateY(${rotationPhase * 45}deg) rotateZ(${rotationPhase * 30}deg)`,
          animationDuration: `${1.5 / animationSpeed}s`,
          willChange: "transform",
        }}
      />

      {/* Inner rotating cube */}
      <div
        className="absolute inset-[16%] animate-bounce"
        style={{
          transform: `rotateX(${rotationPhase * 60}deg) rotateY(${rotationPhase * 90}deg)`,
          transformStyle: "preserve-3d",
          animationDuration: `${1 / animationSpeed}s`,
          willChange: "transform",
        }}
      >
        <div
          className={cn(
            "w-full h-full rounded opacity-80",
            colorClasses[color],
            `border-[${Math.max(1, Math.round(2 / zoomLevel))}px]`,
          )}
        />
      </div>

      {/* Floating particles - zoom aware */}
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute rounded-full animate-ping",
            particleColors[color],
            size === "3xl" ? "w-[3%] h-[3%]" : size === "2xl" ? "w-[4%] h-[4%]" : "w-[5%] h-[5%]",
          )}
          style={{
            top: `${15 + (i * 70) / particleCount}%`,
            left: `${20 + (i % 4) * 15}%`,
            animationDelay: `${i * 0.2}s`,
            animationDuration: `${1.5 / animationSpeed}s`,
            willChange: "transform",
          }}
        />
      ))}

      {/* 3D shadow effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-xl transform translate-y-[4%]"
        style={{ willChange: "transform" }}
      />
    </div>
  )
}
