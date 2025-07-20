"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface ThreeDimensionalLoaderProps {
  size?: "sm" | "md" | "lg"
  color?: "primary" | "secondary" | "accent"
  className?: string
}

export default function ThreeDimensionalLoader({
  size = "md",
  color = "primary",
  className,
}: ThreeDimensionalLoaderProps) {
  const [rotationPhase, setRotationPhase] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotationPhase((prev) => (prev + 1) % 4)
    }, 800)

    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  }

  const colorClasses = {
    primary: "border-blue-500",
    secondary: "border-purple-500",
    accent: "border-cyan-500",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer rotating ring */}
      <div
        className={cn("absolute inset-0 rounded-full border-4 border-t-transparent animate-spin", colorClasses[color])}
        style={{
          animationDuration: "2s",
          transform: `rotateX(${rotationPhase * 90}deg)`,
        }}
      />

      {/* Middle pulsing ring */}
      <div
        className={cn("absolute inset-2 rounded-full border-2 border-opacity-60 animate-pulse", colorClasses[color])}
        style={{
          transform: `rotateY(${rotationPhase * 45}deg) rotateZ(${rotationPhase * 30}deg)`,
        }}
      />

      {/* Inner rotating cube */}
      <div
        className="absolute inset-4 animate-bounce"
        style={{
          transform: `rotateX(${rotationPhase * 60}deg) rotateY(${rotationPhase * 90}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className={cn("w-full h-full rounded border-2 opacity-80", colorClasses[color])} />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className={cn(
            "absolute w-1 h-1 rounded-full animate-ping",
            color === "primary" ? "bg-blue-400" : color === "secondary" ? "bg-purple-400" : "bg-cyan-400",
          )}
          style={{
            top: `${20 + i * 10}%`,
            left: `${30 + i * 8}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: "1.5s",
          }}
        />
      ))}
    </div>
  )
}
