"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/Button/Button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/Menu/NavigationMenu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/Dialog/Sheet"
import { Menu, Book, Code, Users, Zap, ArrowRight, ExternalLink } from "lucide-react"

const navigation = {
  main: [
    {
      name: "Documentation",
      href: "/docs",
      icon: Book,
      description: "Complete guides and API reference",
      items: [
        { name: "Quick Start", href: "/quick-start", description: "Get started in minutes" },
        { name: "API Reference", href: "/api-reference", description: "Complete API documentation" },
        { name: "SDK Documentation", href: "/sdk-documentation", description: "Client libraries and SDKs" },
        { name: "Examples", href: "/examples", description: "Code examples and tutorials" },
      ],
    },
    {
      name: "Solutions",
      href: "/solutions",
      icon: Zap,
      description: "Payment solutions for every business",
      items: [
        { name: "E-commerce", href: "/solutions/ecommerce", description: "Online store payments" },
        { name: "Marketplaces", href: "/solutions/marketplaces", description: "Multi-vendor platforms" },
        { name: "SaaS", href: "/solutions/saas", description: "Subscription billing" },
        { name: "Enterprise", href: "/solutions/enterprise", description: "Large-scale solutions" },
      ],
    },
    {
      name: "Developers",
      href: "/developers",
      icon: Code,
      description: "Tools and resources for developers",
      items: [
        { name: "API Playground", href: "/playground", description: "Test APIs interactively" },
        { name: "Webhooks", href: "/webhooks", description: "Real-time event notifications" },
        { name: "Testing", href: "/testing", description: "Sandbox environment" },
        { name: "Libraries", href: "/libraries", description: "Official client libraries" },
      ],
    },
    {
      name: "Community",
      href: "/community",
      icon: Users,
      description: "Connect with other developers",
    },
  ],
  secondary: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Support", href: "/support" },
    { name: "Status", href: "/status", external: true },
  ],
}

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <Image src="/images/airchainpay-logo.png" alt="AirChainPay" width={32} height={32} className="h-8 w-8" />
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AirChainPay
          </span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navigation.main.map((item) => (
              <NavigationMenuItem key={item.name}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="h-10">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((subItem) => (
                          <NavigationMenuLink key={subItem.name} asChild>
                            <Link
                              href={subItem.href}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">{subItem.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {subItem.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            {navigation.secondary.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.name}
                {item.external && <ExternalLink className="ml-1 h-3 w-3 inline" />}
              </Link>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-4">
              <div className="flex items-center space-x-2 pb-4 border-b">
                <Image
                  src="/images/airchainpay-logo.png"
                  alt="AirChainPay"
                  width={24}
                  height={24}
                  className="h-6 w-6"
                />
                <span className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  AirChainPay
                </span>
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-3">
                {navigation.main.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="flex items-center space-x-2 font-medium">
                      <item.icon className="h-4 w-4" />
                      <span>{item.name}</span>
                    </div>
                    {item.items && (
                      <div className="ml-6 space-y-2">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                {navigation.secondary.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                    {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {item.name}
                    {item.external && <ExternalLink className="ml-1 h-3 w-3 inline" />}
                  </Link>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start">
                  Sign In
                </Button>
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
