"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button/Button"
import { Input } from "@/components/ui/Form/Input"
import { Badge } from "@/components/ui/Badge/Badge"
import { Separator } from "@/components/ui/Layout/Separator"
import { Github, Twitter, Linkedin, Mail, ArrowRight, ExternalLink, Shield, Zap, Globe, Heart } from "lucide-react"

const footerLinks = {
  product: {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Security", href: "/security" },
      { name: "Integrations", href: "/integrations" },
      { name: "API", href: "/api" },
    ],
  },
  developers: {
    title: "Developers",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "API Reference", href: "/api-reference" },
      { name: "SDKs", href: "/sdks" },
      { name: "Examples", href: "/examples" },
      { name: "Playground", href: "/playground" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Help Center", href: "/help" },
      { name: "Community", href: "/community" },
      { name: "Contact", href: "/contact" },
      { name: "Status", href: "/status", external: true },
      { name: "System Status", href: "/system-status", external: true },
    ],
  },
  legal: {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Compliance", href: "/compliance" },
      { name: "Security", href: "/security" },
    ],
  },
}

const socialLinks = [
  { name: "GitHub", href: "https://github.com/airchainpay", icon: Github },
  { name: "Twitter", href: "https://twitter.com/airchainpay", icon: Twitter },
  { name: "LinkedIn", href: "https://linkedin.com/company/airchainpay", icon: Linkedin },
  { name: "Email", href: "mailto:hello@airchainpay.com", icon: Mail },
]

export default function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="border-t bg-background">
      <div className="container py-12 md:py-16">
        {/* Newsletter Section */}
        <div className="mb-12 rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 p-8">
          <div className="mx-auto max-w-2xl text-center">
            <h3 className="text-2xl font-bold tracking-tight">Stay updated with AirChainPay</h3>
            <p className="mt-2 text-muted-foreground">
              Get the latest updates on new features, integrations, and blockchain payment innovations.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="mt-6 flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                {isSubscribed ? "Subscribed!" : "Subscribe"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
            {isSubscribed && (
              <p className="mt-2 text-sm text-green-600 dark:text-green-400">
                Thank you for subscribing! Check your email for confirmation.
              </p>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Image src="/images/airchainpay-logo.png" alt="AirChainPay" width={32} height={32} className="h-8 w-8" />
              <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AirChainPay
              </span>
            </Link>
            <p className="text-muted-foreground mb-4 max-w-xs">
              Revolutionizing payments with blockchain technology. Fast, secure, and decentralized payment solutions for
              the modern world.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge variant="outline" className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                SOC 2 Compliant
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                99.9% Uptime
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                Global Coverage
              </Badge>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-semibold mb-3">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center"
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                    >
                      {link.name}
                      {link.external && <ExternalLink className="ml-1 h-3 w-3" />}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 text-sm text-muted-foreground">
            <p>&copy; 2024 AirChainPay. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">
                Terms
              </Link>
              <Link href="/cookies" className="hover:text-foreground transition-colors">
                Cookies
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-current" />
            <span>for developers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
