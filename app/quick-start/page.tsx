"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { Rocket, Key, Plug } from "lucide-react"
import { cn } from "@/lib/utils"

export default function QuickStartPage() {
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
      id: "setup",
      title: "Initial Setup",
      description: "Get your development environment ready and configure your first AirChainPay project in minutes.",
      icon: <Rocket className="h-5 w-5 text-white" />,
    },
    {
      id: "api-keys",
      title: "API Key Management",
      description: "Understand how to generate, manage, and securely use your API keys for authentication.",
      icon: <Key className="h-5 w-5 text-white" />,
    },
    {
      id: "first-transaction",
      title: "Your First Transaction",
      description: "A step-by-step guide to processing your very first payment using the AirChainPay SDK.",
      icon: <Plug className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="Quick Start"
        introduction="Get up and running with AirChainPay in no time."
        sections={sections}
      >
        <p>
          Welcome to the AirChainPay Quick Start guide! This section will help you set up your development environment
          and make your first transaction using our platform. Follow these simple steps to begin your journey into
          decentralized payments.
        </p>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Step 1: Create an Account
        </h2>
        <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Sign up for a free AirChainPay developer account to get access to your API keys and dashboard.
        </p>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Step 2: Install the SDK
        </h2>
        <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Install the AirChainPay SDK in your project using npm or yarn:
        </p>
        <pre
          className={cn(
            "p-4 rounded-md mt-2 mb-4 font-mono text-sm",
            isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
          )}
        >
          <code>npm install @airchainpay/sdk</code>
        </pre>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Step 3: Initialize the Client
        </h2>
        <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Initialize the AirChainPay client with your API key:
        </p>
        <pre
          className={cn(
            "p-4 rounded-md mt-2 mb-4 font-mono text-sm",
            isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
          )}
        >
          <code>const airchainpay = new AirChainPay('YOUR_API_KEY');</code>
        </pre>
        <h2 className={cn("text-2xl font-bold mt-8 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
          Step 4: Make Your First Transaction
        </h2>
        <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Use the client to send your first payment:
        </p>
        <pre
          className={cn(
            "p-4 rounded-md mt-2 mb-4 font-mono text-sm",
            isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
          )}
        >
          <code>
            {`await airchainpay.payments.send({
              to: '0xRecipientAddress',
              amount: '100',
              currency: 'ETH',
              chain: 'ethereum',
            });`}
          </code>
        </pre>
        <p className={cn("mt-8", isDarkMode ? "text-slate-300" : "text-slate-600")}>
          Congratulations! You've successfully made your first transaction with AirChainPay. Explore the rest of our
          documentation for more advanced features.
        </p>
      </DocsContentInterface>
    </DocsLayout>
  )
}
