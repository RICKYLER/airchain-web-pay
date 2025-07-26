import React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/layout/SiteHeader"
import SiteFooter from "@/components/layout/SiteFooter"
import ChatbotServiceButtons from "@/components/ui/Button/ChatbotServiceButtons";
import PageTransitionWrapper from "@/components/PageTransitionWrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "AirChainPay | The Future of Decentralized Payments",
    template: "%s | AirChainPay",
  },
  description: "AirChainPay is revolutionizing decentralized payments with lightning-fast, secure, and scalable blockchain solutions for businesses and individuals worldwide.",
  keywords: [
    "blockchain payments",
    "decentralized finance",
    "crypto payments",
    "fintech",
    "AirChainPay",
    "secure payments",
    "global payments",
    "enterprise blockchain",
    "payment gateway"
  ],
  authors: [{ name: "AirChainPay Team", url: "https://airchainpay.com" }],
  creator: "AirChainPay",
  openGraph: {
    title: "AirChainPay | The Future of Decentralized Payments",
    description: "Revolutionizing decentralized payments with lightning-fast, secure, and scalable blockchain solutions.",
    url: "https://airchainpay.com",
    siteName: "AirChainPay",
    images: [
      {
        url: "https://airchainpay.com/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "AirChainPay - The Future of Decentralized Payments"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "AirChainPay | The Future of Decentralized Payments",
    description: "Revolutionizing decentralized payments with lightning-fast, secure, and scalable blockchain solutions.",
    site: "@airchainpay",
    creator: "@airchainpay",
    images: ["https://airchainpay.com/images/og-image.png"]
  },
  metadataBase: new URL("https://airchainpay.com"),
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Skip link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute left-4 top-4 z-50 bg-blue-700 text-white px-4 py-2 rounded shadow-lg"
        >
          Skip to main content
        </a>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <SiteHeader /> {/* SiteHeader now handles its own theme state */}
            <main id="main-content" className="flex-1 flex flex-col">
              <PageTransitionWrapper>{children}</PageTransitionWrapper>
            </main>
            <SiteFooter /> {/* SiteFooter now handles its own theme state */}
            <ChatbotServiceButtons />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
