"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/Button/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card/Card"
import { Badge } from "@/components/ui/Badge/Badge"
import ProfessionalSplashLoading from "@/components/layout/SplashLoader/SplashLoaderProfessional"
import { ArrowRight, Shield, Zap, Globe, Code, Users, TrendingUp, Star } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Process transactions in under 2 seconds with our optimized blockchain infrastructure.",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption and multi-layer security protocols protect every transaction.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "24/7 availability across 150+ countries with 99.99% uptime guarantee.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Code,
    title: "Developer Friendly",
    description: "Simple APIs, comprehensive SDKs, and detailed documentation for quick integration.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join thousands of developers building the future of decentralized payments.",
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: TrendingUp,
    title: "Scalable Solutions",
    description: "From startups to enterprises, our platform scales with your business needs.",
    color: "text-indigo-500",
    bgColor: "bg-indigo-500/10",
  },
]

const stats = [
  { label: "Transactions Processed", value: "10M+", icon: TrendingUp },
  { label: "Countries Supported", value: "150+", icon: Globe },
  { label: "Developers", value: "50K+", icon: Users },
  { label: "Uptime", value: "99.99%", icon: Shield },
]

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO at TechFlow",
    content:
      "AirChainPay transformed our payment infrastructure. The integration was seamless and the performance is outstanding.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Marcus Rodriguez",
    role: "Lead Developer at PayNext",
    content: "The developer experience is incredible. Clear documentation, powerful APIs, and excellent support.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
  {
    name: "Emily Watson",
    role: "Founder of CryptoCommerce",
    content:
      "Finally, a payment solution that's both powerful and easy to use. Our transaction volume increased by 300%.",
    avatar: "/placeholder-user.jpg",
    rating: 5,
  },
]

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  // Remove the timeout - let ProfessionalLoadingManager control completion
  // The loading manager will call onComplete when all phases are done

  if (isLoading) {
    console.log("Showing splash loading...")
    return <ProfessionalSplashLoading onComplete={() => {
      console.log("Splash loading completed!")
      setIsLoading(false)
    }} />
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="relative container mx-auto px-4 py-24 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-blue-500/20 text-blue-100 border-blue-400/30 hover:bg-blue-500/30">
                  🚀 Now in Public Beta
                </Badge>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    The Future of
                  </span>
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Decentralized Payments
                  </span>
                </h1>
                <p className="text-xl text-blue-100 max-w-2xl leading-relaxed">
                  Build the next generation of payment applications with our secure, fast, and developer-friendly
                  blockchain infrastructure.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
                >
                  View Documentation
                </Button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <stat.icon className="h-6 w-6 text-blue-400" />
                    </div>
                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="/placeholder.svg?height=600&width=600&text=AirChainPay+Dashboard"
                  alt="AirChainPay Dashboard"
                  width={600}
                  height={600}
                  className="rounded-2xl shadow-2xl border border-white/10"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-2xl blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose AirChainPay?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Built for developers, trusted by enterprises. Experience the perfect balance of power and simplicity.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-background to-muted/50"
              >
                <CardHeader>
                  <div
                    className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <Badge variant="outline" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">Loved by Developers Worldwide</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              See what our community has to say about their experience with AirChainPay.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-background border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Image
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Ready to Transform Your Payment Infrastructure?
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Join thousands of developers who are already building the future of payments with AirChainPay.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Start Building Today
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm bg-transparent"
              >
                Schedule a Demo
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
