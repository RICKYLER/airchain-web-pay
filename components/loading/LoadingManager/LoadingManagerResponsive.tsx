"use client"

import type React from "react"
import { useEffect, useState, useCallback } from "react"
import { NetworkSpeedDetector, type NetworkSpeedResult } from "@/utils/network-speed-detector"

export interface LoadingPhase {
  id: string
  name: string
  mobileShortName: string
  duration: number
  progress: number
  status: "pending" | "active" | "completed"
}

interface ResponsiveLoadingManagerProps {
  onLoadingComplete: () => void
  minimumDuration?: number
  isMobile?: boolean
  children: (data: {
    currentPhase: LoadingPhase | null
    overallProgress: number
    networkSpeed: NetworkSpeedResult | null
    timeRemaining: number
    phases: LoadingPhase[]
    isMobile: boolean
  }) => React.ReactNode
}

export default function ResponsiveLoadingManager({
  onLoadingComplete,
  minimumDuration = 30000,
  isMobile = false,
  children,
}: ResponsiveLoadingManagerProps) {
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeedResult | null>(null)
  const [phases, setPhases] = useState<LoadingPhase[]>([])
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [startTime] = useState(Date.now())
  const [timeRemaining, setTimeRemaining] = useState(minimumDuration)

  // Initialize phases based on network speed and device type
  const initializePhases = useCallback(
    (speed: NetworkSpeedResult) => {
      const basePhases = [
        {
          id: "network",
          name: "Detecting Network Speed & Connection Quality",
          mobileShortName: "Network Check",
          duration: isMobile ? 2500 : 3500,
        },
        {
          id: "assets",
          name: "Loading Application Assets & Resources",
          mobileShortName: "Loading Assets",
          duration: isMobile ? 6500 : 9000,
        },
        {
          id: "components",
          name: "Initializing User Interface Components",
          mobileShortName: "Init Components",
          duration: isMobile ? 4500 : 6500,
        },
        {
          id: "authentication",
          name: "Setting up Security Layer & Encryption",
          mobileShortName: "Security Setup",
          duration: isMobile ? 3500 : 4500,
        },
        {
          id: "blockchain",
          name: "Connecting to Blockchain Network Infrastructure",
          mobileShortName: "Blockchain Setup",
          duration: isMobile ? 5500 : 7000,
        },
        {
          id: "data",
          name: "Fetching Application Data & Configuration",
          mobileShortName: "Fetching Data",
          duration: isMobile ? 4000 : 5500,
        },
        {
          id: "finalization",
          name: "Finalizing Application Setup & Optimization",
          mobileShortName: "Final Setup",
          duration: isMobile ? 3500 : 4000,
        },
      ]

      // Adjust durations based on network speed
      const speedMultiplier = speed.speed === "slow" ? 1.4 : speed.speed === "fast" ? 0.7 : 1
      const deviceMultiplier = isMobile ? 0.8 : 1

      const adjustedPhases = basePhases.map((phase) => ({
        ...phase,
        duration: Math.round(phase.duration * speedMultiplier * deviceMultiplier),
        progress: 0,
        status: "pending" as const,
      }))

      // Ensure total duration meets minimum requirement
      const totalDuration = adjustedPhases.reduce((sum, phase) => sum + phase.duration, 0)
      if (totalDuration < minimumDuration) {
        const extraTime = minimumDuration - totalDuration
        const timePerPhase = Math.floor(extraTime / adjustedPhases.length)
        adjustedPhases.forEach((phase, index) => {
          phase.duration += timePerPhase
          if (index === adjustedPhases.length - 1) {
            phase.duration += extraTime % adjustedPhases.length
          }
        })
      }

      return adjustedPhases
    },
    [minimumDuration, isMobile],
  )

  // Initialize network speed detection
  useEffect(() => {
    const detectSpeed = async () => {
      try {
        const detector = NetworkSpeedDetector.getInstance()
        const speed = await detector.detectSpeed()
        setNetworkSpeed(speed)

        const initializedPhases = initializePhases(speed)
        setPhases(initializedPhases)
      } catch (error) {
        console.warn("Failed to detect network speed:", error)
        // Fallback to medium speed
        const fallbackSpeed: NetworkSpeedResult = {
          speed: "medium",
          estimatedMbps: 25,
          latency: 200,
          timestamp: Date.now(),
        }
        setNetworkSpeed(fallbackSpeed)
        const initializedPhases = initializePhases(fallbackSpeed)
        setPhases(initializedPhases)
      }
    }

    detectSpeed()
  }, [initializePhases])

  // Progress simulation with performance optimization
  useEffect(() => {
    if (phases.length === 0) return

    const updateInterval = isMobile ? 180 : 120 // Optimized for different devices

    const interval = setInterval(() => {
      setPhases((currentPhases) => {
        const newPhases = [...currentPhases]
        const currentPhase = newPhases[currentPhaseIndex]

        if (currentPhase && currentPhase.status !== "completed") {
          // Update current phase
          if (currentPhase.status === "pending") {
            currentPhase.status = "active"
          }

          // More realistic progress increments
          const baseIncrement = isMobile ? 1.8 : 2.2
          const randomFactor = Math.random() * 1.2
          const progressIncrement = baseIncrement + randomFactor

          currentPhase.progress = Math.min(currentPhase.progress + progressIncrement, 100)

          if (currentPhase.progress >= 100) {
            currentPhase.status = "completed"
            currentPhase.progress = 100
          }
        }

        return newPhases
      })

      // Update overall progress and time remaining
      const elapsed = Date.now() - startTime
      const remaining = Math.max(0, minimumDuration - elapsed)
      setTimeRemaining(remaining)
      setOverallProgress(Math.min((elapsed / minimumDuration) * 100, 100))

      // Move to next phase if current is completed
      setCurrentPhaseIndex((prevIndex) => {
        const currentPhase = phases[prevIndex]
        if (currentPhase?.status === "completed" && prevIndex < phases.length - 1) {
          return prevIndex + 1
        }
        return prevIndex
      })
    }, updateInterval)

    return () => clearInterval(interval)
  }, [phases, currentPhaseIndex, startTime, minimumDuration, isMobile])

  // Complete loading when time is up
  useEffect(() => {
    if (timeRemaining <= 0) {
      const timer = setTimeout(() => {
        onLoadingComplete()
      }, 1000) // Longer delay for smoother transition
      return () => clearTimeout(timer)
    }
  }, [timeRemaining, onLoadingComplete])

  const currentPhase = phases[currentPhaseIndex] || null

  return (
    <>
      {children({
        currentPhase,
        overallProgress,
        networkSpeed,
        timeRemaining,
        phases,
        isMobile,
      })}
    </>
  )
}
