"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface ProfessionalThreeDimensionalLoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "primary" | "secondary" | "accent"
  speed?: "slow" | "normal" | "fast"
  className?: string
}

export default function ProfessionalThreeDimensionalLoader({
  size = "md",
  variant = "primary",
  speed = "normal",
  className,
}: ProfessionalThreeDimensionalLoaderProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  const sizeMap = {
    sm: 24,
    md: 48,
    lg: 72,
    xl: 96,
  }

  const speedMap = {
    slow: 0.005,
    normal: 0.01,
    fast: 0.02,
  }

  const colorMap = {
    primary: {
      ring1: "rgba(59, 130, 246, 0.8)",
      ring2: "rgba(147, 51, 234, 0.6)",
      ring3: "rgba(6, 182, 212, 0.4)",
      glow: "rgba(59, 130, 246, 0.3)",
    },
    secondary: {
      ring1: "rgba(34, 197, 94, 0.8)",
      ring2: "rgba(168, 85, 247, 0.6)",
      ring3: "rgba(251, 146, 60, 0.4)",
      glow: "rgba(34, 197, 94, 0.3)",
    },
    accent: {
      ring1: "rgba(236, 72, 153, 0.8)",
      ring2: "rgba(59, 130, 246, 0.6)",
      ring3: "rgba(16, 185, 129, 0.4)",
      glow: "rgba(236, 72, 153, 0.3)",
    },
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const canvasSize = sizeMap[size]
    canvas.width = canvasSize
    canvas.height = canvasSize

    const centerX = canvasSize / 2
    const centerY = canvasSize / 2
    const baseRadius = canvasSize * 0.15
    const colors = colorMap[variant]
    const rotationSpeed = speedMap[speed]

    let rotation = 0

    const animate = () => {
      ctx.clearRect(0, 0, canvasSize, canvasSize)

      // Create glow effect
      ctx.shadowColor = colors.glow
      ctx.shadowBlur = 20

      // Draw rotating rings
      const rings = [
        { radius: baseRadius * 2.5, width: 2, color: colors.ring1, offset: 0 },
        { radius: baseRadius * 2, width: 3, color: colors.ring2, offset: Math.PI / 3 },
        { radius: baseRadius * 1.5, width: 2, color: colors.ring3, offset: Math.PI / 2 },
      ]

      rings.forEach((ring, index) => {
        ctx.save()
        ctx.translate(centerX, centerY)
        ctx.rotate(rotation + ring.offset + index * 0.5)

        // Draw ring segments
        for (let i = 0; i < 8; i++) {
          const segmentAngle = (Math.PI * 2) / 8
          const startAngle = i * segmentAngle
          const endAngle = startAngle + segmentAngle * 0.7

          ctx.beginPath()
          ctx.arc(0, 0, ring.radius, startAngle, endAngle)
          ctx.strokeStyle = ring.color
          ctx.lineWidth = ring.width
          ctx.lineCap = "round"
          ctx.stroke()
        }

        ctx.restore()
      })

      // Draw center dot
      ctx.shadowBlur = 10
      ctx.beginPath()
      ctx.arc(centerX, centerY, baseRadius * 0.3, 0, Math.PI * 2)
      ctx.fillStyle = colors.ring1
      ctx.fill()

      rotation += rotationSpeed
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [size, variant, speed])

  return (
    <canvas
      ref={canvasRef}
      className={cn("animate-pulse", className)}
      style={{
        width: sizeMap[size],
        height: sizeMap[size],
      }}
    />
  )
}
