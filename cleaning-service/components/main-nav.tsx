"use client"

import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NavButton } from "./navigation/nav-button"

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
            <NavButton href="/services" variant="ghost">
              サービス内容
            </NavButton>
          </li>
          <li>
            <NavButton href="/reservation" variant="ghost">
              予約
            </NavButton>
          </li>
          <li>
            <NavButton href="/contact" variant="ghost">
              お問い合わせ
            </NavButton>
          </li>
          <li>
            <NavButton href="/reviews" variant="ghost">
              口コミ
            </NavButton>
          </li>
          <li>
            <NavButton href="/admin" variant="ghost">
              管理者専用ページ
            </NavButton>
          </li>
          <li>
            <NavButton href="/staff" variant="ghost">
              スタッフ専用ページ
            </NavButton>
          </li>
        </ul>
      </nav>
    </div>
  )
}

