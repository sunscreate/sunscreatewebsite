"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type React from "react" // Added import for React

interface ScrollButtonProps {
  targetId: string
  children: React.ReactNode
  variant?: "default" | "outline"
  className?: string
}

export function ScrollButton({ targetId, children, variant = "outline", className }: ScrollButtonProps) {
  const handleClick = () => {
    const target = document.getElementById(targetId)
    if (target) {
      const offset = 80 // Header height consideration
      const elementPosition = target.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      })
    }
  }

  return (
    <Button variant={variant} className={`w-full sm:w-auto group ${className}`} onClick={handleClick}>
      {children}
      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
    </Button>
  )
}

