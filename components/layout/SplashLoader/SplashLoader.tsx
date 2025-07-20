"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

export default function SplashLoading() {
  const [progress, setProgress] = useState(0)
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval)
          return 100
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const isDarkMode = theme === "dark"

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center transition-colors duration-500",
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900"
          : "bg-gradient-to-br from-blue-50 via-white to-blue-50",
      )}
    >
      <div className="flex flex-col items-center space-y-6">
        {/* Corrected Image path */}
        <Image
          src="/images/airchainpay-logo.png"
          alt="AirChainPay Logo"
          width={200}
          height={200}
          priority
          className="animate-pulse"
        />
        <h1 className={cn("text-4xl font-bold", isDarkMode ? "text-white" : "text-gray-900")}>AirChainPay</h1>
        <div className="w-64">
          <Progress value={progress} className="w-full h-2 rounded-full" />
        </div>
        <p className={cn("text-lg", isDarkMode ? "text-gray-300" : "text-gray-600")}>Loading your experience...</p>
      </div>
    </div>
  )
}
