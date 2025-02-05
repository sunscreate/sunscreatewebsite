"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export function BackButton() {
  return (
    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => window.history.back()}>
      <ArrowLeft className="h-4 w-4" />
      <span className="sr-only">戻る</span>
    </Button>
  )
}

