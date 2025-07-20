// This component defines the fixed header for the AirChainPay website.
// It includes the logo, main navigation links, a search bar, and a dark mode toggle.

"use client" // Marks this as a Client Component because it uses client-side interactions like `onClick`.

import Link from "next/link" // Next.js Link component for client-side navigation
import Image from "next/image" // Next.js Image component for optimized image loading
import { Search, Menu, Sun, Moon } from "lucide-react" // Icons from Lucide React
import { Button } from "@/components/ui/button" // Shadcn UI Button component

// Define props for the Header component.
interface HeaderProps {
  isDarkMode: boolean // Boolean to control styling based on dark mode.
  toggleDarkMode: () => void // Function to toggle dark/light mode.
}

// Header component definition.
export default function Header({ isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    // Fixed header container, positioned at the top of the viewport.
    <header className="fixed top-4 left-4 right-4 z-50">
      <div className="mx-auto max-w-7xl">
        {/* Inner container for header content, with dynamic styling based on dark mode.
            Includes background, border, blur effects, and shadow. */}
        <div
          className={`flex items-center justify-between rounded-2xl ${
            isDarkMode ? "bg-slate-800/80 border-blue-500/30" : "bg-white/80 border-blue-200/50"
          } backdrop-blur-xl border px-6 py-4 shadow-2xl transition-all duration-300`}
        >
          {/* Left section of the header: Logo and main navigation links. */}
          <div className="flex items-center space-x-8">
            {/* Logo and site title, linked to the homepage. */}
            <Link href="/" className="flex items-center space-x-3 group">
              {/* Enhanced Header Logo: Styled with a circular frame and subtle glow. */}
              <div className="relative">
                <div
                  className={`relative h-10 w-10 rounded-full ${
                    isDarkMode
                      ? "bg-gradient-to-br from-blue-500/20 to-blue-600/30 border-2 border-blue-400/40"
                      : "bg-gradient-to-br from-blue-100/80 to-blue-200/60 border-2 border-blue-300/60"
                  } backdrop-blur-sm shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105 flex items-center justify-center`}
                >
                  <div className="relative h-6 w-6">
                    {/* AirChainPay logo image. */}
                    <Image
                      src="/images/airchainpay-logo.png"
                      alt="AirChainPay Logo"
                      width={24}
                      height={24}
                      className="object-contain"
                    />
                  </div>
                  {/* Subtle glow effect behind the logo. */}
                  <div
                    className={`absolute inset-0 rounded-full ${
                      isDarkMode ? "bg-blue-400/20" : "bg-blue-500/10"
                    } blur-md group-hover:blur-lg transition-all duration-300 -z-10`}
                  ></div>
                </div>
              </div>
              {/* Site title, changes color based on dark mode. */}
              <span className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-slate-900"}`}>AirChainPay</span>
            </Link>
            {/* Main navigation links (hidden on small screens, visible on medium and larger). */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/about" // Link to the About/Docs page
                className={`${
                  isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                } transition-colors`}
              >
                Docs
              </Link>
              <Link
                href="/api-reference" // Link to the API Reference page
                className={`${
                  isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                } transition-colors`}
              >
                API
              </Link>
              <Link
                href="/sdk-documentation" // Link to the SDK Documentation page
                className={`${
                  isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                } transition-colors`}
              >
                SDK
              </Link>
              <Link
                href="/community" // Link to the Community page
                className={`${
                  isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
                } transition-colors`}
              >
                Community
              </Link>
            </nav>
          </div>
          {/* Right section of the header: Search, Dark Mode toggle, Get Started button, Mobile menu. */}
          <div className="flex items-center space-x-4">
            {/* Search input (hidden on small screens, visible on medium and larger). */}
            <div className="relative hidden md:block">
              <Search
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 ${
                  isDarkMode ? "text-slate-400" : "text-slate-500"
                }`}
              />
              <input
                className={`w-64 rounded-xl ${
                  isDarkMode
                    ? "bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400"
                    : "bg-slate-50/50 border-slate-200/50 text-slate-900 placeholder-slate-500"
                } border pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all`}
                placeholder="Search documentation..."
                type="search"
              />
            </div>
            {/* Dark Mode toggle button. Changes icon based on current mode. */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode} // Calls the `toggleDarkMode` function passed from parent.
              className={`${
                isDarkMode ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
              } hover:bg-transparent`}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            {/* "Get Started" call to action button. */}
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white border-0 rounded-xl">
              Get Started
            </Button>
            {/* Mobile menu button (visible only on small screens, hidden on medium and larger). */}
            <Button variant="ghost" size="sm" className={`md:hidden ${isDarkMode ? "text-white" : "text-slate-900"}`}>
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
