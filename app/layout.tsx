import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import SiteHeader from "@/components/layout/SiteHeader"
import SiteFooter from "@/components/layout/SiteFooter"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AirChainPay",
  description: "The future of decentralized payments.",
   
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col min-h-screen">
            <SiteHeader /> {/* SiteHeader now handles its own theme state */}
            <main className="flex-1 flex flex-col">
              {" "}
              {/* Added flex-col to main for consistent layout */}
              {children}
            </main>
            <SiteFooter /> {/* SiteFooter now handles its own theme state */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
