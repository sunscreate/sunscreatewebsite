"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type React from "react" // Added import for React

interface NavButtonProps {
  href: string
  variant?: "default" | "outline" | "ghost"
  className?: string
  children: React.ReactNode
}

export function NavButton({ href, variant = "outline", className, children }: NavButtonProps) {
  return (
    <Link href={href}>
      <Button variant={variant} className={cn("w-full sm:w-auto", className)}>
        {children}
      </Button>
    </Link>
  )
}

