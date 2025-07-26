"use client"

import { useEffect } from "react"
import ProfessionalSplashLoading from "@/components/layout/SplashLoader/SplashLoaderProfessional"

export default function Loading() {
  useEffect(() => {
    // This component will be replaced by the actual page content
    // when loading is complete, so we don't need to handle onComplete
  }, [])

  const handleComplete = () => {
    // Loading completion is handled by Next.js automatically
    // This is just a placeholder to satisfy the prop requirement
  }

  // Remove splash loader, just render nothing or a minimal fallback
  return null
}
