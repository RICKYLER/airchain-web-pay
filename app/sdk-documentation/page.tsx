"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { Package, FileText, Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

export default function SdkDocumentationPage() {
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
      id: "installation",
      title: "Installation",
      description: "Detailed instructions on how to install and set up the AirChainPay SDK in your project.",
      icon: <Package className="h-5 w-5 text-white" />,
    },
    {
      id: "api-methods",
      title: "SDK API Methods",
      description:
        "A comprehensive guide to all available methods and functions within the AirChainPay SDK, with usage examples.",
      icon: <FileText className="h-5 w-5 text-white" />,
    },
    {
      id: "troubleshooting",
      title: "Troubleshooting",
      description:
        "Common issues and their solutions to help you debug and resolve problems quickly when using the SDK.",
      icon: <Terminal className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="SDK Documentation"
        introduction="Comprehensive documentation for the AirChainPay Software Development Kit."
        sections={sections}
      >
        <p>
          Our SDKs (Software Development Kits) provide a convenient and idiomatic way to interact with the AirChainPay
          platform from various programming languages and frameworks. This documentation covers installation, usage, and
          best practices for each supported SDK.
        </p>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Available SDKs:
        </h2>
        <ul className={cn("list-disc list-inside space-y-2 mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          <li>**JavaScript/TypeScript SDK:** For web and Node.js applications.</li>
          <li>**Python SDK:** For backend services and data analysis.</li>
          <li>**Mobile SDKs (iOS/Android):** For native mobile application development.</li>
        </ul>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Key Features of the SDKs:
        </h2>
        <ul className={cn("list-disc list-inside space-y-2 mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          <li>Simplified API calls with type safety.</li>
          <li>Built-in error handling and retry mechanisms.</li>
          <li>Support for all AirChainPay features, including multi-chain transactions and offline mode.</li>
          <li>Comprehensive examples and tutorials.</li>
        </ul>
        <p className={cn("mt-8", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Choose the SDK that best fits your project and start building powerful decentralized payment solutions today.
        </p>
      </DocsContentInterface>
    </DocsLayout>
  )
}
