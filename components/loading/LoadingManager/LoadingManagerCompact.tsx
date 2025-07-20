"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { NetworkSpeedDetector, type NetworkSpeedResult } from "@/utils/network-speed-detector"

export interface LoadingPhase {
  id: string
  name: string
  shortName: string
  duration: number
  progress: number
  status: "pending" | "active" | "completed"
}

interface CompactLoadingManagerProps {
  onComplete: () => void
  children: (data: {
    currentPhase: LoadingPhase | null
    progress: number
    networkSpeed: NetworkSpeedResult | null
    timeRemaining: number
    phases: LoadingPhase[]
    completedCount: number
  }) => React.ReactNode
}

export default function CompactLoadingManager({ onComplete, children }: CompactLoadingManagerProps) {
  const [networkSpeed, setNetworkSpeed] = useState<NetworkSpeedResult | null>(null)
  const [phases, setPhases] = useState<LoadingPhase[]>([])
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const [startTime] = useState(Date.now())
  const [timeRemaining, setTimeRemaining] = useState(30)

  const initializePhases = useCallback((speed: NetworkSpeedResult) => {
    const basePhases = [
      {
        id: "network",
        name: "Detecting Network Speed & Connection Quality",
        shortName: "Network Check",
        duration: 3000,
      },
      {
        id: "assets",
        name: "Loading Application Assets & Resources",
        shortName: "Loading Assets",
        duration: 5000,
      },
      {
        id: "components",
        name: "Initializing User Interface Components",
        shortName: "Init Components",
        duration: 4000,
      },
      {
        id: "security",
        name: "Setting up Security Layer & Encryption",
        shortName: "Security Setup",
        duration: 4000,
      },
      {
        id: "blockchain",
        name: "Connecting to Blockchain Network Infrastructure",
        shortName: "Blockchain Setup",
        duration: 6000,
      },
      {
        id: "data",
        name: "Fetching Application Data & Configuration",
        shortName: "Fetching Data",
        duration: 4000,
      },
      {
        id: "finalization",
        name: "Finalizing Application Setup & Optimization",
        shortName: "Final Setup",
        duration: 4000,
      },
    ]

    const speedMultiplier = speed.speed === "slow" ? 1.2 : speed.speed === "fast" ? 0.8 : 1

    return basePhases.map((phase) => ({
      ...phase,
      duration: Math.round(phase.duration * speedMultiplier),
      progress: 0,
      status: "pending" as const,
    }))
  }, [])

  useEffect(() => {
    const detectSpeed = async () => {
      try {
        const detector = NetworkSpeedDetector.getInstance()
        const speed = await detector.detectSpeed()
        setNetworkSpeed(speed)
        setPhases(initializePhases(speed))
      } catch (error) {
        const fallback: NetworkSpeedResult = {
          speed: "medium",
          estimatedMbps: 25,
          latency: 200,
          timestamp: Date.now(),
        }
        setNetworkSpeed(fallback)
        setPhases(initializePhases(fallback))
      }
    }
    detectSpeed()
  }, [initializePhases])

  useEffect(() => {
    if (phases.length === 0) return

    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0)

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const overallProgress = Math.min((elapsed / totalDuration) * 100, 100)
      setProgress(overallProgress)
      setTimeRemaining(Math.max(0, Math.ceil((totalDuration - elapsed) / 1000)))

      setPhases((currentPhases) => {
        const newPhases = [...currentPhases]
        let accumulatedTime = 0
        let newCurrentIndex = 0

        for (let i = 0; i < newPhases.length; i++) {
          const phaseStartTime = accumulatedTime
          const phaseEndTime = accumulatedTime + newPhases[i].duration

          if (elapsed >= phaseStartTime && elapsed < phaseEndTime) {
            newCurrentIndex = i
            newPhases[i].status = "active"
            newPhases[i].progress = Math.min(((elapsed - phaseStartTime) / newPhases[i].duration) * 100, 100)
          } else if (elapsed >= phaseEndTime) {
            newPhases[i].status = "completed"
            newPhases[i].progress = 100
          } else {
            newPhases[i].status = "pending"
            newPhases[i].progress = 0
          }

          accumulatedTime += newPhases[i].duration
        }

        setCurrentPhaseIndex(newCurrentIndex)
        return newPhases
      })

      if (overallProgress >= 100) {
        setTimeout(onComplete, 500)
      }
    }, 100)

    return () => clearInterval(interval)
  }, [phases.length, startTime, onComplete])

  const currentPhase = phases[currentPhaseIndex] || null
  const completedCount = phases.filter((p) => p.status === "completed").length

  return (
    <>
      {children({
        currentPhase,
        progress,
        networkSpeed,
        timeRemaining,
        phases,
        completedCount,
      })}
    </>
  )
}
