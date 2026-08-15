import Link from 'next/link'
import { Check } from 'lucide-react'

export default function PublicPricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-20 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-extrabold text-white">خطط الأسعار والاشتراكات</h1>
        <p className="text-slate-400">اختر الخطة المناسبة لحجم وكالتك واستقبل بيانات عملائك بكل سلاسة.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        {/* Free Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">الخطة المجانية</h3>
            <div className="text-4xl font-extrabold text-white">$0 <span className="text-sm font-normal text-slate-400">/شهرياً</span></div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> بوابة استلام واحدة</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> استقبال حتى 5 عملاء</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> مساحة تخزين ملفات حتى 50MB</li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-center block transition"
          >
            ابدأ مجاناً
          </Link>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-900 border-2 border-blue-600 rounded-2xl p-8 space-y-6 flex flex-col justify-between relative shadow-2xl shadow-blue-600/10">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-blue-400">خطة المحترفين Pro</h3>
            <div className="text-4xl font-extrabold text-white">$19 <span className="text-sm font-normal text-slate-400">/شهرياً</span></div>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> بوابات استلام غير محدودة</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> استقبال لا محدود من العملاء</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> روابط فريدة غير محدودة تكتم تلقائياً</li>
              <li className="flex items-center gap-2"><Check size={16} className="text-blue-500" /> تخزين أصول وملفات حتى 10GB</li>
            </ul>
          </div>
          <Link
            href="/register"
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-center block transition"
          >
            اشترك الآن في Pro
          </Link>
        </div>
      </div>
    </div>
  )
}
