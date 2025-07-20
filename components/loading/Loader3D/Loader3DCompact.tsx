"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface CompactThreeDimensionalLoaderProps {
  size?: "xs" | "sm" | "md" | "lg"
  className?: string
}

export default function CompactThreeDimensionalLoader({ size = "sm", className }: CompactThreeDimensionalLoaderProps) {
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 2) % 360)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const borderWidth = {
    xs: "border-[1px]",
    sm: "border-[2px]",
    md: "border-[2px]",
    lg: "border-[3px]",
  }

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Outer ring */}
      <div
        className={cn(
          "absolute inset-0 rounded-full border-blue-500 border-t-transparent animate-spin",
          borderWidth[size],
        )}
        style={{
          animationDuration: "1s",
          transform: `rotate(${rotation}deg)`,
        }}
      />

      {/* Inner ring */}
      <div
        className={cn(
          "absolute inset-1 rounded-full border-purple-400 border-r-transparent animate-spin",
          size === "xs" ? "border-[1px]" : "border-[1px]",
        )}
        style={{
          animationDuration: "1.5s",
          animationDirection: "reverse",
        }}
      />

      {/* Center dot */}
      <div className="absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div
          className={cn(
            "bg-blue-500 rounded-full animate-pulse",
            size === "xs" ? "w-1 h-1" : size === "sm" ? "w-1.5 h-1.5" : size === "md" ? "w-2 h-2" : "w-3 h-3",
          )}
        />
      </div>
    </div>
  )
}
