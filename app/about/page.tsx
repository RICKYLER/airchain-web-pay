"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { DollarSign, Shield, Zap } from "lucide-react"

export default function AboutPage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null // Avoid hydration mismatch
  }

  const isDarkMode = theme === "dark"

  const sections = [
    {
      id: "mission",
      title: "Our Mission",
      description:
        "To revolutionize the payment landscape by providing secure, efficient, and user-friendly solutions that empower businesses and individuals worldwide.",
      icon: <DollarSign className="h-5 w-5 text-white" />,
    },
    {
      id: "vision",
      title: "Our Vision",
      description:
        "To be the leading global payment platform, recognized for innovation, reliability, and commitment to financial accessibility for all.",
      icon: <Shield className="h-5 w-5 text-white" />,
    },
    {
      id: "values",
      title: "Our Values",
      description:
        "Integrity, innovation, customer-centricity, and security are at the core of everything we do. We believe in transparent and ethical practices.",
      icon: <Zap className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="About AirChainPay"
        introduction="Learn more about our company, our mission, and what drives us."
        sections={sections}
      />
    </DocsLayout>
  )
}
