"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import {
  BarChart3,
  Calendar,
  Users,
  Settings,
  Menu,
  LogOut,
  Building,
  ChevronDown,
  CalendarPlus2Icon as Calendar2,
  MessageSquare,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "ダッシュボード",
    href: "/admin/dashboard",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "予約管理",
    href: "/admin/reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "スケジュール管理",
    href: "/admin/schedule",
    icon: <Calendar2 className="w-5 h-5" />,
  },
  {
    title: "会員管理",
    href: "/admin/members",
    icon: <Users className="w-5 h-5" />,
  },
  {
    title: "スタッフ管理",
    href: "/admin/staff",
    icon: <Building className="w-5 h-5" />,
  },
  {
    title: "口コミ管理",
    href: "/admin/reviews",
    icon: <MessageSquare className="h-4 w-4" />,
  },
  {
    title: "設定",
    href: "/admin/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authenticated = localStorage.getItem("adminAuthenticated")
    if (!authenticated && pathname !== "/admin/login") {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuthenticated")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="font-semibold text-lg">SunsCreate 管理画面</div>

          <div className="ml-auto flex items-center space-x-4">
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <Button
                  key={item.href}
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("gap-2", pathname === item.href && "bg-gray-100 font-medium")}
                  onClick={() => router.push(item.href)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Button>
              ))}
            </nav>

            {/* Mobile Navigation */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                {navItems.map((item) => (
                  <DropdownMenuItem
                    key={item.href}
                    onClick={() => router.push(item.href)}
                    className="flex items-center gap-2"
                  >
                    {item.icon}
                    {item.title}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem onClick={handleLogout} className="flex items-center gap-2 text-red-600">
                  <LogOut className="w-5 h-5" />
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="pl-0">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>A</AvatarFallback>
                  </Avatar>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/admin/settings")}>設定</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto p-4 md:p-6 max-w-7xl">{children}</div>
      </main>
    </div>
  )
}

