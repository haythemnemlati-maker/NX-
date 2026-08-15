'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { 
  LayoutDashboard, 
  Wrench, 
  Settings, 
  LogOut, 
  Sun, 
  Moon, 
  Menu, 
  X,
  CreditCard
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [agencyName, setAgencyName] = useState<string>('')
  
  const pathname = usePathname()
  const router = useRouter()
  const supabase = createClient()

  // جلب بيانات الوكالة الحالية
  useEffect(() => {
    async function getAgency() {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const { data } = await supabase
          .from('agencies')
          .select('agency_name')
          .eq('id', user.id)
          .single()
        if (data) setAgencyName(data.agency_name)
      }
    }
    getAgency()
  }, [])

  // التبديل بين الثيم الداكن والفيتح
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle('dark')
  }

  // تسجيل الخروج
  const handleLogout = async () => {
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const navItems = [
    { name: 'مستودع البطاقات', href: '/dashboard', icon: LayoutDashboard },
    { name: 'مُنشئ البوابات', href: '/builder', icon: Wrench },
    { name: 'الإعدادات والاشتراك', href: '/settings', icon: Settings },
  ]

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      {/* Top Navbar للموبايل والشاشات الصغيرة */}
      <div className="lg:hidden flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <h1 className="font-bold text-lg">{agencyName || 'لوحة التحكم'}</h1>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <div className="flex">
        {/* الشريط الجانبي (Sidebar) */}
        <aside
          className={`
            fixed inset-y-0 right-0 z-50 w-64 transform bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-5 flex flex-col justify-between transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static
            ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="space-y-8">
            {/* عنوان/شعار الوكالة */}
            <div className="flex items-center gap-3 px-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
                {agencyName ? agencyName.charAt(0) : 'P'}
              </div>
              <div className="overflow-hidden">
                <h2 className="font-bold text-base truncate">{agencyName || 'جاري التحميل...'}</h2>
                <span className="text-xs text-blue-600 dark:text-blue-400 font-medium">خطه مجانية</span>
              </div>
            </div>

            {/* روابط التنقل الرئيسية */}
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`
                      flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                      ${isActive 
                        ? 'bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400' 
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'}
                    `}
                  >
                    <Icon size={18} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* الجزء السفلي: التحكم بالمظهر وتسجيل الخروج */}
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            {/* زر تبديل الثيم الداكن/الفاتح */}
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <span className="flex items-center gap-2">
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
                {isDarkMode ? 'الوضع الفاتح' : 'الوضع الداكن'}
              </span>
            </button>

            {/* زر تسجيل الخروج */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition"
            >
              <LogOut size={18} />
              تسجيل الخروج
            </button>
          </div>
        </aside>

        {/* محتوى الصفحة الرئيسي */}
        <main className="flex-1 min-h-screen p-6 lg:p-10">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
