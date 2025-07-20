"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DocsLayout from "@/components/layout/DocsPageLayout"
import DocsContentInterface from "@/components/docs/docs-content-interface"
import { Github, MessageSquare, Users, DiscIcon as Discord, Twitter } from "lucide-react"
import { Card, CardContent } from "@/components/ui/Card/Card"
import { Button } from "@/components/ui/Button/Button"
import { cn } from "@/lib/utils"

export default function CommunityPage() {
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
      id: "forums",
      title: "Developer Forums",
      description:
        "Join our vibrant developer community forums to ask questions, share knowledge, and connect with other AirChainPay users.",
      icon: <MessageSquare className="h-5 w-5 text-white" />,
    },
    {
      id: "github",
      title: "GitHub Repository",
      description:
        "Contribute to our open-source projects, report bugs, and submit feature requests on our official GitHub repository.",
      icon: <Github className="h-5 w-5 text-white" />,
    },
    {
      id: "social",
      title: "Social Media",
      description:
        "Follow us on social media to stay updated with the latest news, announcements, and community events.",
      icon: <Users className="h-5 w-5 text-white" />,
    },
  ]

  return (
    <DocsLayout>
      <DocsContentInterface
        title="Community"
        introduction="Connect with other developers and the AirChainPay team."
        sections={sections}
      >
        <p>
          The AirChainPay community is a growing network of developers, enthusiasts, and partners who are passionate
          about decentralized payments. Join us to share ideas, get support, and collaborate on building the future of
          finance.
        </p>
        <h2 className="text-2xl font-bold mt-8 mb-4">How to Get Involved:</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Discord: Join our Discord server for real-time discussions, support, and announcements.</li>
          <li>GitHub: Explore our open-source repositories, contribute code, and report issues.</li>
          <li>Forums: Participate in discussions, ask questions, and share your knowledge on our community forums.</li>
          <li>Events: Look out for our online and in-person events, workshops, and hackathons.</li>
        </ul>
        <p className="mt-8">
          Your contributions and feedback are invaluable to us. Together, we can build a stronger, more decentralized
          payment ecosystem.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-8">
          <Card
            className={cn(
              "backdrop-blur-sm border rounded-xl transition-all hover:shadow-lg",
              isDarkMode
                ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                : "bg-white/70 border-slate-200/50 hover:bg-white/90",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                  )}
                >
                  <Discord className={cn("h-5 w-5", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                </div>
                <h2 className={cn("text-xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                  Discord Community
                </h2>
              </div>
              <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                Join our Discord server to chat with the team and other developers. Get real-time support and
                participate in discussions.
              </p>
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg w-full">Join Discord</Button>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "backdrop-blur-sm border rounded-xl transition-all hover:shadow-lg",
              isDarkMode
                ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                : "bg-white/70 border-slate-200/50 hover:bg-white/90",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                  )}
                >
                  <Github className={cn("h-5 w-5", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                </div>
                <h2 className={cn("text-xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                  GitHub Repository
                </h2>
              </div>
              <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                Explore our open-source repositories, contribute to the project, and report issues on GitHub.
              </p>
              <Button className="bg-gray-800 hover:bg-gray-900 text-white rounded-lg w-full">View on GitHub</Button>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "backdrop-blur-sm border rounded-xl transition-all hover:shadow-lg",
              isDarkMode
                ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                : "bg-white/70 border-slate-200/50 hover:bg-white/90",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                  )}
                >
                  <Twitter className={cn("h-5 w-5", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                </div>
                <h2 className={cn("text-xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>Twitter</h2>
              </div>
              <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                Follow us on Twitter for the latest news, updates, and announcements about AirChainPay.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg w-full">Follow on Twitter</Button>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "backdrop-blur-sm border rounded-xl transition-all hover:shadow-lg",
              isDarkMode
                ? "bg-slate-800/50 border-slate-700/50 hover:bg-slate-800/70"
                : "bg-white/70 border-slate-200/50 hover:bg-white/90",
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={cn(
                    "h-10 w-10 rounded-full flex items-center justify-center",
                    isDarkMode ? "bg-blue-500/20" : "bg-blue-100",
                  )}
                >
                  <MessageSquare className={cn("h-5 w-5", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                </div>
                <h2 className={cn("text-xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>Forum</h2>
              </div>
              <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                Join our developer forum to ask questions, share your projects, and get help from the community.
              </p>
              <Button className="bg-green-600 hover:bg-green-700 text-white rounded-lg w-full">Visit Forum</Button>
            </CardContent>
          </Card>
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
                <Users className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
              </div>
              <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                Upcoming Events
              </h2>
            </div>

            <div className="ml-11">
              <div className="space-y-4">
                <div
                  className={cn(
                    "p-4 rounded-lg border",
                    isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/70 border-slate-200",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                        AirChainPay Developer Workshop
                      </h3>
                      <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                        Learn how to integrate AirChainPay into your applications
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-sm px-2 py-1 rounded",
                        isDarkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      July 25, 2024
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-4 rounded-lg border",
                    isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/70 border-slate-200",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                        AirChainPay Hackathon
                      </h3>
                      <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                        Build innovative payment solutions and win prizes
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-sm px-2 py-1 rounded",
                        isDarkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      August 10-12, 2024
                    </div>
                  </div>
                </div>

                <div
                  className={cn(
                    "p-4 rounded-lg border",
                    isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/70 border-slate-200",
                  )}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                        AirChainPay v2.0 Launch Event
                      </h3>
                      <p className={cn("text-sm", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                        Join us for the launch of our next major version
                      </p>
                    </div>
                    <div
                      className={cn(
                        "text-sm px-2 py-1 rounded",
                        isDarkMode ? "bg-blue-500/20 text-blue-300" : "bg-blue-100 text-blue-700",
                      )}
                    >
                      September 5, 2024
                    </div>
                  </div>
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
                  <Users className={cn("h-4 w-4", isDarkMode ? "text-blue-300" : "text-blue-700")} />
                </div>
                <h2 className={cn("text-2xl font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                  Community Spotlight
                </h2>
              </div>

              <div className="ml-11">
                <p className={cn("mb-4", isDarkMode ? "text-slate-300" : "text-slate-600")}>
                  Check out these amazing projects built by our community members:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={cn(
                      "p-4 rounded-lg border",
                      isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/70 border-slate-200",
                    )}
                  >
                    <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                      AirChain Wallet
                    </h3>
                    <p className={cn("text-sm mb-2", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                      A mobile wallet app built on AirChainPay
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs",
                        isDarkMode
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100/50",
                      )}
                    >
                      View Project
                    </Button>
                  </div>

                  <div
                    className={cn(
                      "p-4 rounded-lg border",
                      isDarkMode ? "bg-slate-800/50 border-slate-700" : "bg-white/70 border-slate-200",
                    )}
                  >
                    <h3 className={cn("font-semibold", isDarkMode ? "text-white" : "text-slate-900")}>
                      ChainPay Checkout
                    </h3>
                    <p className={cn("text-sm mb-2", isDarkMode ? "text-slate-400" : "text-slate-600")}>
                      An e-commerce checkout plugin using AirChainPay
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(
                        "text-xs",
                        isDarkMode
                          ? "border-slate-600 text-slate-300 hover:bg-slate-700/50"
                          : "border-slate-300 text-slate-700 hover:bg-slate-100/50",
                      )}
                    >
                      View Project
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DocsContentInterface>
    </DocsLayout>
  )
}
