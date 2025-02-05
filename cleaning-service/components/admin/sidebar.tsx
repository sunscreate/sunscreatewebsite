import Link from "next/link"
import { BarChart3, Calendar, Users, Settings, LogOut } from "lucide-react"

export function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-100 p-4">
      <div className="space-y-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">管理画面</h2>
          <div className="space-y-1">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 hover:bg-gray-200"
            >
              <BarChart3 className="h-4 w-4" />
              ダッシュボード
            </Link>
            <Link
              href="/admin/reservations"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 hover:bg-gray-200"
            >
              <Calendar className="h-4 w-4" />
              予約管理
            </Link>
            <Link
              href="/admin/staff"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 hover:bg-gray-200"
            >
              <Users className="h-4 w-4" />
              スタッフ管理
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-900 transition-all hover:text-gray-900 hover:bg-gray-200"
            >
              <Settings className="h-4 w-4" />
              設定
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

