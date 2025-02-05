"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { LayoutDashboard, Calendar, MessageCircle, Settings, Menu, LogOut, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  {
    title: "ダッシュボード",
    href: "/staff",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    title: "予約管理",
    href: "/staff/reservations",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    title: "チャット",
    href: "/staff/chat",
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    title: "設定",
    href: "/staff/settings",
    icon: <Settings className="w-5 h-5" />,
  },
]

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [staffEmail, setStaffEmail] = useState("")
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const authenticated = localStorage.getItem("staffAuthenticated")
    const email = localStorage.getItem("staffEmail")
    if (!authenticated && pathname !== "/staff/login") {
      router.push("/staff/login")
    } else {
      setIsAuthenticated(true)
      if (email) {
        setStaffEmail(email)
      }
    }
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("staffAuthenticated")
    localStorage.removeItem("staffEmail")
    localStorage.removeItem("isAdmin")
    router.push("/staff/login")
  }

  if (!isAuthenticated) {
    return null
  }

  // メールアドレスから表示名を生成
  const displayName = staffEmail.split("@")[0]
  const avatarInitial = displayName.charAt(0).toUpperCase()

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="font-semibold text-lg">SunsCreate スタッフ画面</div>

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
                    <AvatarFallback>{avatarInitial}</AvatarFallback>
                  </Avatar>
                  <span className="ml-2 hidden md:inline-block">{displayName}</span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => router.push("/staff/settings")}>設定</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>ログアウト</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
    </div>
  )
}

