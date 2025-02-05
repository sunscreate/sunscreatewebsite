"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MainNav() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="メインメニュー"
      >
        <Menu className="h-6 w-6" />
      </Button>
      <nav
        className={cn(
          "absolute right-0 top-full mt-2 w-48 rounded-md border bg-white p-2 shadow-lg md:static md:flex md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none",
          isOpen ? "block" : "hidden md:block",
        )}
      >
        <ul className="space-y-2 md:flex md:space-x-4 md:space-y-0">
          <li>
            <Link
              href="/services"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground md:hover:bg-transparent"
              onClick={() => setIsOpen(false)}
            >
              サービス内容
            </Link>
          </li>
          <li>
            <Link
              href="/reservation"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground md:hover:bg-transparent"
              onClick={() => setIsOpen(false)}
            >
              予約
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="block rounded-md px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground md:hover:bg-transparent"
              onClick={() => setIsOpen(false)}
            >
              お問い合わせ
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

