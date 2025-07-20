"use client"

import type React from "react"

import { useEffect, useState, useCallback } from "react"

interface LoadingPhase {
  id: string
  name: string
  description: string
  category: string
  duration: number
  progress: number
  status: "pending" | "active" | "completed" | "error"
}

interface LoadingManagerProps {
  onComplete: () => void
  networkSpeed?: "slow" | "medium" | "fast"
  deviceType?: "desktop" | "mobile"
  children: (state: {
    currentPhase: LoadingPhase | null
    progress: number
    timeRemaining: number
    phases: LoadingPhase[]
    completedCount: number
    totalPhases: number
    estimatedTotalTime: number
    currentCategory: string
  }) => React.ReactNode
}

export default function ProfessionalLoadingManager({
  onComplete,
  networkSpeed = "medium",
  deviceType = "desktop",
  children,
}: LoadingManagerProps) {
  const [phases, setPhases] = useState<LoadingPhase[]>([])
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0)
  const [overallProgress, setOverallProgress] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(0)
  const [startTime] = useState(Date.now())

  // Initialize phases based on network speed and device type
  const initializePhases = useCallback(() => {
    const speedMultiplier = {
      fast: 0.7,
      medium: 1.0,
      slow: 1.5,
    }[networkSpeed]

    const deviceMultiplier = deviceType === "mobile" ? 1.2 : 1.0

    const basePhases: Omit<LoadingPhase, "progress" | "status">[] = [
      {
        id: "network",
        name: "Detecting Network Speed & Connection Quality",
        description: "Analyzing your connection for optimal performance",
        category: "network",
        duration: 1000 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "assets",
        name: "Loading Application Assets & Resources",
        description: "Downloading essential files and dependencies",
        category: "assets",
        duration: 1500 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "ui",
        name: "Initializing User Interface Components",
        description: "Setting up the user interface framework",
        category: "ui",
        duration: 1200 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "security",
        name: "Setting up Security Layer & Encryption",
        description: "Establishing secure communication protocols",
        category: "security",
        duration: 1800 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "blockchain",
        name: "Connecting to Blockchain Network",
        description: "Establishing connection to decentralized network",
        category: "blockchain",
        duration: 2000 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "data",
        name: "Synchronizing Data & Preferences",
        description: "Loading your personalized settings and data",
        category: "data",
        duration: 1000 * speedMultiplier * deviceMultiplier,
      },
      {
        id: "optimization",
        name: "Optimizing Performance & Finalizing Setup",
        description: "Fine-tuning for the best user experience",
        category: "optimization",
        duration: 800 * speedMultiplier * deviceMultiplier,
      },
    ]

    return basePhases.map((phase) => ({
      ...phase,
      progress: 0,
      status: "pending" as const,
    }))
  }, [networkSpeed, deviceType])

  useEffect(() => {
    console.log("ProfessionalLoadingManager initializing phases")
    const initialPhases = initializePhases()
    console.log("Initial phases:", initialPhases)
    setPhases(initialPhases)
  }, [initializePhases])

  useEffect(() => {
    if (phases.length === 0) return

    const totalDuration = phases.reduce((sum, phase) => sum + phase.duration, 0)
    let elapsedTime = 0

    const interval = setInterval(() => {
      const now = Date.now()
      elapsedTime = now - startTime

      // Calculate overall progress
      const progress = Math.min((elapsedTime / totalDuration) * 100, 100)
      setOverallProgress(progress)

      // Calculate time remaining
      const remaining = Math.max(0, Math.ceil((totalDuration - elapsedTime) / 1000))
      setTimeRemaining(remaining)

      // Update phases
      setPhases((prevPhases) => {
        const updatedPhases = [...prevPhases]
        let cumulativeTime = 0

        for (let i = 0; i < updatedPhases.length; i++) {
          const phase = updatedPhases[i]
          const phaseStartTime = cumulativeTime
          const phaseEndTime = cumulativeTime + phase.duration

          if (elapsedTime < phaseStartTime) {
            // Phase hasn't started yet
            updatedPhases[i] = { ...phase, status: "pending", progress: 0 }
          } else if (elapsedTime >= phaseStartTime && elapsedTime < phaseEndTime) {
            // Phase is active
            const phaseProgress = ((elapsedTime - phaseStartTime) / phase.duration) * 100
            updatedPhases[i] = { ...phase, status: "active", progress: phaseProgress }
            setCurrentPhaseIndex(i)
          } else {
            // Phase is completed
            updatedPhases[i] = { ...phase, status: "completed", progress: 100 }
          }

          cumulativeTime += phase.duration
        }

        return updatedPhases
      })

      // Check if all phases are completed
      if (progress >= 100) {
        console.log("All phases completed, calling onComplete")
        clearInterval(interval)
        setTimeout(() => {
          console.log("Executing onComplete callback")
          onComplete()
        }, 500)
      }
    }, 50)

    return () => clearInterval(interval)
  }, [phases.length, startTime, onComplete])

  const currentPhase = phases[currentPhaseIndex] || null
  const completedCount = phases.filter((phase) => phase.status === "completed").length
  const totalPhases = phases.length
  const estimatedTotalTime = phases.reduce((sum, phase) => sum + phase.duration, 0)
  const currentCategory = currentPhase?.category || "system"

  return (
    <>
      {children({
        currentPhase,
        progress: overallProgress,
        timeRemaining,
        phases,
        completedCount,
        totalPhases,
        estimatedTotalTime,
        currentCategory,
      })}
    </>
  )
}
