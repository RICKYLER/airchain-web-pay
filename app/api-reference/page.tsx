"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { Code, Shield, Settings, BookOpen, Key, Server, FileJson } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Layout/Tabs"
import { cn } from "@/lib/utils"

export default function ApiReferencePage() {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null 
  }

  const isDarkMode = theme === "dark"

  const sections = [
    {
      id: "overview",
      title: "API Overview",
      description:
        "Understand the core principles and architecture of the AirChainPay API, designed for seamless integration and high performance.",
      icon: <Code className="h-5 w-5 text-white" />,
    },
    {
      id: "endpoints",
      title: "Available Endpoints",
      description:
        "Explore a comprehensive list of all API endpoints, including detailed descriptions, request parameters, and response formats.",
      icon: <BookOpen className="h-5 w-5 text-white" />,
    },
    {
      id: "authentication",
      title: "Authentication & Security",
      description:
        "Learn about our robust authentication mechanisms and best practices for securing your API integrations.",
      icon: <Shield className="h-5 w-5 text-white" />,
    },
    {
      id: "error-handling",
      title: "Error Handling",
      description:
        "Guidance on interpreting API error codes and messages to effectively troubleshoot and resolve integration issues.",
      icon: <Settings className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="API Reference"
        introduction="Detailed documentation for integrating with the AirChainPay API."
        sections={sections}
      >
        <p>
          Our API reference provides detailed documentation for integrating AirChainPay's powerful features into your
          applications. You'll find information on endpoints, request parameters, response formats, and example code
          snippets to help you get started quickly.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Authentication</h2>
        <p>
          All API requests must be authenticated using your API key. Please refer to the authentication section for
          details on how to obtain and use your API key securely.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Endpoints</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <code>/api/v1/transactions</code>: Manage and query transaction data.
          </li>
          <li>
            <code>/api/v1/wallets</code>: Interact with user wallets and balances.
          </li>
          <li>
            <code>/api/v1/payments</code>: Initiate and track payment requests.
          </li>
        </ul>
        <p className="mt-8">
          We recommend using our official SDKs for easier integration, but direct API calls are also fully supported.
        </p>
        <Tabs defaultValue="authentication" className="mt-6">
          <TabsList className={cn("grid w-full grid-cols-3 mb-8", isDarkMode ? "bg-slate-800/50" : "bg-slate-100/50")}>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
          </TabsList>
          <TabsContent value="authentication">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <Key className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    API Keys
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    All API requests must include your API key in the Authorization header:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <code>Authorization: Bearer YOUR_API_KEY</code>
                  </div>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    You can generate API keys in your AirChainPay dashboard. Keep your API keys secure and never expose
                    them in client-side code.
                  </p>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <Server className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Base URL
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    All API requests should be made to:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <code>https://api.airchainpay.com/v1/</code>
                  </div>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    For testing, use the sandbox environment:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <code>https://sandbox.airchainpay.com/v1/</code>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="payments">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <Code className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Create Payment
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    <code className="font-mono">POST /payments</code>
                  </p>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Request body:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"amount": "0.01",
"currency": "ETH",
"recipient": "0x1234...5678",
"description": "Payment for services",
"metadata": {
  "order_id": "12345"
}
}`}</code>
                    </pre>
                  </div>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Response:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"id": "pay_123456789",
"status": "pending",
"amount": "0.01",
"currency": "ETH",
"recipient": "0x1234...5678",
"description": "Payment for services",
"created_at": "2023-07-12T15:30:45Z",
"metadata": {
  "order_id": "12345"
}
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <FileJson className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Get Payment
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    <code className="font-mono">GET /payments/:id</code>
                  </p>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Response:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"id": "pay_123456789",
"status": "completed",
"amount": "0.01",
"currency": "ETH",
"recipient": "0x1234...5678",
"description": "Payment for services",
"created_at": "2023-07-12T15:30:45Z",
"completed_at": "2023-07-12T15:32:10Z",
"transaction_hash": "0xabcd...",
"metadata": {
  "order_id": "12345"
}
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="wallets">
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <Code className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Create Wallet
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    <code className="font-mono">POST /wallets</code>
                  </p>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Request body:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"name": "User Wallet",
"networks": ["ethereum", "base", "polygon"],
"user_id": "user_12345"
}`}</code>
                    </pre>
                  </div>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Response:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"id": "wallet_123456789",
"name": "User Wallet",
"addresses": {
  "ethereum": "0x1234...",
  "base": "0x5678...",
  "polygon": "0x9abc..."
},
"created_at": "2023-07-12T15:30:45Z",
"user_id": "user_12345"
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0",
                      isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                    )}
                  >
                    <FileJson className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Get Wallet Balance
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    <code className="font-mono">GET /wallets/:id/balance</code>
                  </p>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>Response:</p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-4 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`{
"wallet_id": "wallet_123456789",
"balances": {
  "ethereum": {
    "ETH": "0.25",
    "USDC": "100.00"
  },
  "base": {
    "ETH": "0.15"
  },
  "polygon": {
    "MATIC": "50.00",
    "USDT": "75.00"
  }
},
"updated_at": "2023-07-12T16:45:30Z"
}`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DocsContentInterface>
    </DocsLayout>
  )
}