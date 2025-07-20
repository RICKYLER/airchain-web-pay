"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { Code, CreditCard, Layout, FileCode, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { Button } from "@/components/ui/Button/Button"
import { cn } from "@/lib/utils"

export default function ExamplesPage() {
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
      id: "basic-integration",
      title: "Basic Payment Integration",
      description:
        "A simple example demonstrating how to integrate AirChainPay for basic payment processing in your web application.",
      icon: <CreditCard className="h-5 w-5 text-white" />,
    },
    {
      id: "subscription-model",
      title: "Subscription Billing",
      description:
        "Learn how to implement recurring payments and subscription models using AirChainPay's robust billing features.",
      icon: <Layout className="h-5 w-5 text-white" />,
    },
    {
      id: "custom-ui",
      title: "Custom UI Implementation",
      description: "Examples showcasing how to build custom payment UIs while leveraging AirChainPay's secure backend.",
      icon: <Code className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="Examples"
        introduction="Practical code examples to help you get started with AirChainPay."
        sections={sections}
      >
        <p>
          Our examples section provides practical code snippets and full-fledged applications demonstrating how to
          leverage AirChainPay's features. Whether you're building a simple payment button or a complex decentralized
          application, these examples will guide you through the process.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">Categories:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>**Basic Payments:** Simple examples for sending and receiving payments.</li>
          <li>**Multi-chain Transactions:** Demonstrations of cross-chain payment flows.</li>
          <li>**Offline Mode:** Examples showcasing how to handle transactions in offline environments.</li>
          <li>**Wallet Integration:** Guides on integrating with various cryptocurrency wallets.</li>
          <li>
            **Advanced Use Cases:** Complex scenarios like subscriptions, escrows, and smart contract interactions.
          </li>
        </ul>
        <p className="mt-8">
          Each example comes with detailed explanations and runnable code, making it easy to understand and adapt to
          your specific needs.
        </p>

        <Card
          className={cn(
            "backdrop-blur-xl border rounded-2xl mt-8",
            isDarkMode ? "bg-slate-800/30 border-slate-700/30" : "bg-white/50 border-slate-200/30",
          )}
        >
          <CardContent className="p-8">
            <div className="mb-6">
              <span className={cn("text-sm font-medium", isDarkMode ? "text-blue-400" : "text-blue-600")}>
                Documentation
              </span>
              <h1 className={cn("text-4xl font-bold mt-2 mb-4", isDarkMode ? "text-white" : "text-slate-900")}>
                Code Examples
              </h1>
              <p className={cn("text-xl", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                Ready-to-use code examples for common AirChainPay integration scenarios.
              </p>
            </div>

            <div className="space-y-8">
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
                    Payment Button
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    Add a payment button to your React application:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-6 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileCode className="h-4 w-4" />
                      <span className="font-semibold">PaymentButton.jsx</span>
                    </div>
                    <pre>
                      <code>{`import React, { useState } from 'react';
import { AirChainPay } from '@airchainpay/sdk';

const airchainpay = new AirChainPay({
apiKey: process.env.AIRCHAINPAY_API_KEY,
environment: 'testnet',
});

function PaymentButton({ amount, currency, recipient, description }) {
const [isLoading, setIsLoading] = useState(false);
const [status, setStatus] = useState(null);

const handlePayment = async () => {
  try {
    setIsLoading(true);
    setStatus('processing');

    const payment = await airchainpay.createPayment({
      amount,
      currency,
      recipient,
      description,
    });

    setStatus('success');
    console.log('Payment created:', payment);
  } catch (error) {
    setStatus('error');
    console.error('Payment failed:', error);
  } finally {
    setIsLoading(false);
  }
};

return (
  <div>
    <button
      onClick={handlePayment}
      disabled={isLoading}
      className={\`px-4 py-2 rounded-lg \${
        isLoading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
      } text-white\`}
    >
      {isLoading ? 'Processing...' : \`Pay \${amount} \${currency}\`}
    </button>
    
    {status === 'success' && (
      <div className="mt-2 text-green-500">Payment successful!</div>
    )}
    
    {status === 'error' && (
      <div className="mt-2 text-red-500">Payment failed. Please try again.</div>
    )}
  </div>
);
}

export default PaymentButton;`}</code>
                    </pre>
                  </div>

                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    Usage in your application:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-6 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <pre>
                      <code>{`<PaymentButton
amount="0.01"
currency="ETH"
recipient="0x1234...5678"
description="Payment for product #123"
/>`}</code>
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
                    <Code className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                  </div>
                  <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                    Payment Webhook Handler
                  </h2>
                </div>

                <div className="ml-11">
                  <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                    Handle payment webhooks in a Node.js Express application:
                  </p>

                  <div
                    className={cn(
                      "rounded-lg p-4 mb-6 font-mono text-sm",
                      isDarkMode ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-800",
                    )}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <FileCode className="h-4 w-4" />
                      <span className="font-semibold">webhook-handler.js</span>
                    </div>
                    <pre>
                      <code>{`const express = require('express');
const bodyParser = require('body-parser');
const { AirChainPay } = require('@airchainpay/sdk');

const app = express();
const port = 3000;

const airchainpay = new AirChainPay({
apiKey: process.env.AIRCHAINPAY_API_KEY,
environment: 'testnet',
});

app.use(bodyParser.json());

app.post('/webhooks/payment', async (req, res) => {
try {
  // Verify webhook signature
  const signature = req.headers['x-airchainpay-signature'];
  const isValid = airchainpay.webhooks.verifySignature(
    signature,
    req.body,
    process.env.WEBHOOK_SECRET
  );

  if (!isValid) {
    return res.status(400).send('Invalid signature');
  }

  const event = req.body;

  // Handle different event types
  switch (event.type) {
    case 'payment.created':
      console.log('Payment created:', event.data);
      // Update your database, notify user, etc.
      break;
    
    case 'payment.completed':
      console.log('Payment completed:', event.data);
      // Fulfill order, update status, etc.
      break;
    
    case 'payment.failed':
      console.log('Payment failed:', event.data);
      // Handle failure, notify user, etc.
      break;
    
    default:
      console.log('Unhandled event type:', event.type);
  }

  res.status(200).send('Webhook received');
} catch (error) {
  console.error('Webhook error:', error);
  res.status(500).send('Webhook processing failed');
}
});

app.listen(port, () => {
console.log(\`Webhook server listening at http://localhost:\${port}\`);
});`}</code>
                    </pre>
                  </div>
                </div>
              </div>

              <div
                className={cn(
                  "mt-8 p-6 rounded-xl border",
                  isDarkMode ? "bg-blue-500/10 border-blue-400/20" : "bg-blue-50/80 border-blue-200/50",
                )}
              >
                <h3 className={cn("text-lg font-semibold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>
                  Need More Examples?
                </h3>
                <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                  Check out our GitHub repository for more code examples and sample applications.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg">
                    View GitHub Repository
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </DocsContentInterface>
    </DocsLayout>
  )
}
