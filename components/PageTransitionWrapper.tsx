"use client"
import { ReactNode } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
export default function PageTransitionWrapper({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="fade-in"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
} 